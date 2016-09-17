import Ember from 'ember';
import DS from 'ember-data';

const { get } = Ember;

export default function pathify(o, store) {
  if (o instanceof DS.Model) return pathifyModel(o, store);
  return pathifyObject(o, store);
}

function propertyPath(name, prefix) {
  return (prefix ? `${prefix}.` : '') + name.camelize();
}

function pathifyObject(o, store, prefix) {
  const result = [];

  if (prefix && prefix.indexOf('validators') > -1) return '';
  if (prefix) result.push(prefix);
  if (!o || typeof o !== 'object') return result;

  return Object.keys(o)
    .reduce((acc, key) => {
      if (o[key] instanceof DS.Model) {
        return acc.concat(pathifyModel(o[key], store, propertyPath(key, prefix)));
      }
      return acc.concat(pathifyObject(o[key], store, propertyPath(key, prefix)));
    }, result);
}

// Belt-and-suspenders approach gets field paths from both the ultimate payload
// and the model data structure in memory.
function pathifyModel(model, store, prefix) {
  let result = [];
  if (prefix) result.push(prefix);

  if (get(model, '_internalModel.modelName') === 'uni-form') {
    const propPath = propertyPath('payload', prefix);
    if (model.get('payload') instanceof DS.Model) {
      return result.concat(pathifyModel(model.get('payload'), store, propPath));
    }
    return result.concat(pathifyObject(model.get('payload'), store, propPath));
  }

  // Pathify serializer output
  const payload = model.serialize();
  const { attributes, data } = payload;


  if (attributes) result = result.concat(pathifyObject(attributes, store, prefix)); // JSONAPI
  else if (data) result = result.concat(pathifyObject(data, store, prefix)); // JSONAPI
  else result = result.concat(pathifyObject(payload, store, prefix)); // Not JSONAPI

  // Pathify model attributes and child models which will be serialized
  const serializer = store.serializerFor(get(model, '_internalModel.modelName'));

  model.eachAttribute(name => result.push(propertyPath(name, prefix)));
  model.eachRelationship((name, { kind, type }) => {
    if (kind === 'hasMany') return; // not supported
    const childPath = propertyPath(name, prefix);
    const willSerialize = get(serializer, `attrs.${name}.serialize`) === 'records' ||
      get(serializer, `attrs.${name}.embedded`) === 'always';
    if (!willSerialize) {
      result.push(childPath);
    } else {
      const instance = store.createRecord(type);
      result = result.concat(pathifyModel(instance, store, childPath));
      store.deleteRecord(instance);
    }
  });

  return result.uniq();
}

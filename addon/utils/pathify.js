import Ember from 'ember';
import DS from 'ember-data';

export default function pathify (o, prefix, store) {
  if (o instanceof DS.Model) return pathifyModel(o, prefix, store);
  else return pathifyObject(o, prefix);
}

function pathifyObject (o, prefix) {
  var result = [];
  if (prefix) result.push(prefix);
  if (o && typeof o === 'object')
    for (var p in o)
      if (o.hasOwnProperty(p) && /^[a-z_$][a-z0-9_$]*$/i.test(p))
        result = result.concat(pathify(o[p], propertyPath(p, prefix)));
  return result;
}

function pathifyModel (model, prefix, store) {
  var result = [];
  var serializer = store.serializerFor(Ember.get(model, '_internalModel.modelName'));
  if (prefix) result.push(prefix);
  model.eachAttribute(name => result.push(propertyPath(name, prefix)));
  model.eachRelationship((name, meta) => {
    if (meta.kind === 'hasMany') return; // not supported
    var childPath = propertyPath(name, prefix);
    var willSerialize = Ember.get(serializer, `attrs.${name}.serialize`) === 'records' ||
                        Ember.get(serializer, `attrs.${name}.embedded`) === 'always';
    if (!willSerialize) result.push(childPath);
    else {
      var instance = store.createRecord(meta.type);
      result = result.concat(pathify(instance, childPath, store));
      store.deleteRecord(instance);
    }
  });
  return result;
}

function propertyPath (name, prefix) {
  return (prefix ? prefix + '.' : '') + name.camelize();
}

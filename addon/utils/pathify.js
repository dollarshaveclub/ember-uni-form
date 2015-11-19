import Ember from 'ember';
import DS from 'ember-data';

export default function pathify (o, store) {
  if (o instanceof DS.Model) return pathifyModel(o, store);
  else return pathifyObject(o);
}

function pathifyObject (o, prefix) {
  var result = [];
  if (prefix) result.push(prefix);
  if (o && typeof o === 'object') Object.keys(o).forEach(key => {
    result = result.concat(pathifyObject(o[key], propertyPath(key, prefix)));
  });
  return result;
}

// Belt-and-suspenders approach gets field paths from both the ultimate payload
// and the model data structure in memory.
function pathifyModel (model, store, prefix) {

  var result = [];
  if (prefix) result.push(prefix);

  // Pathify serializer output
  var payload = model.serialize();
  payload = payload.data ? payload.data : payload;
  payload = payload.attributes ? payload.attributes : payload;
  result = result.concat(pathifyObject(payload, prefix));

  // Pathify model attributes and child models which will be serialized
  var serializer = store.serializerFor(Ember.get(model, '_internalModel.modelName'));
  model.eachAttribute(name => result.push(propertyPath(name, prefix)));
  model.eachRelationship((name, meta) => {
    if (meta.kind === 'hasMany') return; // not supported
    var childPath = propertyPath(name, prefix);
    var willSerialize = Ember.get(serializer, `attrs.${name}.serialize`) === 'records' ||
                        Ember.get(serializer, `attrs.${name}.embedded`) === 'always';
    if (!willSerialize) result.push(childPath);
    else {
      var instance = store.createRecord(meta.type);
      result = result.concat(pathifyModel(instance, store, childPath));
      store.deleteRecord(instance);
    }
  });

  return result.uniq();

}

function propertyPath (name, prefix) {
  return (prefix ? prefix + '.' : '') + name.camelize();
}

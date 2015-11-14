import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from '../utils/message-priority';
import pathify from '../utils/pathify';

export default DS.Model.extend({

  model: DS.attr(),
  messages: (() => []).property(),
  submitAborted: false,

  //
  // Computed properties
  //

  // TODO interrogate model for attributes and relationships (to support custom serializers)
  fieldNames: function () {
    var payload = this.get('model').serialize();
    payload = payload.data ? payload.data : payload;
    payload = payload.attributes ? payload.attributes : payload;
    return pathify(payload).map(s => s.replace(/\./g, '_'));
  }.property('model'),

  fieldPaths: Ember.computed.map('fieldNames', name => name.replace(/_/g, '.')),

  fieldsByName: function () {
    var result = {};
    this.get('fieldNames').map(name => {
      result[name] = this.store.createRecord('uni-form-field', {
        form: this,
        name: name
      });
    });
    return result;
  }.property('model'),

  //
  // Observers
  //

  watchClientErrors: function () {
    this.get('fieldPaths').forEach(fieldPath => {
      var lastDot = fieldPath.lastIndexOf('.');
      var basename = fieldPath.slice(lastDot + 1);
      var childPath = lastDot === -1 ? '' : fieldPath.slice(0, lastDot);
      var modelPath = childPath ? `model.${childPath}` : 'model';
      var errorsPath = `${modelPath}.validationErrors.${basename}`;
      var syncErrors = () => {
        var errors = this.get(errorsPath);
        this.updateFieldMessages(errors, basename, childPath, 'client', 'error');
      };
      this.addObserver(errorsPath, this, syncErrors);
      syncErrors();
    });
  }.observes('model'),

  //
  // Methods
  //

  addMessage: function (o) {
    var messages = this.get('messages');
    if (typeof o === 'string') {
      messages.push({ body: o });
    }
    if (typeof o === 'object') {
      o.priority = messagePriority(o);
      messages.push(o);
    }
  },

  // Parses output of ember-validations
  updateFieldMessages: function (strings, field, path, source, tone) {
    var messages = this.get('messages').filter(o => o.field  !== field   ||
                                                    o.path   !== path    ||
                                                    o.tone   !== tone    ||
                                                    o.source !== source  );
    Ember.makeArray(strings).forEach(body => {
      messages.push({
        field: field,
        body: body,
        path: path,
        source: source,
        tone: tone,
      });
    });
    this.set('messages', messages);
  },

});

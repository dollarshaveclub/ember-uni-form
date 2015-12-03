import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from 'ember-uni-form/utils/message-priority';
import pathify from 'ember-uni-form/utils/pathify';

export default DS.Model.extend({

  messages: (() => []).property(),
  payload: DS.attr(),

  // Set by component:uni-form.submit when validation fails
  // May be set by client code (form action) on server error
  submitFailed: false,

  //
  // Computed properties
  //

  fieldNames: Ember.computed.map('payloadKeys', name => name.replace(/\./g, '_')),

  fieldsByName: function () {
    var result = {};
    this.get('fieldNames').map(name => {
      result[name] = this.store.createRecord('uni-form-field', {
        form: this,
        name: name
      });
    });
    return result;
  }.property('payload'),

  payloadKeys: function () {
    if (!this.get('payload')) return [];
    return pathify(this.get('payload'), this.get('store'));
  }.property('payload'),

  //
  // Observers
  //

  watchClientErrors: function () {
    this.get('payloadKeys').forEach(payloadKey => {
      var lastDot = payloadKey.lastIndexOf('.');
      var basename = payloadKey.slice(lastDot + 1);
      var parentKey = lastDot === -1 ? '' : payloadKey.slice(0, lastDot);
      var parentPath = parentKey ? `payload.${parentKey}` : 'payload';
      var errorsPath = `${parentPath}.validationErrors.${basename}`;
      var syncErrors = () => {
        var errors = this.get(errorsPath);
        this.updateFieldMessages(errors, basename, parentKey, 'client', 'error');
      };
      this.addObserver(errorsPath, this, syncErrors);
      syncErrors();
    });
  }.observes('payload'),

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
    this.set('messages', messages);
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

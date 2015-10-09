import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from '../utils/message-priority';

export default DS.Model.extend({

  model: DS.attr(),
  messages: (() => []).property(),

  //
  // Computed properties
  //

  fieldNames: function () {
    var payload = this.get('model').serialize();
    payload = payload.data ? payload.data : payload;
    payload = payload.attributes ? payload.attributes : payload;
    return Object.keys(payload).map(Ember.String.camelize);
  }.property('model'),

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
    var validationErrors = this.get('model.validationErrors');
    if (!validationErrors) return;
    this.get('fieldNames').forEach(name => {
      validationErrors.addObserver(name, this, this.parseClientErrors);
    });
    this.parseClientErrors();
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
  parseClientErrors: function () {
    var errors = this.get('model.validationErrors');
    if (!errors) return;
    var messages = this.get('messages').filter(message => message.source !== 'client');
    Object.keys(errors).forEach(key => {
      errors[key].forEach(errorString => {
        messages.push({
          field: key,
          body: errorString,
          source: 'client',
          tone: 'error',
        });
      });
    });
    this.set('messages', messages);
  },

});

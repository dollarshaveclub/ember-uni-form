import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  model: DS.attr(),
  messages: [],

  fieldNames: function () {
    return Object.keys(this.get('model').serialize().data.attributes).map(Ember.String.camelize);
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

  watchClientErrors: function () {
    var validationErrors = this.get('model.validationErrors');
    if (!validationErrors) return;
    this.get('fieldNames').forEach(name => {
      validationErrors.addObserver(name, this, this.parseClientErrors);
    });
  }.observes('model'),

  //
  // Parses output of ember-validations
  //
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

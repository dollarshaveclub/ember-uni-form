import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from 'ember-uni-form/utils/message-priority';
import pathify from 'ember-uni-form/utils/pathify';

export default DS.Model.extend({

  messages: Ember.computed(() => []),

  payload: DS.attr(),

  // Set by component:uni-form.submit when validation fails
  // May be set by client code (form action) on server error
  submitFailed: false,

  //
  // Computed properties
  //

  fieldNames: Ember.computed.map('payloadKeys', name => name.replace(/\./g, '_')),

  fieldsByName: Ember.computed('payload', function () {
    const result = {};
    this.get('fieldNames').map(name => {
      result[name] = this.store.createRecord('uni-form-field', {
        form: this,
        name,
      });
    });
    return result;
  }),

  payloadKeys: Ember.computed('payload', function () {
    if (!this.get('payload')) return [];
    return pathify(this.get('payload'), this.get('store'));
  }),

  //
  // Observers
  //

  watchClientErrors: Ember.observer('payload', function () {
    this.get('payloadKeys').forEach(payloadKey => {
      const lastDot = payloadKey.lastIndexOf('.');
      const basename = payloadKey.slice(lastDot + 1);
      const parentKey = lastDot === -1 ? '' : payloadKey.slice(0, lastDot);
      const parentPath = parentKey ? `payload.${parentKey}` : 'payload';
      const errorsPath = `${parentPath}.validationErrors.${basename}`;
      const syncErrors = () => {
        if (errorsPath.endsWith('.')) return;
        const errors = this.get(errorsPath);
        this.updateFieldMessages(errors, basename, parentKey, 'client', 'error');
      };
      this.addObserver(errorsPath, this, syncErrors);
      syncErrors();
    });
  }),

  //
  // Methods
  //

  addMessage(o) {
    const messages = this.get('messages');
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
  updateFieldMessages(strings, field, path, source, tone) {
    const messages = this.get('messages').filter(o => o.field !== field ||
                                                    o.path !== path ||
                                                    o.tone !== tone ||
                                                    o.source !== source);
    Ember.makeArray(strings).forEach(body => {
      messages.push({
        field,
        body,
        path,
        source,
        tone,
      });
    });
    this.set('messages', messages);
  },

});

import DS from 'ember-data';
import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';
import messagePriority from '../utils/message-priority';

export default DS.Model.extend({

  name: DS.attr('string'),
  form: DS.belongsTo('uni-form', { inverse: null }),
  validations: dynamicAlias('form.model.validations', 'name'),

  //
  // Events
  //

  ready: function () {
    Ember.defineProperty(this, 'value', Ember.computed.alias(`form.model.${this.get('name')}`));
  },

  //
  // Properties
  //

  hasEmberValidations: Ember.computed.bool('form.model.validations'),

  maxlength: Ember.computed.reads('validations.length.maximum'),

  message: Ember.computed.reads('sortedMessages.firstObject'),

  messages: Ember.computed.filter('form.messages', function (message) {
    return message.field === this.get('name');
  }),

  notRequired: Ember.computed.not('required'),

  optional: Ember.computed.and('hasEmberValidations', 'notRequired'),

  required: Ember.computed.bool('validations.presence'),

  sortedMessages: Ember.computed.sort('messages', function (a, b) {
    var p1 = messagePriority(a);
    var p2 = messagePriority(b);
    if (p1 < p2) return 1;
    if (p1 > p2) return -1;
    return 0;
  }),

  tone: Ember.computed.reads('message.tone'),

});

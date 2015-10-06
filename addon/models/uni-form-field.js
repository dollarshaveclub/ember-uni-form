import DS from 'ember-data';
import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';
import messagePriority from '../utils/message-priority';

export default DS.Model.extend({

  name: DS.attr('string'),
  form: DS.belongsTo('uni-form', { inverse: null }),

  maxlength: Ember.computed.reads('validations.length.maximum'),
  required: Ember.computed.reads('validations.presence'),
  validations: dynamicAlias('form.model.validations', 'name'),

  ready: function () {
    Ember.defineProperty(this, 'value', Ember.computed.alias(`form.model.${this.get('name')}`));
  },

  tone: Ember.computed.reads('message.tone'),

  message: Ember.computed.reads('sortedMessages.firstObject'),

  messages: Ember.computed.filter('form.messages', function (message) {
    return message.field === this.get('name');
  }),

  sortedMessages: Ember.computed.sort('messages', function (a, b) {
    var p1 = messagePriority(a);
    var p2 = messagePriority(b);
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
    return 0;
  }),

});

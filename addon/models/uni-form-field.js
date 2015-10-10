import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from '../utils/message-priority';

export default DS.Model.extend({

  name: DS.attr('string'),
  form: DS.belongsTo('uni-form', { inverse: null }),

  //
  // Events
  //

  ready: function () {
    Ember.defineProperty(this, 'validations', Ember.computed.reads(`form.model.validations.${this.get('name')}`));
    Ember.defineProperty(this, 'value', Ember.computed.alias(`form.model.${this.get('name')}`));
  },

  //
  // Properties
  //

  maxlength: Ember.computed.reads('validations.length.maximum'),

  message: Ember.computed.reads('sortedMessages.firstObject'),

  messages: Ember.computed.filter('form.messages', function (message) {
    return message.field === this.get('name');
  }),

  required: Ember.computed.reads('validations.presence'),

  sortedMessages: Ember.computed.sort('messages', function (a, b) {
    var p1 = messagePriority(a);
    var p2 = messagePriority(b);
    if (p1 < p2) return 1;
    if (p1 > p2) return -1;
    return 0;
  }),

  tone: Ember.computed.reads('message.tone'),

});

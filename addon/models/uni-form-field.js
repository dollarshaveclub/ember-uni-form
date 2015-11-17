import DS from 'ember-data';
import Ember from 'ember';
import messagePriority from '../utils/message-priority';

export default DS.Model.extend({

  dynamicAliasReady: false,
  name: DS.attr('string'),
  form: DS.belongsTo('uni-form', { inverse: null }),

  // i.e. "firstName"
  basename: function () {
    return (this.get('path') || '').split('.').pop();
  }.property('path'),

  // i.e. "model" or "model.billingAddress"
  modelPath: function () {
    var parentPath = this.get('parentPath');
    return parentPath ? `model.${parentPath}` : 'model';
  }.property('parentPath'),

  // i.e. "" or "billingAddress"
  parentPath: function () {
    var path = this.get('path');
    var lastDot = path.lastIndexOf('.');
    return lastDot === -1 ? '' : `${path.slice(0, lastDot)}`;
  }.property('path'),

  // i.e. "billingAddress_firstName" for model.billingAddress.firstName
  path: function () {
    return (this.get('name') || '').replace(/_/g, '.');
  }.property('name'),

  //
  // Events
  //

  ready: function () {

    Ember.defineProperty(this, 'value', Ember.computed.alias(`form.model.${this.get('path')}`));

    Ember.defineProperty(this, 'parentValidations', Ember.computed.reads(`form.${this.get('modelPath')}.validations`));
    Ember.defineProperty(this, 'validations', Ember.computed.reads(`parentValidations.${this.get('basename')}`));

    Ember.defineProperty(this, 'maxlength', Ember.computed.bool('validations.length.maximum'));
    Ember.defineProperty(this, 'required', Ember.computed.bool('validations.presence'));

    Ember.defineProperty(this, 'hasEmberValidations', Ember.computed.bool('parentValidations'));
    Ember.defineProperty(this, 'notRequired', Ember.computed.not('required'));
    Ember.defineProperty(this, 'optional', Ember.computed.and('hasEmberValidations', 'notRequired'));

    this.set('dynamicAliasReady', true);
  },

  //
  // Properties
  //

  message: Ember.computed.reads('sortedMessages.firstObject'),

  messages: Ember.computed.filter('form.messages', function (message) {
    return message.field === this.get('basename') && (message.path || '') === this.get('parentPath');
  }),

  sortedMessages: Ember.computed.sort('messages', function (a, b) {
    var p1 = messagePriority(a);
    var p2 = messagePriority(b);
    if (p1 < p2) return 1;
    if (p1 > p2) return -1;
    return 0;
  }),

  tone: Ember.computed.reads('message.tone'),

});

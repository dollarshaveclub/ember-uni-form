import DS from 'ember-data';
import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';

export default DS.Model.extend({

  name: DS.attr('string'),
  form: DS.belongsTo('uni-form', { inverse: null }),

  required: Ember.computed.reads('validations.presence'),
  validations: dynamicAlias('form.model.validations', 'name'),

  ready: function () {
    Ember.defineProperty(this, 'value', Ember.computed.alias(`form.model.${this.get('name')}`));
  },

  messages: Ember.computed.filter('form.messages', function (message) {
    return message.field === this.get('name');
  }),

  error: Ember.computed.reads('errors.firstObject'),
  errors: Ember.computed.filterBy('messages', 'tone', 'error'),
  success: Ember.computed.reads('successes.firstObject'),
  successes: Ember.computed.filterBy('messages', 'tone', 'success'),
  warning: Ember.computed.reads('warnings.firstObject'),
  warnings: Ember.computed.filterBy('messages', 'tone', 'warning'),

});

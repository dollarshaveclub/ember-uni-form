import DS from 'ember-data';
import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';

export default DS.Model.extend({

  name: DS.attr('string'),
  form: DS.belongsTo('uni-form'),

  value: dynamicAlias('form.model', 'name'),

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

import DS from 'ember-data';
import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';

export default DS.Model.extend({

  fields: DS.hasMany('uni-form-field'),
  messages: DS.hasMany('uni-form-message'),

  clientErrorsKey: 'model.validator.errors',
  clientErrorsData: dynamicAlias(null, 'clientErrorsKey'),
  clientErrors: Ember.computed.filterBy('messages', 'source', 'client'),

  serverErrorsKey: 'model.errors',
  serverErrorsData: dynamicAlias(null, 'serverErrorsKey'),
  serverErrors: Ember.computed.filterBy('messages', 'source', 'server'),

  clientErrorsChanged: function () {
    var data = this.get('clientErrorsData');
    console.log('[clientErrorsChanged]', data);
  }.observes('clientErrorsData'),

  serverErrorsChanged: function () {
    var data = this.get('serverErrorsData');
    console.log('[serverErrorsChanged]', data);
  }.observes('serverErrorsData'),

});

import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',
  classNames: [ 'uni-form' ],

  model: Ember.computed.alias('form.model'),

  // DEBUG_EXPORT: function () {
  //   window.parentFormView = this;
  // }.on('didInsertElement'),

});

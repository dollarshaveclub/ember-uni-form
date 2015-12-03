import Ember from 'ember';

export default Ember.Controller.extend({

  uniForm: function () {
    var form = this.store.createRecord('uni-form', { payload: this.get('model') });
    window.form = form;
    return form;
  }.property('model'),

  actions: {

    submit: function () {
      console.log('[controller:payment-method submit]');
    },

  },

});

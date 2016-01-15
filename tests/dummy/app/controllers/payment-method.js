import Ember from 'ember';

export default Ember.Controller.extend({

  uniForm: Ember.computed('model', function () {
    var form = this.store.createRecord('uni-form', { payload: this.get('model') });
    window.form = form;
    return form;
  }),

  actions: {

    submit: function () {
      console.log('[controller:payment-method submit]');
    },

  },

});

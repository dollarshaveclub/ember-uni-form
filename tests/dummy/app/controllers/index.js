import Ember from 'ember'

export default Ember.Controller.extend({

  uniForm: Ember.computed('model', function () {
    var form = this.store.createRecord('uni-form', { payload: this.get('model') })
    window.form = form
    return form
  }),

  dish: 'eggs',
  isDishabled: false,

  isPurplePantsFan: true,
  isPantsDisabled: false,

  actions: {

    submit: function () {
      console.log('[controller:index submit]')
    },

  },

})

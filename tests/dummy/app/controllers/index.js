import Ember from 'ember';

export default Ember.Controller.extend({

  uniForm: function () {
    return this.store.createRecord('uni-form', { model: this.get('model') });
  }.property('model'),

  dish: 'eggs',
  isDishabled: false,

  isPurplePantsFan: true,
  isPantsDisabled: false,

});

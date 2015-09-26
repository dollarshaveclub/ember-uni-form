import Ember from 'ember';
//
// @see https://github.com/indexiatech/ember-forms/blob/master/addon/mixins/in_form.js
//
export default Ember.Mixin.create({

  parentFormView: function () {
    var parentView = this;
    while (parentView = parentView.get('parentView')) {
      if (parentView.get('tagName') === 'form') return parentView;
    }
  }.property('parentView'),

});

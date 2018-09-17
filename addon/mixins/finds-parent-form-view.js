import Ember from 'ember'
//
// @see https://github.com/indexiatech/ember-forms/blob/master/addon/mixins/in_form.js
//

function getFormView (parentView) {
  if (!parentView) return null
  if (parentView.get('tagName') === 'form') return parentView
  return getFormView(parentView.get('parentView'))
}

export default Ember.Mixin.create({

  parentFormView: Ember.computed(function () {
    return getFormView(this.get('parentView'))
  }).volatile(),

})

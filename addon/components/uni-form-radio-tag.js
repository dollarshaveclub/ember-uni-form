import Ember from 'ember'
//
// This is not the component you are looking for.
// It‘s just a helper. You want {{ uni-form-radio }}.
//
export default Ember.Component.extend({

  tagName: 'input',
  classNames: ['uni-form-radio-tag'],
  attributeBindings: ['checked', 'disabled', 'name', 'type', 'value'],
  type: 'radio',

  change () {
    this.set('groupValue', this.get('value'))
  },

})

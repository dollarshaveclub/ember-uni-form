import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'input',
  classNames: [ 'uni-form-radio-input' ],
  attributeBindings: [ 'checked', 'name', 'type', 'value', 'disabled' ],
  type: 'radio',

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  change: function () {
    this.set('groupValue', this.get('value'));
  },

});

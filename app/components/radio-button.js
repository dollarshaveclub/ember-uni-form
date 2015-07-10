import Ember from 'ember';

// {{ radio-button name='dish' value='spam' groupValue=dish }} Spam
// {{ radio-button name='dish' value='eggs' groupValue=dish }} Eggs

export default Ember.Component.extend({

  tagName: 'input',
  attributeBindings: [ 'checked', 'name', 'type', 'value', 'disabled' ],
  type: 'radio',

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  isDisabled: function () {
    return this.get('disabled');
  }.property('disabled'),

  change: function () {
    this.set('groupValue', this.get('value'));
  }

});

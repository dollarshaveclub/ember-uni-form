
// {{ radio-button name='dish' value='spam' groupValue=dish }} Spam
// {{ radio-button name='dish' value='eggs' groupValue=dish }} Eggs
//
App.RadioButtonComponent = Ember.Component.extend({

  attributeBindings: [ 'checked', 'name', 'type', 'value' ],
  tagName: 'input',
  type: 'radio',

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  change: function () {
    this.set('groupValue', this.get('value'));
  }

});

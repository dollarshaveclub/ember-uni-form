// {{ radio-button name='dish' value='spam' groupValue=dish }} Spam
// {{ radio-button name='dish' value='eggs' groupValue=dish }} Eggs
//
App.RadioButtonComponent = Ember.Component.extend({

  attributeBindings: [ 'checked', 'name', 'type', 'value' ],
  tagName: 'input',
  type: 'radio',

  change: function () {
    this.set('groupValue', !parseInt(this.get('value')) );
  }

});

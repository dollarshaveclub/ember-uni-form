import Ember from 'ember';
import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';

export default Ember.Mixin.create(
  DebouncedPropertiesMixin,
{

  debouncedProperties: [ 'inputValue' ],
  inputValueDelay: 100,

  debouncedInputValueChanged: function () {
    this.set('value', this.get('debouncedInputValue'));
  }.observes('debouncedInputValue'),

  focusOut: function () {
    this._super(...arguments);
    this.set('value', this.get('inputValue'));
  },

  valueChanged: function () {
    this.set('inputValue', this.get('value'));
  }.observes('value'),

});

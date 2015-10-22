import Ember from 'ember';
import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';

export default Ember.Mixin.create(
  DebouncedPropertiesMixin,
{

  debouncedProperties: [ 'inputValue' ],
  inputValueDelay: 300,

  debouncedInputValueChanged: function () {
    this.set('value', this.get('debouncedInputValue'));
  }.observes('debouncedInputValue'),

  valueChanged: function () {
    this.set('inputValue', this.get('value'));
  }.observes('value'),

});

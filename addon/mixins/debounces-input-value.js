import Ember from 'ember';
import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';

export default Ember.Mixin.create(
  DebouncedPropertiesMixin,
  {

    debouncedProperties: ['inputValue'],
    inputValueDelay: 100,

    debouncedInputValueChanged: Ember.observer('debouncedInputValue', function () {
      this.set('value', this.get('debouncedInputValue'));
    }),

    focusOut() {
      this._super(...arguments);
      this.set('value', this.get('inputValue'));
    },

    valueChanged: Ember.observer('value', function () {
      this.set('inputValue', this.get('value'));
    }),

  });

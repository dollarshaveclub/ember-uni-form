import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(
  EmberValidations,
{
  errors: null, // prevent EmberValidations from aliasing errors to validationErrors

  addressLine1: DS.attr('string'),
  addressLine2: DS.attr('string'),
  city: DS.attr('string'),
  hasMailbox: DS.attr('boolean'),
  notes: DS.attr('string'),
  state: DS.attr('string'),
  zipCode: DS.attr('string'),
  zoning: DS.attr('string'), // residential, commercial, other

  zoningOptions: [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Other', value: 'other' },
  ],

  addressString: Ember.computed('addressLine1', 'addressLine2', 'city', 'state', 'zipCode', function () {
    return `${this.get('addressLine1')} ${this.get('addressLine2')} ${this.get('city')}, ${this.get('state')} ${this.get('zipCode')}`;
  }),

  validations: {
    addressLine1: {
      length: {
        maximum: 35,
        messages: { tooLong: 'Address line 1 is too long' },
      },
      presence: { message: 'Address line 1 is required' }
    },
    addressLine2: {
      length: {
        maximum: 35,
        messages: { tooLong: 'Address line 2 is too long' },
      }
    },
    city: {
      length: {
        maximum: 40,
        messages: { tooLong: 'City is too long' },
      },
      presence: { message: 'City is required' }
    },
    state: {
      presence: { message: 'State is required' }
    },
    zipCode: {
      numericality: {
        messages: {
          numericality: 'Zip code must be a number'
        }
      }
    }
  }

});

import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(
  EmberValidations,
{
  errors: null,

  addressLine1: DS.attr('string'),
  addressLine2: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zipCode: DS.attr('string'),
  hasMailbox: DS.attr('boolean'),
  zoning: DS.attr('string'), // residential, commercial, other

  zoningOptions: [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Other', value: 'other' },
  ],

  addressString: function () {
    return '%@ %@ %@, %@ %@'.fmt(
      this.get('addressLine1'),
      this.get('addressLine2'),
      this.get('city'),
      this.get('state'),
      this.get('zipCode')
    );
  }.property('addressLine1', 'addressLine2', 'city', 'state', 'zipCode'),

  validations: {
    addressLine1: {
      length: { maximum: 35 },
      presence: true
    },
    addressLine2: {
      length: { maximum: 35 }
    },
    city: {
      length: { maximum: 40 },
      presence: true
    },
    state: {
      presence: true
    },
    zipCode: {
      numericality: true
    }
  }

});

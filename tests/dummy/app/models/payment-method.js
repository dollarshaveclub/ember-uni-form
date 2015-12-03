import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var NUM_YEAR_OPTIONS = 13;

export default DS.Model.extend(
  EmberValidations,
{
  errors: null, // prevent EmberValidations from aliasing errors to validationErrors

  billingAddress: DS.belongsTo('address'),
  billingAddressSameAsShippingAddress: DS.attr('boolean'),
  cvv: DS.attr('string'),
  expMonth: DS.attr('string'),
  expYear: DS.attr('string'),
  number: DS.attr('string'),

  validations: {
    cvv: {
      numericality: { messages: { numericality: 'CVV must be a number' } },
      presence: { message: 'CVV is required' },
      length: {
        minimum: 3,
        maximum: 4,
        messages: { tooShort: 'CVV is too short', tooLong: 'CVV is too long' },
      }
    },
    expMonth: {
      presence: { message: 'Month is required' },
    },
    expYear: {
      presence: { message: 'Year is required' },
    },
    number: {
      presence: { message: 'Number is required' },
      length: {
        maximum: 16,
        minimum: 15,
        messages: { tooLong: 'Number is too long', tooShort: 'Number is too short' },
      }
    }
  },

  monthOptions: function () {
    return [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
    .map(s => ({ label: s, value: s }));
  }.property(),

  yearOptions: function () {
    var year = new Date().getFullYear();
    var options = [];
    for (var i = 0; i < NUM_YEAR_OPTIONS; i++) {
      var s = (year + i).toString();
      options.push({ label: s, value: s });
    }
    return options;
  }.property(),

});

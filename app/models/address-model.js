App.Address = DS.Model.extend(
  Ember.Validations.Mixin,
{
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  addressLine_1: DS.attr('string'),
  addressLine_2: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zipCode: DS.attr('string'),

  name: function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  validations: {
    firstName: {
      length: { maximum: 25 },
      presence: true
    },
    lastName: {
      length: { maximum: 25 },
      presence: true
    },
    addressLine_1: {
      length: { maximum: 35 },
      presence: true
    },
    addressLine_2: {
      length: { maximum: 35 },
      presence: true
    },
    city: {
      length: { maximum: 40 },
      presence: true
    },
    state: {
      presence: true
    },
    zipCode: {
      length: 5,
      numericality: true,
      presence: true
    }
  }

});

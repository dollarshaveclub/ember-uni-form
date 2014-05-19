App.Address = DS.Model.extend({
  addressLine_1: DS.attr('string'),
  addressLine_2: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  country: DS.attr('string'),
  postalCode: DS.attr('string')
});

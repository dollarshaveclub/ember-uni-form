App.Address = DS.Model.extend({
  address_line_1: DS.attr('string'),
  address_line_2: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  country: DS.attr('string'),
  postal_code: DS.attr('string')
});

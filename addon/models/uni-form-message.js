import DS from 'ember-data';

export default DS.Model.extend({

  body: DS.attr('string'),              // Please enter a valid email address.
  field: DS.attr('string'),             // null, email, password, firstName
  source: DS.attr('string'),            // null, client, server
  tone: DS.attr('string'),              // null, error, warning, success, info, muted

});

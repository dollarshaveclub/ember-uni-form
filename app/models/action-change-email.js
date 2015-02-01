import DS from 'ember-data';
import EmberValidations from 'ember-validations';
import HandlesSubmissionEvents from '../mixins/handles-submission-events';
import RESTAdapter from '../adapters/rest';

export default DS.Model.extend(
  EmberValidations.Mixin,
  HandlesSubmissionEvents,
{
  newEmail: DS.attr('string'),
  currentPassword: DS.attr('string'),

  validations: {
    newEmail: {
      format: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i, // @see customer.rb
      length: { maximum: 255 },
      presence: true
    },
    currentPassword: {
      length: { minimum: 6 },
      presence: true
    }
  },

  submit: function (user) {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: RESTAdapter.create().buildURL('user', user.get('id')) + '/change_email',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          user: self.serialize()
        })
      }).then(function (data) {
        self.trigger('submissionSuccess', resolve, data);
      }, function (jqXHR) {
        self.trigger('submissionError', reject, jqXHR);
      });
    });
  }

});

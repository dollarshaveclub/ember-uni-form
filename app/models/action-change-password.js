import DS from 'ember-data';
import EmberValidations from 'ember-validations';
import HandlesSubmissionEvents from '../mixins/handles-submission-events';
import ApplicationAdapter from '../adapters/application';

export default DS.Model.extend(
  EmberValidations.Mixin,
  HandlesSubmissionEvents,
{

  currentPassword: DS.attr('string'),
  newPassword: DS.attr('string'),
  newPasswordConfirmation: DS.attr('string'),

  validations: {
    currentPassword: {
      length: { minimum: 6 },
      presence: true
    },
    newPassword: {
      confirmation: true,
      length: { minimum: 6 },
      presence: true
    }
  },

  minLength: Ember.computed.alias('validations.newPassword.length.minimum'),

  submit: function (userService) {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: ApplicationAdapter.create().buildURL('user', userService.get('model.id')) + '/change_password',
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

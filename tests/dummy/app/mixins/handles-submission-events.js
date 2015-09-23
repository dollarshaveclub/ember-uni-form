import Ember from 'ember';

export default Ember.Mixin.create(
  Ember.Evented,
{

  handleSubmissionSuccess: function (resolve, data) {
    console.log('[HandlesSubmissionEvents success]', arguments);
    this.get('store').pushPayload(data);
    resolve(data);
  }.on('submissionSuccess'),

  handleSubmissionError: function (reject, jqXHR) {
    console.log('[HandlesSubmissionEvents error]', arguments);
    if (jqXHR.status === 401) {
      reject({ errors: [ 'Please try again.' ], unauthorized: true });
    } else {
      var errors = JSON.parse(jqXHR.responseText).errors || [];
      reject({ errors: errors });
    }
  }.on('submissionError')

});

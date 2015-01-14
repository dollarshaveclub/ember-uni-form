App.HandlesSubmissionEvents = Ember.Mixin.create(
  Ember.Evented,
{

  handleSubmissionSuccess: function (resolve, response) {
    console.log('[HandlesSubmissionEvents success]', arguments);
    this.get('store').pushPayload(response);
    resolve(response);
  }.on('submissionSuccess'),

  handleSubmissionError: function (reject, response) {
    console.log('[HandlesSubmissionEvents error]', arguments);
    if (response.status === 401 || response.http_status === 401) { // TEMPORARY HACK @see RESTAdapter.ajaxError
      reject({ errors: [ 'Please try again.' ], unauthorized: true });
    } else {
      var errors = JSON.parse(response.responseText).errors || [];
      reject({ errors: errors });
    }
  }.on('submissionError')

});

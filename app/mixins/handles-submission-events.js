App.HandlesSubmissionsEvents = Ember.Mixin.create(
  Ember.Evented,
{

  handleSubmissionSuccess: function (resolve, response) {
    // console.log('[HandlesSubmissionEvents Mixin Success]', arguments);
    this.get('store').pushPayload(response);
    resolve(response);
  }.on('submissionSuccess'),

  handleSubmissionError: function (reject, response) {
    // console.log('[HandlesSubmissionEvents Mixin Failure]', arguments);

    if ( response.status === 401 ) {
      reject({ errors: [ 'Please try again.' ], unauthorized: true });
    } else {
      var errors = JSON.parse(response.responseText).errors || [];
      reject({ errors: errors });
    }

  }.on('submissionError')

});

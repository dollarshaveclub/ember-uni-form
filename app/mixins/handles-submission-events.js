App.HandlesSubmissionsEvents = Ember.Mixin.create(
  Ember.Evented,
{

  handleSubmissionSuccess: function (resolve, result) {
    this.get('store').pushPayload(result);
    resolve(result);
  }.on('submissionSuccess'),

  handleSubmissionError: function (reject, result) {
    // console.log('[HandlesSubmissionEvents Mixin]', arguments);
    var errors = JSON.parse(result.responseText).errors || [];
    reject(errors);
  }.on('submissionError')

});

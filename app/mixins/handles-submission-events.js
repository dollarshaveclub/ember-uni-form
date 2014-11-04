App.HandlesSubmissionsEvents = Ember.Mixin.create(
  Ember.Evented,
{

  handleSubmissionSuccess: function (resolve, result) {
    this.get('store').pushPayload(result);
    resolve(result);
  }.on('submissionSuccess'),

  handleSubmissionError: function (reject, result) {
    console.log('[HandlesSubmissionsErrors Mixins]', arguments);
    var errorMessages = [];

    try {
      var messages = JSON.parse(result.responseText).messages || {};
      for ( var key in messages ) {
        messages[key].forEach(function(msg){
          errorMessages.push('%@ %@.'.fmt(key, msg));
        });
      }
    } catch(error) {
      errorMessages.push('There was an error processing your request.');
    }

    reject(errorMessages);
  }.on('submissionError')

});

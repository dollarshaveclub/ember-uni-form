
App.ProvidesUIErrors = Ember.Mixin.create(
  Ember.Evented,
{

  // Push and remove properties onto `shownValidationProperties`
  // to indicate to the model that given property should display a UI
  // error message.
  propertiesInUIErrorState: [ ],

  // Trigger `shouldShowValidationError` or `dismissValidationError`
  // with a given property to push/remove that name onto shownValidationProperties
  showValidationError: function (name) {
    this.get('propertiesInUIErrorState').pushObject(name);
  }.on('shouldShowValidationError'),

  dismissValidationError: function (name) {
    this.get('propertiesInUIErrorState').removeObject(name);
  }.on('shouldDismissValidationError'),

  // An array of validation errors, queued off of `propertiesInUIErrorState`
  uiValidationErrors: function () {
    var validationErrors = this.get('errors');
    var properties = this.get('propertiesInUIErrorState');

    if (!validationErrors || !properties) return;

    var errors;
    var messages = properties.map(function(name){
      errors = validationErrors.get(name) || [];
      return errors.map(function(error){
        return name.titleize() + ' ' + error;
      });
    });

    var flattened = [];
    return flattened.concat.apply(flattened, messages);
  }.property('errors.@each', 'propertiesInUIErrorState.@each')

});

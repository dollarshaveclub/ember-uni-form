import Ember from 'ember';

export default Ember.Mixin.create(
  Ember.Evented,
{

  // Push and remove properties onto `propertiesInUIErrorState`
  // to indicate to the model that given property should display a UI
  // error message.

  // Note that mixins extend a constructor's prototype so arrays and
  // object literals defined as properties will be shared amongst objects
  // that implement the mixin. If you want to define a property in a mixin
  // that is not shared, you can define it either as a computed property
  // or have it be created on initialization of the object.

  propertiesInUIErrorState: [],

  // Trigger `shouldShowValidationError` or `dismissValidationError`
  // with a given property to push/remove that name onto propertiesInUIErrorState

  showValidationError: function (name) {
    if (this.get('propertiesInUIErrorState').contains(name)) return;
    this.get('propertiesInUIErrorState').pushObject(name);
  }.on('shouldShowValidationError'),

  dismissValidationError: function (name) {
    this.get('propertiesInUIErrorState').removeObject(name);
  }.on('shouldDismissValidationError'),

  // An array of validation errors,
  // queued off of `propertiesInUIErrorState`

  uiValidationErrors: function () {
    var validationErrors = this.get('errors');
    var properties = this.get('propertiesInUIErrorState');

    if (!validationErrors || !properties) return;

    var errors;
    var messages = properties.map(function (name) {
      errors = validationErrors.get(name) || [];
      return errors.map(function (error) {
        return name.titleize() + ' ' + error;
      });
    });

    var flattened = [];
    return flattened.concat.apply(flattened, messages);
  }.property('errors.@each', 'propertiesInUIErrorState.@each')

});

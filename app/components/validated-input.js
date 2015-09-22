require('../mixins/handles-validation-errors-for-inputs');
require('../mixins/triggers-change');

App.ValidatedInputComponent = Ember.TextField.extend(
  App.HandlesValidationErrorsForInputs,
  App.TriggersChange,
{
  classNameBindings: [ 'error', 'required' ],
  attributeBindings: [ 'type' ],

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  type: 'text',

  error: function () {
    if (this.get('parentModel.showInputErrors') || this.get('showError')) return this.get('isInvalid');
    return false;
  }.property('showError', 'parentModel.showInputErrors', 'isInvalid'),

  focusOut: function () {
    this.set('showError', true);
  },

  keyUp: function () {
    this.set('showError', false);
  },

  required: function () {
    if (!this.get('parentModel')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

});

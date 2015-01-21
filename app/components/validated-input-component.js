require('../mixins/handles-validation-errors-for-inputs');
require('../mixins/triggers-change');


App.ValidatedInputComponent = Ember.TextField.extend(
  App.HandlesValidationErrorsForInputs,
  App.TriggersChange,
{
  classNameBindings: [ 'showError:error', 'required' ],
  attributeBindings: [ 'type' ],

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  type: 'text',

  focusOut: function () {
    this.set('showError', this.get('isInvalid'));
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  required: function () {
    if (!this.get('parentModel')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

});

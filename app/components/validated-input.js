import Ember from 'ember';
import HandlesValidationErrorsForInputs from '../mixins/handles-validation-errors-for-inputs';
import TriggersChange from '../mixins/triggers-change';

export default Ember.TextField.extend(
  HandlesValidationErrorsForInputs,
  TriggersChange,
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

  keyDown: function (e) {
    if (e.which === 13) {
      this.sendAction('enterKey');
    }
  },

  required: function () {
    if (!this.get('parentModel')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

});

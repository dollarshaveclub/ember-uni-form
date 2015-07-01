import Ember from 'ember';
import HandlesValidationErrorsForInputs from '../mixins/handles-validation-errors-for-inputs';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Select.extend(
  HandlesValidationErrorsForInputs,
  TriggersChange,
{

  classNameBindings: [ 'error', 'required', 'isPlaceholder:placeholder' ],
  attributeBindings: [ 'autocomplete' ],

  autocomplete: true,
  isInvalid: Ember.computed.notEmpty('errors'),
  isPlaceholder: Ember.computed.not('value'),
  isValid: Ember.computed.empty('errors'),

  makeSelection: function () {
    // Ember's `prompt` is not working as expected as of 1.13
    // So, I present this hack!
    if( this.get('value') ) {
      this.$('option[value="' + this.get('value') + '"]').attr('selected','selected');
    } else {
      this.$('option:first').attr('selected','selected');
    }
  }.on('didInsertElement'),

  error: function () {
    if (this.get('parentModel.showInputErrors') || this.get('showError')) return this.get('isInvalid');
    return false;
  }.property('showError', 'parentModel.showInputErrors', 'isInvalid'),

  focusOut: function () {
    this.set('showError', true);
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  keyDown: function (e) {
    if (e.which === 13) {
      this.get('controller').send('save');
    }
  },

  required: function () {
    if (!this.get('parentModel.validations')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations')

});

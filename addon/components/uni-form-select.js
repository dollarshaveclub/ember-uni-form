import Ember from 'ember';
import layout from '../templates/uni-form-select';
import FindsParentForm from '../mixins/finds-parent-form';
import TriggersChange from '../mixins/triggers-change';
//
// Empty string value is reserved for the prompt option.
//
var PROMPT_VALUE = '';
//
// Content must be in this format:
// [
//   { label: 'Jan', value: 1 },
//   { label: 'Feb', value: 2 },
// ]
//
export default Ember.Component.extend(
  FindsParentForm,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-select' ],
  classNameBindings: [ 'disabled', 'prompting', 'required', 'tone' ],
  layout: layout,

  name: Ember.computed.reads('property'),
  prompting: Ember.computed.equal('value', PROMPT_VALUE),
  required: Ember.computed.bool('validations.presence'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (this.attrs && this.attrs.property) {
      this.validations = Ember.computed.reads(`parentFormView.model.validations.${this.get('property')}`);
      if (!this.attrs.value) {
        this.value = Ember.computed.alias(`parentFormView.model.${this.get('property')}`);
      }
    }
  },

});

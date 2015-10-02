import Ember from 'ember';
import layout from '../templates/uni-form-select';
import FindsFieldByName from '../mixins/finds-field-by-name';
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
  FindsFieldByName,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-select' ],
  classNameBindings: [ 'disabled', 'prompting', 'required', 'tone' ],
  layout: layout,

  message: Ember.computed.reads('field.message'),
  name: Ember.computed.reads('property'),
  required: Ember.computed.reads('field.required'),
  tone: Ember.computed.reads('field.tone'),
  value: Ember.computed.alias('field.value'),

  prompting: function () {
    var value = this.get('value');
    return typeof value !== 'string' || value === PROMPT_VALUE;
  }.property('value'),

});

import Ember from 'ember';
import layout from '../templates/uni-form-select';
import HasFieldStatus from '../mixins/has-field-status';
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
  HasFieldStatus,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-select' ],
  classNameBindings: [ 'disabled', 'prompting' ],
  layout: layout,

  name: Ember.computed.reads('property'),
  value: Ember.computed.alias('field.value'),

  prompting: function () {
    var value = this.get('value');
    return typeof value !== 'string' || value === PROMPT_VALUE;
  }.property('value'),

});

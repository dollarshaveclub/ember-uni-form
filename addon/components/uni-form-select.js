import Ember from 'ember';
import layout from '../templates/uni-form-select';
import HasFieldStatus from '../mixins/has-field-status';
import TriggersChange from '../mixins/triggers-change';
//
// Content must be in this format:
//
// [
//   { label: 'Jan', value: 1 },
//   { label: 'Feb', value: 2 },
// ]
//
// i.e. optionLabelPath='content.label'
//      optionValuePath='content.value'
//
export default Ember.Component.extend(
  HasFieldStatus,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-select' ],
  layout: layout,

});

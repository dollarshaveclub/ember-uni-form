import Ember from 'ember';
import DebouncesInputValue from '../mixins/debounces-input-value';
import layout from '../templates/uni-form-textarea';
import HasFieldStatus from '../mixins/has-field-status';

export default Ember.Component.extend(
  DebouncesInputValue,
  HasFieldStatus,
{

  tagName: 'label',
  classNames: [ 'uni-form-textarea' ],
  layout: layout,

  name: Ember.computed.reads('property'),
  value: Ember.computed.alias('field.value'),

});

import Ember from 'ember'
import DebouncesInputValue from '../mixins/debounces-input-value'
import layout from '../templates/uni-form-input'
import HasFieldStatus from '../mixins/has-field-status'
import TriggersChange from '../mixins/triggers-change'

export default Ember.Component.extend(
  DebouncesInputValue,
  HasFieldStatus,
  TriggersChange,
  {

    tagName: 'label',
    classNames: ['uni-form-input'],
    layout,
    type: 'text',

  })

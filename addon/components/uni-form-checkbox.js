import Ember from 'ember';
import layout from '../templates/uni-form-checkbox';
import HasFieldStatus from '../mixins/has-field-status';
//
// Standalone:
//
// {{#uni-form-checkbox value=billingSameAsShipping }}
//   Billing same as shipping
// {{/uni-form-checkbox}}
//
// Within a uni-form component:
//
// {{#uni-form form=uniForm }}
//   {{#uni-form-checkbox payloadKey='billingSameAsShipping' }}
//     Billing same as shipping
//   {{/uni-form-checkbox}}
// {{/uni-form}}
//
export default Ember.Component.extend(
  HasFieldStatus,
{

  tagName: 'label',
  classNames: [ 'uni-form-checkbox' ],
  classNameBindings: [ 'checked', 'disabled' ],
  layout: layout,

  checked: Ember.computed.alias('value'),
  label: '',
  prompting: false,

});

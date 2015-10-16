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
//   {{#uni-form-checkbox property='billingSameAsShipping' }}
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
  name: Ember.computed.reads('property'),
  prompting: false,
  value: Ember.computed.alias('field.value'),

});

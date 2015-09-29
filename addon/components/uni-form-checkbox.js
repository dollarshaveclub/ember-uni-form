import Ember from 'ember';
import layout from '../templates/uni-form-checkbox';
import FindsFieldByName from '../mixins/finds-field-by-name';
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
  FindsFieldByName,
{

  tagName: 'label',
  classNames: [ 'uni-form-checkbox' ],
  classNameBindings: [ 'checked', 'disabled', 'required', 'tone' ],
  layout: layout,

  checked: Ember.computed.alias('value'),
  name: Ember.computed.reads('property'),
  required: Ember.computed.reads('field.required'),
  value: Ember.computed.alias('field.value'),

});

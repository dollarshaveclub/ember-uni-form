import Ember from 'ember';
import layout from '../templates/components/uni-form-checkbox';
import FindsParentForm from '../mixins/finds-parent-form';
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
  FindsParentForm,
{

  tagName: 'label',
  classNames: [ 'uni-form-checkbox' ],
  classNameBindings: [ 'checked', 'disabled' ],
  layout: layout,

  checked: Ember.computed.alias('value'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (!this.attrs.value) this.value = Ember.computed.alias(`form.model.${this.get('property')}`);
  },

});

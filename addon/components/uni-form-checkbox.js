import Ember from 'ember';
import layout from '../templates/components/uni-form-checkbox';

// {{ uni-form-checkbox label='Billing address same as shipping'
//                    name='billingSameAsShipping'
//                    value=uniFormModel.billingAddressSameAsShippingAddress }}

export default Ember.Component.extend({

  tagName: 'label',
  classNames: [ 'uni-form-checkbox' ],
  classNameBindings: [ 'checked', 'disabled' ],
  attributeBindings: [ 'name' ],
  layout: layout,

  checked: Ember.computed.alias('value'),

});

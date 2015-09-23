import Ember from 'ember';

// {{ uni-form-checkbox label='Billing address same as shipping'
//                    name='billingSameAsShipping'
//                    value=uniFormModel.billingAddressSameAsShippingAddress }}

export default Ember.Component.extend({

  classNames: [ 'uni-form-checkbox' ],
  classNameBindings: [ 'checked' ],
  attributeBindings: [ 'name' ],

  checked: Ember.computed.boolean('value'),

  click: function () {
    this.toggleProperty('value');
  },

});

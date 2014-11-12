
require('../components/validated-form-component');

App.ValidatedPaymentFormComponent = App.ValidatedFormComponent.extend({

  classNameBindings: [ 'cardType' ],

  address: Ember.computed.alias('formModel.billingAddress'),
  cardType: Ember.computed.alias('payment.creditCardType'),
  sameAsShipping: Ember.computed.alias('payment.billingAddressSameAsShippingAddress'),
  payment: Ember.computed.alias('formModel'),

  isValid: function() {
    if( this.get('sameAsShipping') ) {
      return this.get('payment.isValid');
    } else {
      return this.get('payment.isValid') && this.get('address.isValid');
    }
  }.property('payment.isValid', 'address.isValid', 'sameAsShipping'),

  rollbackAddress: function() {
    this.get('address').then(function(address) {
      address.rollback();
    });
  }.observes('sameAsShipping')

});

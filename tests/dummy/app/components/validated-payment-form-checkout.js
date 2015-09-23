import Ember from 'ember';
import ValidatedPaymentFormComponent from './validated-payment-form';

export default ValidatedPaymentFormComponent.extend({

  creditsCoverTotal: Ember.computed.alias('currentUser.model.nextBox.creditsCoverTotal'),
  purchase: 'purchase',
  skipPaymentMethod: Ember.computed.alias('currentUser.createSubscriptionAction.skipPaymentMethod'),
  total: Ember.computed.alias('currentUser.model.nextBox.total'),
  walletBalance: Ember.computed.alias('currentUser.model.walletBalance'),

  shippingAddress: Ember.computed.oneWay('currentUser.model.subscription.shippingAddress'),

  shippingAddressComplete: function () {
    return !!(
      this.get('shippingAddress.firstName') &&
      this.get('shippingAddress.lastName') &&
      this.get('shippingAddress.addressLine_1') &&
      this.get('shippingAddress.city') &&
      this.get('shippingAddress.state') &&
      this.get('shippingAddress.zipCode')
    );
  }.property( 'shippingAddress.firstName',
              'shippingAddress.lastName',
              'shippingAddress.addressLine_1',
              'shippingAddress.city',
              'shippingAddress.state',
              'shippingAddress.zipCode'),

  showPaymentForm: function () {
    if (!this.get('creditsCoverTotal')) return true;
    return this.get('skipPaymentMethod') === '0';
  }.property('creditsCoverTotal', 'skipPaymentMethod'),

  hasWalletBalance: function () {
    return this.get('walletBalance') > 0;
  }.property('walletBalance')

});

import Ember from 'ember';
import ValidatedPaymentFormComponent from './validated-payment-form';

export default ValidatedPaymentFormComponent.extend({

  creditsCoverTotal: Ember.computed.alias('currentUser.nextBox.creditsCoverTotal'),
  purchase: 'purchase',
  skipPaymentMethod: Ember.computed.alias('currentUser.createSubscriptionAction.skipPaymentMethod'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  walletBalance: Ember.computed.alias('currentUser.walletBalance'),

  showPaymentForm: function () {
    if (!this.get('creditsCoverTotal')) return true;
    return this.get('skipPaymentMethod') === '0';
  }.property('creditsCoverTotal', 'skipPaymentMethod'),

  hasWalletBalance: function () {
    return this.get('walletBalance') > 0;
  }.property('walletBalance')

});

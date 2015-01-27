import Ember from 'ember';
import ValidatedPaymentFormComponent from './validated-payment-form';

export default ValidatedPaymentFormComponent.extend({

  walletBalance: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  creditsCoverTotal: Ember.computed.alias('currentUser.nextBox.creditsCoverTotal'),
  skipPaymentMethod: Ember.computed.alias('currentUser.createSubscriptionAction.skipPaymentMethod'),
  purchase: 'purchase',

  showPaymentForm: function () {
    if (!this.get('creditsCoverTotal')) return true;
    return this.get('skipPaymentMethod') === '0';
  }.property('creditsCoverTotal', 'skipPaymentMethod'),

  hasWalletBalance: function () {
    return this.get('walletBalance') > 0;
  }.property('walletBalance')

});

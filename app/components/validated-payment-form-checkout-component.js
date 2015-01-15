require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  walletBalance: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  purchase: 'purchase',

  showPaymentForm: function () {
    if (!this.get('creditsCoverTotal')) return true;
    return this.get('currentUser.createSubscriptionAction.skipPaymentMethod') === '0';
  }.property('creditsCoverTotal', 'currentUser.createSubscriptionAction.skipPaymentMethod'),

  creditsCoverTotal: function () {
    return this.get('walletBalance') > this.get('total');
  }.property('walletBalance', 'total'),

  hasWalletBalance: function () {
    return this.get('walletBalance') > 0;
  }.property('walletBalance')

});

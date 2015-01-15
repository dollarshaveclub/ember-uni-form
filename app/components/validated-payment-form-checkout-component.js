
require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  walletBalance: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  showPaymentForm: true,
  creditsCoverTotal: false,
  purchase: 'purchase',

  actions: {

    submit: function () {
      this.sendAction('purchase');
    }

  },

  // For some reason, property does not work here,
  // so we add observers below.
  watchSkipPaymentMethod: function () {
    if (this.get('creditsCoverTotal')) {
      this.set('showPaymentForm', !this.get('skipPaymentMethod'));
    } else {
      this.set('showPaymentForm', true);
    }
  }.observes('skipPaymentMethod', 'creditsCoverTotal', 'user.isLoggedIn'),

  watchCreditsAndTotal: function () {
    this.set('creditsCoverTotal', this.get('walletBalance') > this.get('total'));
  }.observes('walletBalance', 'total'),

  skipPaymentMethod: function () {
    return parseInt(this.get('user.createSubscriptionAction.skipPaymentMethod'));
  }.property('user.createSubscriptionAction.skipPaymentMethod'),

  hasWalletBalance: function () {
    return this.get('walletBalance') > 0;
  }.property('credits')

});

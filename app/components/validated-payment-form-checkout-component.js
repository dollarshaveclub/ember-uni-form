
require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  credits: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  showPaymentForm: true,

  creditsCoverTotal: function () {
    return this.get('credits') > this.get('total');
  }.property('credits', 'total'),

  // For some reason, property does not work here,
  // so we add an observer below.
  watchSkipPaymentMethod: function () {
    if (this.get('creditsCoverTotal')) {
      this.set('showPaymentForm', !this.get('skipPaymentMethod'));
    } else {
      this.set('showPaymentForm', true);
    }
  }.observes('skipPaymentMethod', 'creditsCoverTotal', 'user.isLoggedIn'),

  skipPaymentMethod: function () {
    return parseInt(this.get('user.createSubscriptionAction.skipPaymentMethod'));
  }.property('user.createSubscriptionAction.skipPaymentMethod'),

  walletBalance: function () {
    var walletBalance = this.get('credits') > 0;
    return walletBalance;
  }.property('credits')

});

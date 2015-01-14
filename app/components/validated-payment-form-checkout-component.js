
require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  credits: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),
  showPaymentForm: true,

  creditsCoverTotal: function () {
    var covered = this.get('credits') > this.get('total');
    return covered;
  }.property('credits', 'total'),

  // For some reason, property does not work here,
  // so we add an observer below.
  watchSkipPaymentMethod: function () {
    if (!this.get('creditsCoverTotal')) {
      this.set('showPaymentForm', true);
    } else {
      this.set('showPaymentForm', !parseInt(this.get('user.createSubscriptionAction.skipPaymentMethod')));
    }
  }.observes('user.createSubscriptionAction.skipPaymentMethod'),

  walletBalance: function () {
    var walletBalance = this.get('credits') > 0;
    return walletBalance;
  }.property('credits')

});


require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  credits: Ember.computed.alias('currentUser.walletBalance'),
  showPaymentFormFields: '0',
  total: Ember.computed.alias('currentUser.nextBox.total'),

  creditsCoverTotal: function () {
    var covered = this.get('credits') > this.get('total');
    this.set('showPaymentForm', !covered);
    return covered;
  }.property('credits', 'total'),

  showPaymentForm: function () {
    return this.get('showPaymentFormFields') === '1';
  }.property('showPaymentFormFields'),

  showPaymentFormChanged: function () {
    this.send('showPaymentFormChanged', this.get('showPaymentForm'));
  }.observes('showPaymentForm'),

  togglePaymentForm: function() {
    return this.set('showPaymentForm', this.get('showPaymentFormFields') === '1');
  }.observes('showPaymentFormFields'),

  walletBalance: function () {
    var walletBalance = this.get('credits') > 0;
    if ( !walletBalance ) this.set('showPaymentForm', true);
    return walletBalance;
  }.property('credits')

});

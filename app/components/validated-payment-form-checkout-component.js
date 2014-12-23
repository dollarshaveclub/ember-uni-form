
require('../components/validated-payment-form-component');

App.ValidatedPaymentFormCheckoutComponent = App.ValidatedPaymentFormComponent.extend({

  credits: Ember.computed.alias('currentUser.walletBalance'),
  total: Ember.computed.alias('currentUser.nextBox.total'),

  creditsCoverTotal: function () {
    var covered = this.get('credits') > this.get('total');
    if ( !covered ) this.set('showPaymentForm', true);
    return covered;
  }.property('credits', 'total'),

  showPaymentForm: function () {
    return this.get('showPaymentFormFields') === '1';
  }.property('showPaymentFormFields'),

  showPaymentFormChanged: function () {
    this.send('showPaymentFormChanged', this.get('showPaymentForm'));
  }.observes('showPaymentForm'),

  showPaymentFormFields: function () {
    return '0';
  }.property(),

  walletBalance: function () {
    var walletBalance = this.get('credits') > 0;
    if ( !walletBalance ) this.set('showPaymentForm', true);
    return walletBalance;
  }.property('credits')

});

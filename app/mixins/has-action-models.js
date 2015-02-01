import Ember from 'ember';
//
// Mixed in to CurrentUserService
//
export default Ember.Mixin.create({

  createAccountAction: function () {
    if (this.get('_createAccountAction')) return this.get('_createAccountAction');
    var createAccountAction = this.get('store').createRecord('action-create-account');
    this.set('_createAccountAction', createAccountAction);
    return createAccountAction;
  }.property(),

  createSessionAction: function () {
    if (this.get('_createSessionAction')) return this.get('_createSessionAction');
    var createSessionAction = this.get('store').createRecord('action-create-session');
    this.set('_createSessionAction', createSessionAction);
    return createSessionAction;
  }.property(),

  createSubscriptionAction: function () {
    if (this.get('_createSubscriptionAction')) return this.get('_createSubscriptionAction');

    var store = this.get('store');
    var paymentMethod = store.createRecord('paymentMethod');
    paymentMethod.set('billingAddress', store.createRecord('address'));
    paymentMethod.set('billingAddressSameAsShippingAddress', true);

    var createSubscriptionAction = store.createRecord('action-create-subscription').setProperties({
      user: this.get('model'),
      shippingAddress: store.createRecord('address'),
      paymentMethod: paymentMethod,
      coupon: store.createRecord('coupon'),
      giftCard: store.createRecord('giftCard')
    });

    this.set('_createSubscriptionAction', createSubscriptionAction);
    return createSubscriptionAction;
  }.property(),

  onStatusChange: function () {
    if (!this.get('_createSubscriptionAction')) return;
    this.set('_createSubscriptionAction.user', this.get('model'));
  }.observes('model.status'),

});

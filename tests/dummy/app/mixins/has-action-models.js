import Ember from 'ember';
//
// TODO refactor into service:form-data
//
export default Ember.Mixin.create({

  createAccountAction: function () {
    return this.get('store').createRecord('actionCreateAccount');
  }.property(),

  createSessionAction: function () {
    return this.get('store').createRecord('actionCreateSession');
  }.property(),

  createSubscriptionAction: function () {

    var store = this.get('store');
    var paymentMethod = store.createRecord('paymentMethod');

    var billing = store.createRecord('address');
    var shipping = store.createRecord('address');
    billing.set('shouldVerify', true);
    shipping.set('shouldVerify', true);

    paymentMethod.set('billingAddress', billing);
    paymentMethod.set('billingAddressSameAsShippingAddress', true);

    return store.createRecord('actionCreateSubscription').setProperties({
      shippingAddress: shipping,
      paymentMethod: paymentMethod,
      coupon: store.createRecord('coupon'),
      giftCard: store.createRecord('giftCard')
    });

  }.property(),

});

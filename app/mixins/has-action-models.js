
App.HasActionModels = Ember.Mixin.create({

  createSubscriptionAction: function () {
    if (this.get('_createSubscriptionAction')) return this.get('_createSubscriptionAction');

    var store = this.get('store');
    var paymentMethod = store.createRecord('paymentMethod');
    paymentMethod.set('billingAddress', store.createRecord('address'));
    paymentMethod.set('billingAddressSameAsShippingAddress', true);

    var createSubscriptionAction = store.createRecord('createSubscriptionAction').setProperties({
      user: this.get('model'),
      shippingAddress: store.createRecord('address'),
      paymentMethod: paymentMethod,
      coupon: store.createRecord('coupon'),
      giftCard: store.createRecord('giftCard')
    });

    this.set('_createSubscriptionAction', createSubscriptionAction);
    return createSubscriptionAction;
  }.property()

});

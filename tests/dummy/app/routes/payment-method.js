import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.createRecord('payment-method', {
      billingAddress: this.store.createRecord('address')
    });
  }

});

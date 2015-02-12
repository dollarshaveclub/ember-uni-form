import Ember from 'ember';
import ValidatedFormComponent from './validated-form';

export default ValidatedFormComponent.extend({

  classNameBindings: [ 'cardType' ],

  address: Ember.computed.alias('formModel.billingAddress'),
  cardType: Ember.computed.alias('payment.creditCardType'),
  payment: Ember.computed.alias('formModel'),
  sameAsShipping: Ember.computed.alias('payment.billingAddressSameAsShippingAddress'),

  isValid: function () {
    if (this.get('sameAsShipping')) return this.get('payment.isValid');
    return this.get('payment.isValid') && this.get('address.isValid');
  }.property('payment.isValid', 'address.isValid', 'sameAsShipping'),

  rollbackAddress: function () {
    this.get('address').then(function (address) {
      address.rollback();
    });
  }.observes('sameAsShipping')

});

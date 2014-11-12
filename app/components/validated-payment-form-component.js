
require('../components/validated-form-component');

App.ValidatedPaymentFormComponent = App.ValidatedFormComponent.extend({

  classNameBindings: [ 'cardType' ],
  cardType: Ember.computed.alias('formModel.creditCardType'),

  isValid: function() {
    return this.get('formModel.isValid') && this.get('formModel.billingAddress.isValid');
  }.property('formModel.isValid', 'formModel.billingAddress.isValid')

});

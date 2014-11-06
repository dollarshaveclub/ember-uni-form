
// TODO: credit card specific properties seem out of place in the VFC
App.ValidatedPaymentFormComponent = App.ValidatedFormComponent.extend({
  classNameBindings: [ 'isValid:valid:invalid', 'cardType' ],
  cardType: Ember.computed.alias('formModel.creditCardType')
});

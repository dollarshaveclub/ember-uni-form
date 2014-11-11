
require('../components/validated-form-component');

App.ValidatedPaymentFormComponent = App.ValidatedFormComponent.extend({

  classNameBindings: [ 'isValid:valid:invalid', 'cardType' ],
  cardType: Ember.computed.alias('formModel.creditCardType')

});

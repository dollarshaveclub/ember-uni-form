
require('../components/validated-input-component');

App.ValidatedInputCvvComponent = App.ValidatedInputComponent.extend({

  attributeBindings: [ 'autocomplete', 'pattern' ],
  autocomplete: "off",
  pattern: "\\d*",

  formatCVV: function() {
    this.$().payment('formatCardCVC');
  }.on('didInsertElement')

});

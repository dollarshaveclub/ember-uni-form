
require('../components/validated-input-component');

App.ValidatedInputCcComponent = App.ValidatedInputComponent.extend({

  attributeBindings: [ 'autocomplete', 'pattern' ],
  autocomplete: "cc-number",
  pattern: "\\d*",

  formatCC: function() {
    this.$().payment('formatCardNumber');
  }.on('didInsertElement')

});

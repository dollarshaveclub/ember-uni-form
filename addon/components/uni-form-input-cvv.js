import ValidatedInputComponent from './validated-input';

export default ValidatedInputComponent.extend({

  attributeBindings: [ 'autocomplete', 'pattern' ],

  autocomplete: 'off',
  pattern: '\\d*',

  formatCVV: function () {
    this.$().payment('formatCardCVC');
  }.on('didInsertElement')

});

import ValidatedInputComponent from './validated-input';

export default ValidatedInputComponent.extend({

  attributeBindings: [ 'autocomplete', 'pattern' ],

  autocomplete: 'cc-number',
  pattern: '\\d*',

  formatCC: function () {
    this.$().payment('formatCardNumber');
  }.on('didInsertElement')

});

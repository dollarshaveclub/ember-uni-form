
require('../components/validated-input-component');

App.ValidatedInputCcComponent = App.ValidatedInputComponent.extend({

  change: function (e) {
    this.formatCcNumber(e);
  },

  keyUp: function (e) {
    this._super(e);
    this.formatCcNumber(e);
  },

  formatCcNumber: function(e) {
    var $target = $(e.target);
    if ( $target.attr('name') === 'number' ) {
      $target.payment('formatCardNumber');
    }
  }

});

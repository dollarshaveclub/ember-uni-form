
require('../components/validated-input-component');

App.ValidatedInputCvvComponent = App.ValidatedInputComponent.extend({

  change: function (e) {
    this.formatCvvNumber(e);
  },

  keyUp: function (e) {
    this._super(e);
    this.formatCvvNumber(e);
  },

  formatCvvNumber: function(e) {
    var $target = $(e.target);
    if ( $target.attr('name') === 'cvv' ) {
      $target.payment('formatCardCVC');
    }
  }

});

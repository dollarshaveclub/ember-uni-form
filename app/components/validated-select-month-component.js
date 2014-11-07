
App.ValidatedSelectMonthComponent = App.ValidatedSelectComponent.extend({

  content: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

  didInsertElement: function() {
    this._super();
    if ( this.get('parentModel.expMonth') ) return;

    var month = moment().month() + 1;
    var value = month > parseInt(this.get('value')) ? month : this.get('value');
    this.set( 'value', value.toString() );
  }

});

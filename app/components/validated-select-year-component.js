
require('../components/validated-select-component');

var YEAR_PREFIX = '20';

App.ValidatedSelectYearComponent = App.ValidatedSelectComponent.extend({

  content: function() {

    var years    = [],
        thisYear = new Date().getFullYear();

    if ( years.length > 12 ) return;

    for ( var i = 0; i < 12; i++ ) {
      years.push( YEAR_PREFIX + (thisYear + i).toString().substr(2,3) );
    }

    return years;

  }.property()

});

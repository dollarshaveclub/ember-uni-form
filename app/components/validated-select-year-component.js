
var YEAR_PREFIX = '20';

App.ValidatedSelectYearComponent = Ember.Select.extend({

  years: [],

  content: function() {
    var years    = this.get('years'),
        thisYear = new Date().getFullYear();
    for ( var i = 0; i < 12; i++ ) {
      years.push( YEAR_PREFIX + (thisYear + i).toString().substr(2,3) );
    }
    return years;
  }.property('years')

});

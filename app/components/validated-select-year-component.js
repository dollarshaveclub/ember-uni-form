
App.ValidatedSelectYearComponent = Ember.Select.extend({

  years: [],

  content: function() {
    var years    = this.get('years'),
        thisYear = new Date().getFullYear();
    for ( var i = 0; i < 12; i++ ) {
      years.push( (thisYear + i).toString() );
    }
    return years;
  }.property('years')

});

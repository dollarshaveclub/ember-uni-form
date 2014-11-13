
require('../components/validated-select-component');

App.ValidatedSelectYearComponent = App.ValidatedSelectComponent.extend({

  content: function() {
    var year = new Date().getFullYear();
    var i = -2;

    return Array.apply(null, new Array(13)).map(function() {
      if ( i === -2 ) {
        i ++;
        return ('');
      }
      i ++;
      return (year + i).toString();
    });
  }.property()

});


require('../components/validated-select-component');

var YEAR_TEXT = 'Year';

App.ValidatedSelectYearComponent = App.ValidatedSelectComponent.extend({

  value: YEAR_TEXT,

  content: function() {
    var year = new Date().getFullYear();
    var i = -1;

    return [YEAR_TEXT].concat(Array.apply(null, new Array(13)).map(function() {
      i ++;
      return (year + i).toString();
    }));
  }.property()

});

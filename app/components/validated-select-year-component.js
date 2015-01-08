
require('../components/validated-select-component');

App.ValidatedSelectYearComponent = App.ValidatedSelectComponent.extend({

  content: function () {
    var year = new Date().getFullYear();
    var i = -1;

    return [ 'Year' ].concat(Array.apply(null, new Array(13)).map(function () {
      i ++;
      return (year + i).toString();
    }));
  }.property()

});

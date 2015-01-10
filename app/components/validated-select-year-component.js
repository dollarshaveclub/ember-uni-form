
require('../components/validated-select-component');

App.ValidatedSelectYearComponent = App.ValidatedSelectComponent.extend(
{
  optionValuePath:'content.value',
  optionLabelPath:'content.label',

  content: function () {
    var year = new Date().getFullYear();
    var options = [{
      value: '',
      label: 'Year'
    }];
    for (var i = 0; i < 13; i++) {
      var s = (year + i).toString();
      options.push({ value: s, label: s });
    }
    return options;
  }.property()

});

import ValidatedSelectComponent from './validated-select';

var NUM_YEARS = 13;

export default ValidatedSelectComponent.extend({

  optionValuePath: 'content.value',
  optionLabelPath: 'content.label',
  prompt: 'Year',

  content: function () {
    var year = new Date().getFullYear();
    var options = [];
    for (var i = 0; i < NUM_YEARS; i++) {
      var s = (year + i).toString();
      options.push({ value: s, label: s });
    }
    return options;
  }.property()

});

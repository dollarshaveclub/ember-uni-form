import ValidatedSelectComponent from './validated-select';

export default ValidatedSelectComponent.extend({

  optionValuePath: 'content.value',
  optionLabelPath: 'content.label',
  prompt: "Month",

  content: function () {
    return [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ].map(function (s) {
      return { value: s, label: s };
    });
  }.property()

});

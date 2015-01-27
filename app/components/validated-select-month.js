import Ember from 'ember';
import ValidatedSelectComponent from './validated-select';

export default ValidatedSelectComponent.extend({

  optionValuePath:'content.value',
  optionLabelPath:'content.label',

  content: function () {
    var options = [{
      value: '',
      label: 'Month'
    }];
    [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ].forEach(function (s) {
      options.push({ value: s, label: s });
    });
    return options;
  }.property()

});

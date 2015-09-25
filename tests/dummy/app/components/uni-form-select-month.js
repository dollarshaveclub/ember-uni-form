import UniFormSelectComponent from './uni-form-select';

export default UniFormSelectComponent.extend({

  optionValuePath: 'content.value',
  optionLabelPath: 'content.label',
  prompt: 'Month',

  content: function () {
    return [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
    .map((s) => ({ value: s, label: s }));
  }.property()

});

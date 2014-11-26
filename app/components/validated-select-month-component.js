
require('../components/validated-select-component');

var MONTH_TEXT = 'Month';

App.ValidatedSelectMonthComponent = App.ValidatedSelectComponent.extend({
  value: MONTH_TEXT,
  content: [ MONTH_TEXT, '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
});

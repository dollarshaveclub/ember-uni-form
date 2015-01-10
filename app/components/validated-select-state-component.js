require('../components/validated-select-component');

App.ValidatedSelectStateComponent = App.ValidatedSelectComponent.extend(
{
  optionValuePath:'content.abbreviation',
  optionLabelPath:'content.name',

  content: function () {
    var options = this.get('currentUser.locale.regions') || [];
    options.unshift({
      abbreviation: '',
      name: 'State'
    });
    return options;
  }.property('currentUser.locale.region')

});

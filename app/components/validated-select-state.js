require('../components/validated-select-component');

App.ValidatedSelectStateComponent = App.ValidatedSelectComponent.extend(
{
  optionValuePath:'content.abbreviation',
  optionLabelPath:'content.name',

  content: function () {
    var options = this.get('currentUser.locale.regions') || [];
    if (options.get('firstObject.abbreviation')) {
      options.unshiftObject({
        abbreviation: '',
        name: 'State'
      });
    }
    return options;
    //Don't make this a computed property of user locale regions
  }.property()

});

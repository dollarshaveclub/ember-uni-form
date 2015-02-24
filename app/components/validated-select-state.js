import ValidatedSelectComponent from './validated-select';

export default ValidatedSelectComponent.extend({

  optionValuePath: 'content.abbreviation',
  optionLabelPath: 'content.name',
  prompt: 'State',

  content: function () {
    return this.get('currentUser.locale.regions') || [];
    // Don't make this a computed property of user locale regions
  }.property()

});

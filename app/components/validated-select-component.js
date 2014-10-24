
App.ValidatedSelectComponent = Ember.Select.extend({

  classNameBindings: ['error', 'open'],

  focusOut: function () {
    this.set('error', this.get('isInvalid'));
    this.set('open', false);
  },

  click: function() {
    this.toggleProperty('open');
  },

  // change: function() {
  //   this.set('open', true);
  //   console.log("opened");
  // },

  keyDown: function() {
    this.set('open', true);
  },

  errors: function () {
    var errorName = "parentModel.errors.%@".fmt( this.get('name') );
    return this.get(errorName);
  }.property('name', 'parentModel.isValid'),

  isValid: function () {
    if ( this.get('errors') ) {
      return this.get('errors').length === 0;
    } else {
      return true;
    }
  }.property('name', 'parentModel.isValid'),

  isInvalid: Ember.computed.not('isValid')

});

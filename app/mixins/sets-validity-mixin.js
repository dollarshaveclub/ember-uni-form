
App.SetsValidityMixin = Ember.Mixin.create({

  classNameBindings: ['error'],

  init: function () {
    // Ember.assert('RequiresFullLogin must be mixed in to a Route', this instanceof Ember.Route);
    this._super();
  },

  focusOut: function () {
    this.set('error', this.get('isInvalid'));
  },

  keyUp: function () {
    if ( this.get('isValid') ) {
      this.set('error', false);
    }
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

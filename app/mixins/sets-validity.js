import Ember from 'ember';

export default Ember.Mixin.create({

  classNameBindings: ['showError:error'],

  focusOut: function () {
    this.set('showError', this.get('isInvalid'));
  },

  keyUp: function () {
    if ( this.get('isValid') ) {
      this.set('showError', false);
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

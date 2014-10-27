
App.ValidatedSelectComponent = Ember.Select.extend({

  classNameBindings: ['error'],

  observeErrors: function () {
    if ( !this.get('parentModel') ) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  syncErrors: function () {
    this.set('errors', this.get('parentModel.errors.' + this.get('name')));
  },

  focusOut: function () {
    this.set('error', this.get('isInvalid'));
  },

  keyUp: function () {
    if ( this.get('isValid') ) {
      this.set('error', false);
    }
  },

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors')

});

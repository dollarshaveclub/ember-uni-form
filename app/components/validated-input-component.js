
App.ValidatedInputComponent = Ember.TextField.extend({

  classNameBindings: ['error', 'required'],

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),

  focusOut: function () {
    this.set('error', this.get('isInvalid'));
  },

  keyUp: function () {
    if ( this.get('isValid') ) {
      this.set('error', false);
    }
  },

  observeErrors: function () {
    if ( !this.get('parentModel') ) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  required: function() {
    if ( !this.get('parentModel') ) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

  syncErrors: function () {
    this.set('errors', this.get('parentModel.errors.' + this.get('name')));
  }

});

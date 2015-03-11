import Ember from 'ember';
//
// Mixed in to ValidatedInput and ValidatedSelect
//
export default Ember.Mixin.create({

  //
  // Properties
  //

  classNameBindings: [ 'empty', 'error', 'required' ],
  errors: [],
  showError: false,

  empty: Ember.computed.not('value'),

  error: function () {
    if (this.get('parentModel.showInputErrors') || this.get('showError')) return this.get('isInvalid');
    return false;
  }.property('showError', 'parentModel.showInputErrors', 'isInvalid'),

  isInvalid: Ember.computed.notEmpty('errors'),

  isValid: Ember.computed.empty('errors'),

  required: function () {
    if (!this.get('parentModel.validations')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

  //
  // Functions
  //

  // Propagate showError changes to parentModel
  errorVisibilityForModel: function () {
    var parentModel = this.get('parentModel');
    var eventName = this.get('showError') ? 'shouldShowValidationError' : 'shouldDismissValidationError';
    if (parentModel) parentModel.trigger(eventName, this.get('name'));
  }.observes('showError', 'name'),

  focusOut: function () {
    if (!this.get('empty')) this.set('showError', true);
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  observeErrors: function () {
    if (!this.get('parentModel')) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  removeErrorObserver: function () {
    if (!this.get('parentModel')) return;
    this.get('parentModel').removeObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('willDestroyElement'),

  syncErrors: function () {
    if (this.get('isDestroyed')) return;
    this.set('errors', this.get('parentModel.errors.' + this.get('name')));
  }

});

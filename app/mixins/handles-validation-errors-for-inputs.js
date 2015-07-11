import Ember from 'ember';

export default Ember.Mixin.create({

  errors: [],
  showError: false,

  syncErrors: function () {
    if (this.get('isDestroyed')) return;
    this.set('errors', this.get('parentModel.errors.' + this.get('name')));
  },

  observeErrors: function () {
    if (!this.get('parentModel')) return;

    Ember.assert("No name given for input", this.get('name'));

    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  // Propagate showError changes to parentModel
  errorVisibilityForModel: function () {
    var parentModel = this.get('parentModel');
    if (!parentModel || !parentModel.trigger) return;

    if (this.get('showError')) {
      parentModel.trigger('shouldShowValidationError', this.get('name'));
    } else {
      parentModel.trigger('shouldDismissValidationError', this.get('name'));
    }
  }.observes('showError', 'name')

});

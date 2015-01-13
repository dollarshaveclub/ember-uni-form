App.HandlesValidationErrorsForInputs = Ember.Mixin.create({

  classNameBindings: [ 'showError:error' ],
  errors: [],
  showError: false,

  syncErrors: function () {
    if (!this.get('isDestroyed')) {
      this.set('errors', this.get('parentModel.errors.' + this.get('name')));
    }
  },

  observeErrors: function () {
    if (!this.get('parentModel')) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  errorVisibilityForModel: function () {
    if (this.get('showError'))  this.get('parentModel').trigger('shouldShowValidationError', this.get('name'));
    if (!this.get('showError')) this.get('parentModel').trigger('shouldDismissValidationError', this.get('name'));
  }.observes('showError', 'name')

});

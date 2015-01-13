
App.ValidatedInputComponent = Ember.TextField.extend({

  classNameBindings: [ 'showError:error', 'required' ],
  attributeBindings: [ 'type' ],

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  type: 'text',
  willShowError: 'willShowError',
  willRemoveError: 'willRemoveError',

  focusOut: function () {
    this.set('showError', this.get('isInvalid'));
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  observeErrors: function () {
    if (!this.get('parentModel')) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  required: function () {
    if (!this.get('parentModel')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

  syncErrors: function () {
    if (this.get('isDestroyed')) return;
    this.set('errors', this.get('parentModel.errors.' + this.get('name')));
  },

  bubbleError: function () {
    if (this.get('showError'))  this.sendAction('willShowError', this.get('name'), this.get('errorMessages'));
    if (!this.get('showError')) this.sendAction('willRemoveError', this.get('name'));
  }.observes('showError', 'name'),

  errorMessages: function () {
    var parentModel = this.get('parentModel');
    var name = this.get('name');

    var errors = parentModel.get('errors');
    var validations = parentModel.get('validations');
    if (!errors || !validations) return;

    var inputErrors = errors.get(name) || [];
    return inputErrors.map(function(error){
      return name.titleize() + ' ' + error;
    });
  }.property('name')

});

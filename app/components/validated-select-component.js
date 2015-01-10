
App.ValidatedSelectComponent = Ember.Select.extend({

  classNameBindings: [ 'showError:error', 'required', 'isPlaceholder:placeholder' ],
  attributeBindings: [ 'autocomplete' ],

  autocomplete: true,
  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  isPlaceholder: Ember.computed.not('value'),

  focusOut: function () {
    this.set('showError', this.get('isInvalid'));
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  keyDown: function (e) {
    if (e.which === 13) {
      this.get('controller').send('save');
    }
  },

  observeErrors: function () {
    if (!this.get('parentModel')) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  required: function () {
    if (!this.get('parentModel.validations')) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

  syncErrors: function () {
    if (!this.get('isDestroyed')) {
      this.set('errors', this.get('parentModel.errors.' + this.get('name')));
    }
  }

});

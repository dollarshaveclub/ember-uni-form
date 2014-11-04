
App.ValidatedFormComponent = Ember.Component.extend({

  tagName: 'form',
  classNameBindings: [ 'isValid:valid:invalid' ],
  isValid: Ember.computed.alias('formModel.isValid'),
  showButtons: true,
  save: 'save',
  cancel: 'cancel',

  actions: {

    cancel: function() {
      this.sendAction('cancel');
    },

    submit: function() {
      if (!this.get('isValid')) return false;

      var self = this;
      this.sendAction('save', function(result) {
        // console.log('[ValidatedFormComponent] Result', result);
        if (result && result.errors) self.set('errors', result.errors);
      });
    }

  },

  errors: [],

  errorMessages: function() {
    return this.get('errors').map(function (error){
      error = error.titleize().toLowerCase().capitalize();
      // console.log('[ValidatedFormComponent] Error', error);
      return error;
    });
  }.property('errors')

});

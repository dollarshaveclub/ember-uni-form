
App.ValidatedFormComponent = Ember.Component.extend({

  tagName: 'form',
  classNameBindings: [ 'isValid:valid:invalid' ],

  cancel: 'cancel',
  isValid: Ember.computed.alias('formModel.isValid'),
  save: 'save',
  showButtons: true,

  actions: {

    cancel: function() {
      this.sendAction('cancel');
    },

    submit: function() {
      if (!this.get('isValid')) return false;

      var self = this;
      var deferred = Ember.RSVP.defer();

      this.set('errors', false);
      this.sendAction('save', deferred);

      deferred.promise.catch(function(errors){
        self.set('errors', errors || [ 'Oops! There was a problem.' ]);
      });

    }
  }

});

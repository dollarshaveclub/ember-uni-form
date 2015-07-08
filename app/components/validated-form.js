import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',
  classNameBindings: [ 'isValid:valid:invalid' ],

  cancel: 'cancel',
  isValid: Ember.computed.alias('formModel.isValid'),
  notify: 'notify',
  save: 'save',
  showButtons: true,
  transitionTo: 'transitionTo',

  actions: {

    cancel: function () {
      this.sendAction('cancel');
    },

    submit: function () {

      this.set('formModel.showInputErrors', true);

      if (!this.get('isValid')) {
        // console.log('[ValidatedFormComponent] Not submitting invalid formModel.');
        return false;
      }

      var self = this;
      var deferred = Ember.RSVP.defer();

      this.set('errors', false);
      this.sendAction('save', deferred);

      deferred.promise.catch(function (result) {
        // console.log('[ValidatedFormComponent]', result);
        if (result.unauthorized) self.sendAction('transitionTo', 'login.screen');
        self.set('errors', result.errors || [ 'Oops! There was a problem.' ]);
      });

    },

    notify: function (opts) {
      this.sendAction('notify', opts);
    }

  }

});

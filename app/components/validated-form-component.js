
App.ValidatedFormComponent = Ember.Component.extend({
  tagName: 'form',
  classNameBindings: [ 'isValid:valid:invalid' ],

  cancel: 'cancel',
  isValid: Ember.computed.alias('formModel.isValid'),
  save: 'save',
  showButtons: true,
  inlineMessageMap: {},

  actions: {

    cancel: function () {
      this.sendAction('cancel');
    },

    submit: function () {

      if (!this.get('isValid')) {
        console.log('[ValidatedFormComponent] Not submitting invalid formModel.');
        return false;
      }

      var self = this;
      var deferred = Ember.RSVP.defer();

      this.set('errors', false);
      this.sendAction('save', deferred);

      deferred.promise.catch(function (result) {
        // console.log('[ValidatedFormComponent]', result);
        if (result.unauthorized) self.sendAction('openModal', 'login');
        self.set('errors', result.errors || [ 'Oops! There was a problem.' ]);
      });

    },

    willShowError: function (name, messages) {
      var map = this.get('inlineMessageMap');
      map[name] = messages;
      this.set('inlineMessageMap', map);
      this.set('inlineMessageMapUpdatedAt', new Date().getTime());
    },

    willRemoveError: function (name) {
      var map = this.get('inlineMessageMap');
      map[name] = [];
      this.set('inlineMessageMap', map);
      this.set('inlineMessageMapUpdatedAt', new Date().getTime());
    }

  },

  inlineMessages: function () {
    var messages = [];
    var map = this.get('inlineMessageMap');

    for (var array in map) {
      messages = messages.concat(map[array]);
    }

    return messages;
  }.property('inlineMessageMapUpdatedAt')

});

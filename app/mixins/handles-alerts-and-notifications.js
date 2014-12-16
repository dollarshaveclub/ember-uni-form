
App.HandlesAlertsAndNotifications = Ember.Mixin.create({

  initAssertion: function () {
    Ember.assert(
      'HandlesAlertsAndNotifications must be mixed in to the ApplicationRoute',
      Object.getPrototypeOf(this)._debugContainerKey === "route:application"
    );
  }.on('init'),

  actions: {

    alert: function (opts) {

      if (typeof opts === "string") {
        opts = { title: opts };
      }

      this.send('removeNotification');
      this.send('openModal', 'alert', Ember.Object.create(opts));
    },

    notify: function (opts) {
      this.send('removeNotification');

      var message  = (typeof opts === 'string') ? opts : (opts.message || 'No message given.');

      this.controllerFor('notification').setProperties({
        message: message,
        type: opts.type,
        dismissable: opts.dismissable
      });

      var view = this.render('notification', {
        into: 'application',
        outlet: 'notification',
        controller: 'notification'
      });
    },

    removeNotification: function () {
      this.controllerFor('notification').set('isShown', false);

      return this.disconnectOutlet({
        outlet: 'notification',
        parentView: 'application'
      });
    }

  }

});

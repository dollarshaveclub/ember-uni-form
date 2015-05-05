import Ember from 'ember';

// Mixed in to ApplicationRoute
//
export default Ember.Mixin.create({

  actions: {

    alert: function (opts) {
      this.send('removeNotification');
      if (typeof opts === 'string') {
        this.send('openModal', 'alert', Ember.Object.create({ title: opts }));
      } else {
        this.send('openModal', 'alert', Ember.Object.create({ title: opts.get('title'), subtitle: opts.get('subtitle'), body: opts.get('body') }));
      }
    },

    notify: function (opts) {
      this.send('removeNotification');

      if (opts.type === 'remove') return;

      var message = (typeof opts === 'string') ? opts : (opts.message || 'No message given.');

      this.controllerFor('notification').setProperties({
        message: message,
        type: opts.type,
        dismissable: opts.dismissable,
        showIndefinitely: opts.showIndefinitely || false
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

import Ember from 'ember';

// Mixed in to ApplicationRoute
//
export default Ember.Mixin.create({

  actions: {

    alert: function (opts) {
      this.get('loadingService').stop();
      if (typeof opts === 'string') {
        this.send('openModal', 'alert', Ember.Object.create({ title: opts }));
      } else {
        this.send('openModal', 'alert', Ember.Object.create({ title: opts.get('title'), subtitle: opts.get('subtitle'), body: opts.get('body') }));
      }
    },

    //
    // TODO: Remove code that calls this function.
    // Replace with direct functions calls to these services.
    //
    notify: function (opts) {
      if (opts.type === 'loading') {
        this.get('loadingService').start();
      }
      else if (opts.type === 'remove') {
        this.get('loadingService').stop();
      }
      else {
        this.get('loadingService').stop();
        this.get('flashMessages').add(opts);
      }
    }

  }

});

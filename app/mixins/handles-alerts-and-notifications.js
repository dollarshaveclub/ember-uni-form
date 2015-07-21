import Ember from 'ember';

// Mixed in to ApplicationRoute
//
export default Ember.Mixin.create({

  actions: {

    alert: function (opts) {
      this.get('loadingService').stop();
      this.transitionTo('alert', { queryParams: opts });
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

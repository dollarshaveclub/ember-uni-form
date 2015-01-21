
// Used to fix issues with autocomplete on various browsers.
//

var TRIGGER_INTERVAL = 2500;

App.TriggersChange = Ember.Mixin.create({

 triggerChange: function () {

    // Recursion.
    Ember.run.later(this, function () {
      if (this.get('isDestroyed')) return;
      this.$().trigger("change");
      this.triggerChange();
    }, TRIGGER_INTERVAL);

  }.on("didInsertElement")

});

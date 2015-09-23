import Ember from 'ember';

// Used to fix issues with autocomplete on various browsers.
//

var TRIGGER_INTERVAL = 2500;

export default Ember.Mixin.create({

 triggerChange: function () {

    // Recursion.
    Ember.run.later(this, function () {
      var $el = this.$();
      if (this.get('isDestroyed') || $el.length === 0) return;
      if ($el.trigger) $el.trigger('change');
      this.triggerChange();
    }, TRIGGER_INTERVAL);

  }.on('didInsertElement')

});

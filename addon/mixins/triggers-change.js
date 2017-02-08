import Ember from 'ember';

// Used to fix issues with autocomplete on various browsers.
//


export default Ember.Mixin.create({

  changeTriggerInterval: 2500,

  triggerChange: Ember.on('didInsertElement', function () {
    // Recursion.
    Ember.run.later(this, function () {
      const $el = this.$();
      if (this.get('isDestroyed') || $el.length === 0) return;
      if ($el.trigger) $el.trigger('change');
      this.triggerChange();
    }, this.get('changeTriggerInterval'));
  }),

});

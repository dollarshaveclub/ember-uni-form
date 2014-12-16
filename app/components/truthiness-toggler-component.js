App.TruthinessTogglerComponent = Ember.Component.extend({

  click: function () {
    this.toggleProperty('toggleProp');
  }

});

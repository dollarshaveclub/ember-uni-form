
var DEFAULT_MIN = 1;
var DEFAULT_MAX = 3;

App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [ ':quantity-widget', 'isMin', 'isMax' ],
  attributeBindings: [ 'name:data-icon' ],

  actions: {
    increment: function () {
      if (this.get('isMax')) {
        this.set('showMaxTip', new Date());
      } else {
        this.set('quantity', this.incrementProperty('quantity'));
      }
    },

    decrement: function () {
      if (this.get('isMin')) return;
      this.set('quantity', this.decrementProperty('quantity') );
    }
  },

  quantity: DEFAULT_MIN,  // pass in your own to override.
  max: DEFAULT_MAX,
  min: DEFAULT_MIN,

  isMin: function () {
    return this.get('quantity') === this.get('min');
  }.property('quantity'),

  isMax: function () {
    return this.get('quantity') >= this.get('max');
  }.property('quantity'),

  maxTip: function () {
    return '%@ is the maximum quantity.'.fmt(this.get('max'));
  }.property('max')
});

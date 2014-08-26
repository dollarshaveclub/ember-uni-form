
var DEFAULT_MIN = 1;
var DEFAULT_MAX = 3;

App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [ ':quantity-widget', 'isMin', 'isMax', 'isDirty' ],
  attributeBindings: [ 'name:data-icon' ],

  trackedActions: {
    decrement: true,
    increment: true
  },

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

  initial: Ember.computed.oneWay('quantity'),  // pass in your own to override.
  quantity: DEFAULT_MIN,  // pass in your own to override.
  max: DEFAULT_MAX,
  min: DEFAULT_MIN,

  isDirty: function () {
    return this.get('initial') !== this.get('quantity');
  }.property('quantity'),

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

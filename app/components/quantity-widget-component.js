
var DEFAULT_MIN = 1;
var DEFAULT_MAX = 3;
var SHOW_MESSAGE_DURATION = 1500;

App.QuantityWidgetComponent = Ember.Component.extend({

  classNames: [ 'quantity-widget' ],
  classNameBindings: [ 'isDirty', 'isMin', 'isMax', 'isRemoved' ],
  attributeBindings: [ 'name:data-icon' ],

  initial: Ember.computed.oneWay('quantity'),
  max: DEFAULT_MAX,
  min: DEFAULT_MIN,
  quantity: DEFAULT_MIN,
  quantityString: 'Qty. %@',
  showRemoveControl: false,

  // Actions
  quantityDidChange: 'quantityDidChange',

  trackedActions: {
    minusIcon: true,
    plusIcon: true,
    removeIcon: true
  },

  actions: {

    plusIcon: function () {
      this.increment();
    },

    minusIcon: function () {
      this.decrement();
    },

    removeIcon: function () {
      this.set('quantity', 0);
    }

  },

  increment: function () {
    this.clearMessage();
    if (this.get('isMax')) return this.setMessage('%@ max'.fmt(this.get('quantity')));
    this.incrementProperty('quantity');
  },

  decrement: function () {
    this.clearMessage();
    if (this.get('isMin') && !this.get('showRemoveControl')) return;
    this.decrementProperty('quantity');
  },

  clearMessage: function () {
    Ember.run.cancel(this.clearMessageTimer);
    this.set('showMessage', false);
  },

  isDirty: function () {
    return this.get('initial') !== this.get('quantity');
  }.property('quantity'),

  isMin: function () {
    return this.get('quantity') <= this.get('min');
  }.property('quantity'),

  isMax: function () {
    return this.get('quantity') >= this.get('max');
  }.property('quantity'),

  isRemoved: function () {
    return this.get('quantity') === 0;
  }.property('quantity'),

  setMessage: function (msg) {
    this.set('message', msg);
    this.set('showMessage', true);
    this.clearMessageTimer = Ember.run.later(this, function () {
      this.set('showMessage', false);
    }, SHOW_MESSAGE_DURATION);
  },

  showRemove: function () {
    return (this.get('showRemoveControl') && this.get('isMin'));
  }.property('isMin', 'quantity'),

  quantityText: function () {
    return this.get('quantityString').fmt(this.get('quantity'));
  }.property('quantityString', 'quantity')


});

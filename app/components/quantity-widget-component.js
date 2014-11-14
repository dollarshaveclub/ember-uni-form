
var DEFAULT_MIN = 1;
var DEFAULT_MAX = 3;

App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [ ':quantity-widget', 'isMin', 'isMax', 'isDirty' ],
  attributeBindings: [ 'name:data-icon' ],

  trackedActions: {
    increment: true,
    decrement: true
  },

  actions: {
    plusIcon: function () {
      this.send('increment', this.get('trackedModel'));
    },

    minusIcon: function () {
      this.send('decrement', this.get('trackedModel'));
    },

    increment: function () {
      this.handleMax();
      if (this.get('isMax')) return;
      this.set('quantity', this.incrementProperty('quantity'));
    },

    decrement: function () {
      if (this.get('isMin')) return;
      this.set('quantity', this.decrementProperty('quantity') );
      this.handleMax();
    }
  },

  initial: Ember.computed.oneWay('quantity'),
  quantity: DEFAULT_MIN,
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

  handleMax: function () {
    Ember.run.cancel(this.timer);

    if ( this.get('isMax') ) {
      this.set('showMax', true);
      this.timer = Ember.run.later(this, function (){
        this.set('showMax', false);
      }, 1500);
    } else {
      this.set('showMax', false);
    }

  }

});

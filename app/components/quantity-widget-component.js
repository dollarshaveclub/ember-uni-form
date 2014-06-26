
var MAX_QTY = 3; // to be replaced with dynamic value variable

App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [':qty-widget', 'isMinQty', 'isMaxQty'],
  attributeBindings:['name:data-icon'],

  actions: {
    increment: function () {
      if ( this.getQty() < MAX_QTY )
        this.set('quantity', this.getQty() + 1);
    },

    decrement: function () {
      if ( this.getQty() > 1 )
        this.set('quantity', this.getQty() - 1);
    }
  },

  getQty: function() {
    return this.get('quantity');
  },

  isMinQty: function() {
    return this.getQty() === 1;
  }.property('quantity'),

  isMaxQty: function() {
    return this.getQty() >= MAX_QTY;
  }.property('quantity')

});

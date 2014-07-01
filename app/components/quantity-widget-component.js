
var MAX_QTY = 3; // to be replaced with dynamic value variable

App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [':quantity-widget', 'isMin', 'isMax'],
  attributeBindings:['name:data-icon'],

  actions: {
    increment: function () {
      if ( this.getQuantity() < MAX_QTY )
        this.set('quantity', this.getQuantity() + 1);
    },

    decrement: function () {
      if ( this.getQuantity() > 1 )
        this.set('quantity', this.getQuantity() - 1);
    }
  },

  getQuantity: function() {
    return this.get('quantity');
  },

  isMin: function() {
    return this.getQuantity() === 1;
  }.property('quantity'),

  isMax: function() {
    return this.getQuantity() >= MAX_QTY;
  }.property('quantity')

});

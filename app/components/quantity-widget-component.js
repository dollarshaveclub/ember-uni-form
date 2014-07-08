App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [ ':quantity-widget', 'isMin', 'isMax' ],
  attributeBindings: [ 'name:data-icon' ],

  actions: {
    increment: function () {
      this.set('quantity', Math.max(this.get('quantity') + 1, this.get('max')));
    },

    decrement: function () {
      this.set('quantity', Math.min(this.get('quantity') - 1, 1));
    }
  },

  max: 3, // to be replaced with dynamic value

  isMin: function () {
    return this.get('quantity') === 1;
  }.property('quantity'),

  isMax: function () {
    return this.get('quantity') >= this.get('max');
  }.property('quantity')

});

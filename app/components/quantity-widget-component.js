App.QuantityWidgetComponent = Ember.Component.extend({

  tagName: 'div',
  classNameBindings: [':quantity-widget'],
  attributeBindings:['name:data-icon'],

  actions: {
    increment: function () {
      this.set('quantity', this.get('quantity') + 1);
      console.log(this.get('quantity'));
    },

    decrement: function () {
      this.set('quantity', this.get('quantity') - 1);
      console.log(this.get('quantity'));
    }
  },

  isZero: function() {
    return this.get('quantity') === 0;
  }.property('quantity'),

  isGtOne: function() {
    return this.get('quantity') > 1;
  }.property('quantity')

});

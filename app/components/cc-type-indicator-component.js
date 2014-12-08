App.CcTypeIndicatorComponent = Ember.Component.extend({

  classNameBindings: [ ':cc-type-indicator'],
  attributeBindings: [ 'cardType:data-type' ],

  applyTransform: function () {

    // Reset all.
    this.$('[data-icon]').css({ transform: 'none' });

    // Then position selected.
    var type = this.get('cardType');
    if(!type) return;

    var selectedCard = this.$('[data-icon="cc-%@"]'.fmt(type));

    var width = this.width || this.$().width();
    var translation =  width - selectedCard.width();
    translation =  translation - selectedCard.position().left;
    translation = 'translateX(%@px)'.fmt(translation);

    selectedCard.css({ transform: translation });

  }.observes('cardType')

});

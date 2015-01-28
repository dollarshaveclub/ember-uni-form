import Ember from 'ember';

export default Ember.Component.extend({

  classNames: [ 'cc-type-indicator'],
  attributeBindings: [ 'cardType:data-card-type' ]

});

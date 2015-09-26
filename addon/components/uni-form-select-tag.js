import Ember from 'ember';
import layout from '../templates/uni-form-select-tag';
//
// This is not the component you are looking for.
// It‘s just a helper. You want {{ uni-form-select }}.
//
export default Ember.Component.extend({

  tagName: 'select',
  classNames: [ 'uni-form-select-tag' ],
  attributeBindings: [ 'autofocus', 'disabled', 'name' ],
  layout: layout,

  change: function () {
    this.set('value', this.$('option:selected').val());
  },

  initSelected: function () {
    (this.$(`option[value="${this.get('value')}"]`) || this.$('option:first'))
    .prop('selected', true);
  }.on('didInsertElement'),

  valueChanged: function () {
    this.$().val(this.get('value'));
  }.observes('value'),

});

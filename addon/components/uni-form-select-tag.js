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
    var option = this.$('option:selected');
    if (option) this.set('value', option.val());
  },

  initSelected: function () {
    var option = (this.$(`option[value="${this.get('value')}"]`) || this.$('option:first'));
    if (option) option.prop('selected', true);
  }.on('didInsertElement'),

  valueChanged: function () {
    var select = this.$();
    if (select) select.val(this.get('value'));
  }.observes('value'),

});

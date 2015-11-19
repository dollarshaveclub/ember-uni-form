import Ember from 'ember';
import layout from '../templates/uni-form-select-tag';
//
// This is not the component you are looking for.
// It's just a helper. You want {{ uni-form-select }}.
//
export default Ember.Component.extend({

  tagName: 'select',
  classNames: [ 'uni-form-select-tag' ],
  attributeBindings: [ 'autofocus', 'disabled', 'name' ],
  layout: layout,

  change: function () {
    if (this.$()) this.set('value', this.$().val());
  },

  _content: function () {
    return Ember.makeArray(this.get('content')).map(o => {
      return { label: o.label, selected: o.value === this.get('value'), value: o.value };
    });
  }.property('content', 'value'),

  valueChange: function () {
    if (this.$()) this.$().val(this.get('value'));
  }.observes('value'),

});

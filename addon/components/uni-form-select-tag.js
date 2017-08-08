import Ember from 'ember';
import layout from '../templates/uni-form-select-tag';
//
// This is not the component you are looking for.
// It's just a helper. You want {{ uni-form-select }}.
//
export default Ember.Component.extend({

  tagName: 'select',
  classNames: ['uni-form-select-tag'],
  attributeBindings: ['autofocus', 'disabled', 'name'],
  layout,

  change() {
    if (this.$()) this.set('value', this.$().val());
  },

  _content: Ember.computed('content', 'value', function () {
    return Ember.makeArray(this.get('content')).map(o => ({ label: o.label, selected: o.value === this.get('value'), value: o.value }));
  }),

  valueChange: Ember.observer('value', function () {
    Ember.run.next(() => { if (this.$()) this.$().val(this.get('value')); });
  }),

  contentChange: Ember.observer('content', function () {
    Ember.run.next(() => { this.change(); });
  }),

});

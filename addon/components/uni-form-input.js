import Ember from 'ember';
import layout from '../templates/uni-form-input';
import FindsParentForm from '../mixins/finds-parent-form';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Component.extend(
  FindsParentForm,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-input' ],
  classNameBindings: [ 'disabled', 'required', 'tone' ],
  layout: layout,

  name: Ember.computed.reads('property'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (!(this.attrs && this.attrs.value)) {
      this.value = Ember.computed.alias(`form.model.${this.get('property')}`);
    }
  },

  placeholder: function () {
    return (this.get('property') || '').dasherize().replace(/-/g, ' ').capitalize();
  }.property('property'),

});

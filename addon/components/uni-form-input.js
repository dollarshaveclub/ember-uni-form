import Ember from 'ember';
import layout from '../templates/uni-form-input';
import FindsFieldByName from '../mixins/finds-field-by-name';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Component.extend(
  FindsFieldByName,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-input' ],
  classNameBindings: [ 'disabled', 'required', 'tone' ],
  layout: layout,

  name: Ember.computed.reads('property'),
  required: Ember.computed.bool('validations.presence'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (this.attrs && this.attrs.property) {
      this.validations = Ember.computed.reads(`parentFormView.model.validations.${this.get('property')}`);
      if (!this.attrs.value) {
        this.value = Ember.computed.alias(`parentFormView.model.${this.get('property')}`);
      }
    }
  },

  placeholder: function () {
    return (this.get('property') || '').dasherize().replace(/-/g, ' ').capitalize();
  }.property('property'),

});

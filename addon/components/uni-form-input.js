import Ember from 'ember';
import dynamicAlias from '../utils/dynamic-alias';
import layout from '../templates/components/uni-form-input';
import FindsParentForm from '../mixins/finds-parent-form';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Component.extend(
  FindsParentForm,
  TriggersChange,
{

  classNames: [ 'uni-form-input' ],
  classNameBindings: [ 'required', 'tone' ],
  layout: layout,
  type: 'text',

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  name: Ember.computed.reads('property'),
  required: Ember.computed.bool('validations.presence'),
  validations: dynamicAlias('form.model.validations', 'property'),

  didReceiveAttrs: function (attrs) {
    this._super(...arguments);
    if (!this.attrs.errors) this.errors = Ember.computed.alias(`form.model.errors.${this.get('property')}`);
    if (!this.attrs.value) this.value = Ember.computed.alias(`form.model.${this.get('property')}`);
  },

  error: function () {
    if (this.get('form.showInputErrors') || this.get('showError')) return this.get('isInvalid');
    return false;
  }.property('showError', 'form.showInputErrors', 'isInvalid'),

  focusOut: function () {
    this.set('showError', true);
  },

  keyDown: function () {
    this.set('showError', false);
  },

  placeholder: function () {
    return (this.get('property') || '').dasherize().replace(/-/g, ' ').capitalize();
  }.property('property'),

});

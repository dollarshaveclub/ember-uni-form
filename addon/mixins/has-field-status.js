import Ember from 'ember';
import FindsFieldByName from './finds-field-by-name';

var PROMPT_VALUE = '';

export default Ember.Mixin.create(
  FindsFieldByName,
{

  classNameBindings: [ 'disabled', 'focus', 'optional', 'prompting', 'required', 'status' ],

  editing: null, // first null, then boolean
  tone: Ember.computed.reads('field.tone'),

  focusIn: function () {
    this._super(...arguments);
    this.set('focus', true);
  },

  focusOut: function () {
    this._super(...arguments);
    this.set('focus', false);
    if (this.get('editing')) this.set('editing', false);
  },

  initNodeValue: Ember.on('didInsertElement', function () {
    Ember.run.next(() => {
      var nodes = this.$('input, select, textarea');
      if (!nodes) return;
      nodes.not('[type="radio"]')
      .val(this.get('value')).trigger('change');
    });
  }),

  initNodeValueObserver: Ember.observer('field.dynamicAliasReady', function () {
    this.initNodeValue();
  }),

  label: Ember.computed('payloadKey', function () {
    return (this.get('payloadKey') || '').split('.').slice(-1)[0].dasherize().replace(/-/g, ' ').capitalize();
  }),

  maxlength: Ember.computed('field.maxlength', 'field.dynamicAliasReady', function () {
    return this.get('field.maxlength');
  }),

  message: Ember.computed('showStatus', 'field.message', function () {
    return this.get('showStatus') && this.get('field.message');
  }),

  name: Ember.computed.reads('payloadKey'),

  optional: Ember.computed('field.optional', 'field.dynamicAliasReady', function () {
    return this.get('field.optional');
  }),

  prompt: Ember.computed.reads('label'),

  prompting: Ember.computed('value', 'field.dynamicAliasReady', function () {
    var value = this.get('value');
    return typeof value !== 'string' || value === PROMPT_VALUE;
  }),

  required: Ember.computed('field.required', 'field.dynamicAliasReady', function () {
    return this.get('field.required');
  }),

  showStatus: Ember.computed('editing', 'parentFormView.submitFailed', function () {
    return this.get('parentFormView.submitFailed') || this.get('editing') === false;
  }),

  status: Ember.computed('showStatus', 'tone', function () {
    return this.get('showStatus') && this.get('tone') || 'default';
  }),

  value: Ember.computed.alias('field.value'),

  valueChange: Ember.observer('value', 'groupValue', function () {
    if (this._hasValueChanged() && this.$(':focus')) this.set('editing', true);
  }),

  //
  // Helpers
  //

  _hasValueChanged: function () {
    var value = this.get('groupValue');
    if (typeof value === 'undefined') value = this.get('value');
    if (typeof value === 'undefined') value = '';
    if (typeof this._value === 'undefined') this._value = value;
    var hasValueChanged = (value !== this._value);
    this._value = value;
    return hasValueChanged;
  },

});

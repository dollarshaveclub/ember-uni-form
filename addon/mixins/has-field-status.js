import Ember from 'ember';
import FindsFieldByName from './finds-field-by-name';

var PROMPT_VALUE  = '';

export default Ember.Mixin.create(
  FindsFieldByName,
{

  classNameBindings: [ 'disabled', 'focus', 'optional', 'prompting', 'required', 'status' ],

  editing: null, // first null, then boolean
  maxlength: Ember.computed.reads('field.maxlength'),
  optional: Ember.computed.reads('field.optional'),
  required: Ember.computed.reads('field.required'),
  tone: Ember.computed.reads('field.tone'),

  focusIn: function () {
    this.set('focus', true);
  },

  focusOut: function () {
    this.set('focus', false);
    if (this.get('editing')) this.set('editing', false);
  },

  initNodeValue: function () {
    this.$('input, select, textarea')
    .not('[type="radio"]')
    .val(this.get('value')).trigger('change');
  }.on('didInsertElement').observes('field.dynamicAliasReady'),

  message: function () {
    return this.get('showStatus') && this.get('field.message');
  }.property('showStatus', 'field.message'),

  prompting: function () {
    var value = this.get('value');
    return typeof value !== 'string' || value === PROMPT_VALUE;
  }.property('value', 'field.dynamicAliasReady'),

  showStatus: function () {
    return this.get('parentFormView.submitAborted') || this.get('editing') === false;
  }.property('editing', 'parentFormView.submitAborted'),

  status: function () {
    return this.get('showStatus') && this.get('tone') || 'default';
  }.property('showStatus', 'tone'),

  valueChange: function () {
    if (this._hasValueChanged() && this.$(':focus')) this.set('editing', true);
  }.observes('value', 'groupValue'),

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

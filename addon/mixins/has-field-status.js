import Ember from 'ember';
import FindsFieldByName from './finds-field-by-name';

export default Ember.Mixin.create(
  FindsFieldByName,
{

  classNameBindings: [ 'focus', 'required', 'status' ],

  editing: null, // first null, then boolean
  maxlength: Ember.computed.reads('field.maxlength'),
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
  }.on('didInsertElement'),

  message: function () {
    return this.get('showStatus') && this.get('field.message');
  }.property('showStatus', 'field.message'),

  showStatus: function () {
    return this.get('parentFormView.submitAborted') || this.get('editing') === false;
  }.property('editing', 'parentFormView.submitAborted'),

  status: function () {
    return this.get('showStatus') && this.get('tone');
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

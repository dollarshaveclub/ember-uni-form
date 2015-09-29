import Ember from 'ember';
import layout from '../templates/uni-form-radio';
import FindsFieldByName from '../mixins/finds-field-by-name';

// {{ uni-form-radio value='spam' property='dish' label='Spam' }}
// {{#uni-form-radio value='eggs' groupValue=form.model.dish }} Eggs {{/uni-form-radio}}

export default Ember.Component.extend(
  FindsFieldByName,
{

  tagName: 'label',
  classNames: [ 'uni-form-radio' ],
  classNameBindings: [ 'checked', 'disabled', 'required', 'tone' ],
  layout: layout,

  name: Ember.computed.reads('property'),
  required: Ember.computed.bool('validations.presence'),

  change: function () {
    this.set('groupValue', this.get('value'));
  },

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (this.attrs && this.attrs.property) {
      this.validations = Ember.computed.reads(`parentFormView.model.validations.${this.get('property')}`);
      if (!this.attrs.groupValue) {
        this.groupValue = Ember.computed.alias(`parentFormView.model.${this.get('property')}`);
      }
    }
  },

});

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

  groupValue: Ember.computed.alias('field.value'),
  name: Ember.computed.reads('property'),
  required: Ember.computed.reads('field.required'),

  change: function () {
    this.set('groupValue', this.get('value'));
  },

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

});

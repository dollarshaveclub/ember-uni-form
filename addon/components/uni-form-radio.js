import Ember from 'ember';
import layout from '../templates/uni-form-radio';
import FindsParentForm from '../mixins/finds-parent-form';

// {{ uni-form-radio value='spam' property='dish' label='Spam' }}
// {{#uni-form-radio value='eggs' groupValue=form.model.dish }} Eggs {{/uni-form-radio}}

export default Ember.Component.extend(
  FindsParentForm,
{

  tagName: 'label',
  classNames: [ 'uni-form-radio' ],
  classNameBindings: [ 'checked', 'disabled', 'required', 'tone' ],
  layout: layout,

  name: Ember.computed.reads('property'),

  change: function () {
    this.set('groupValue', this.get('value'));
  },

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (this.attrs && this.attrs.property && !this.attrs.groupValue) {
      this.groupValue = Ember.computed.alias(`form.model.${this.get('property')}`);
    }
  },

});

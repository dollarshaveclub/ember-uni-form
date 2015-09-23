import Ember from 'ember';

// {{#uni-form-radio name='dish' value='spam' groupValue=dish }} Spam {{/uni-form-radio}}
// {{#uni-form-radio name='dish' value='eggs' groupValue=dish }} Eggs {{/uni-form-radio}}

export default Ember.Component.extend({

  tagName: 'label',
  classNames: [ 'uni-form-radio' ],
  classNameBindings: [ 'checked', 'disabled' ],
  attributeBindings: [ 'for' ],

  for: Ember.computed.reads('name'),

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

  change: function () {
    this.set('groupValue', this.get('value'));
  }

});

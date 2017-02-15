import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'input',
  classNames: ['uni-form-submit'],
  attributeBindings: ['type', 'value'],
  type: 'submit',

  label: 'Submit',
  value: Ember.computed.reads('label'),

});

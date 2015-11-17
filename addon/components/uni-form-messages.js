import Ember from 'ember';
import layout from '../templates/uni-form-messages';
import FindsParentForm from '../mixins/finds-parent-form';

export default Ember.Component.extend(
  FindsParentForm,
{

  classNames: [ 'uni-form-messages' ],
  layout: layout,

  errors: Ember.computed.filterBy('messages', 'tone', 'error'),
  message: Ember.computed.reads('messages.firstObject'),
  messages: Ember.computed.reads('parentFormView.form.messages'),
  showAll: false,

});

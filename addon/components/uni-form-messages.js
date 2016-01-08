import Ember from 'ember';
import layout from '../templates/uni-form-messages';
import FindsParentFormView from '../mixins/finds-parent-form-view';

export default Ember.Component.extend(
  FindsParentFormView,
{

  classNames: [ 'uni-form-messages' ],
  layout: layout,

  errors: Ember.computed.reads('parentFormView.form.errorMessages'),
  message: Ember.computed.reads('messages.firstObject'),
  messages: Ember.computed.reads('parentFormView.form.messages'),
  multipleErrors: Ember.computed.gt('errors.length', 1),
  showAll: false,

});

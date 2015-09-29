import Ember from 'ember';
import layout from '../templates/uni-form-buttons';
import FindsParentForm from '../mixins/finds-parent-form';

export default Ember.Component.extend(
  FindsParentForm,
{

  tagName: 'fieldset',
  classNames: [ 'uni-form-buttons' ],
  layout: layout,

  cancel: 'Cancel',
  submit: 'Submit',

  actions: {

    cancel: function () {
      this.get('parentFormView.attrs.cancel')();
    },

    submit: function () {
      this.get('parentFormView.attrs.submit')();
    },

  },

});

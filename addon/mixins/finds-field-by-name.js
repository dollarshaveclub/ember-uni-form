import Ember from 'ember';
import FindsParentForm from './finds-parent-form';

export default Ember.Mixin.create(
  FindsParentForm,
{

  field: function () {
    return this.get(`parentFormView.form.fieldsByName.${this.get('property')}`);
  }.property('parentFormView', 'property'),

});

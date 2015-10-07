import Ember from 'ember';
import FindsParentForm from './finds-parent-form';

export default Ember.Mixin.create(
  FindsParentForm,
{

  field: function () {
    var form = this.get('parentFormView.form');
    if (!form) return {};
    if (form.then) return form.then(form => {
      this.set('field', form.get(`fieldsByName.${this.get('property')}`) || {});
    });
    return form.get(`fieldsByName.${this.get('property')}`) || {};
  }.property('parentFormView', 'property'),

});

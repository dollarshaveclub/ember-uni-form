import Ember from 'ember';
import FindsParentForm from './finds-parent-form';

export default Ember.Mixin.create(
  FindsParentForm,
{

  field: function () {
    var form = this.get('parentFormView.form');
    var name = (this.get('property') || '').replace(/\./g, '_');
    var path = `fieldsByName.${name}`;
    if (!form || !name) return {};
    if (form.then) return form.then(form => this.set('field', form.get(path) || {}));
    return form.get(path) || {};
  }.property('parentFormView', 'property'),

});

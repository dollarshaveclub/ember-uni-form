import Ember from 'ember';
import FindsParentFormView from './finds-parent-form-view';

export default Ember.Mixin.create(
  FindsParentFormView,
{

  field: function () {
    var form = this.get('parentFormView.form');
    var name = (this.get('payloadKey') || '').replace(/\./g, '_');
    var path = `fieldsByName.${name}`;
    if (!form || !name) return {};
    if (form.then) return form.then(form => this.set('field', form.get(path) || {}));
    return form.get(path) || {};
  }.property('parentFormView', 'payloadKey'),

});

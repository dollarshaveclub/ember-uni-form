import Ember from 'ember';
import FindsParentFormView from './finds-parent-form-view';

export default Ember.Mixin.create(
  FindsParentFormView,
{

  field: Ember.computed('form', 'payloadKey', function () {
    var form = this.get('form');
    var name = (this.get('payloadKey') || '').replace(/\./g, '_');
    var path = `fieldsByName.${name}`;
    if (!form || !name) return {};
    return form.get(path) || {};
  }),

  form: Ember.computed.reads('parentFormView.form'),

});

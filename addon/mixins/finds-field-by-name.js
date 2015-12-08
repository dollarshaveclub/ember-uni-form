import Ember from 'ember';
import FindsParentFormView from './finds-parent-form-view';

export default Ember.Mixin.create(
  FindsParentFormView,
{

  field: function () {
    var form = this.get('form');
    var name = (this.get('payloadKey') || '').replace(/\./g, '_');
    var path = `fieldsByName.${name}`;
    if (!form || !name) return {};
    return form.get(path) || {};
  }.property('form', 'payloadKey'),

  form: Ember.computed.reads('parentFormView.form'),

});

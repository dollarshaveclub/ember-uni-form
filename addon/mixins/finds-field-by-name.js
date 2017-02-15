import Ember from 'ember';
import FindsParentFormView from './finds-parent-form-view';

export default Ember.Mixin.create(
  FindsParentFormView,
  {

    field: Ember.computed('form', 'payloadKey', function () {
      const form = this.get('form');
      const name = (this.get('payloadKey') || '').replace(/\./g, '_');
      const path = `fieldsByName.${name}`;
      if (!form || !name) return {};
      return form.get(path) || {};
    }),

    form: Ember.computed.reads('parentFormView.form'),

  });

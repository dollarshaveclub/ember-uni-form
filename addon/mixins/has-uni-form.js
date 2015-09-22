import Ember from 'ember';

export default Ember.Mixin.create({

  uniFormClientErrors: 'model.validator.errors',
  uniFormServerErrors: 'model.errors',

  uniForm: function () {
    var model = this.get('model');
    Ember.assert("mixin:has-uni-form requires this.get('model')", model);

    var data = { model: model };
    var fieldNames = this.get('uniFormFieldNames');
    data.fields = fieldNames.map((name) => {
      return this.store.createRecord('uni-form-field', { name: name });
    });

    var clientErrorsKey = this.get('uniFormClientErrors');
    var serverErrorsKey = this.get('uniFormServerErrors');
    if (clientErrorsKey) data.clientErrorsKey = clientErrorsKey;
    if (serverErrorsKey) data.serverErrorsKey = serverErrorsKey;

    return this.store.createRecord('uni-form', data);
  }.property('model'),

  uniFormFieldNames: function () {
    var model = this.get('model');
    return Object.keys(model.serialize());
  }.property('model'),

});

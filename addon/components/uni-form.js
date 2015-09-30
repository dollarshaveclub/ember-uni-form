import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',
  classNames: [ 'uni-form' ],

  model: Ember.computed.alias('form.model'),

  submitWithErrors: false,

  submit: function (e) {
    var model = this.get('model');
    var action = this.attrs && this.attrs.action || Ember.$.noop;

    e.preventDefault();

    new Ember.RSVP.Promise((resolve, reject) => {
      if (model.validate) model.validate.call(model).then(resolve, reject);
      else resolve();
    })
    .then(() => {
      action();
    })
    .catch(() => {
      if (this.get('submitWithErrors')) action();
    });
  },

  // DEBUG_EXPORT: function () {
  //   window.parentFormView = this;
  // }.on('didInsertElement'),

});

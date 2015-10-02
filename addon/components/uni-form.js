import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',
  classNames: [ 'uni-form' ],
  classNameBindings: [ 'invalid' ],

  invalid: Ember.computed.reads('model.isInvalid'),
  model: Ember.computed.alias('form.model'),

  submitAborted: false,
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
      else this.set('submitAborted', true);
    });
  },

  // DEBUG_EXPORT: function () {
  //   window.parentFormView = this;
  // }.on('didInsertElement'),

});

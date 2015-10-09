import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'form',
  classNames: [ 'uni-form' ],
  classNameBindings: [ 'invalid' ],

  invalid: Ember.computed.reads('form.model.isInvalid'),

  submitAborted: false,
  submitWithErrors: false,

  submit: function (e) {
    if (e) e.preventDefault();

    var model = this.get('form.model');
    var action = this.get('action');
    if (!(model && action)) return;

    return new Ember.RSVP.Promise((resolve, reject) => {
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

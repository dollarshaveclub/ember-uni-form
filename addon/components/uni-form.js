import Ember from 'ember'

export default Ember.Component.extend({

  tagName: 'form',
  classNames: ['uni-form'],
  classNameBindings: ['invalid'],

  invalid: Ember.computed.reads('form.payload.isInvalid'),

  submitFailed: Ember.computed.alias('form.submitFailed'),
  submitWithErrors: false,

  submit (e) {
    if (e) e.preventDefault()

    // Blur on submit so pressing enter twice will not submit twice.
    const focusNode = this.$(':focus')
    if (focusNode) focusNode.blur()

    const model = this.get('form.payload')
    const action = this.get('action')
    if (!(model && action)) return

    return new Ember.RSVP.Promise((resolve, reject) => {
      if (model.validate) model.validate(model).then(resolve, reject)
      else resolve()
    })
      .then(() => {
        action()
      })
      .catch(() => {
        if (this.get('submitWithErrors')) action()
        else this.set('form.submitFailed', true)
      })
  },

  // DEBUG_EXPORT: function () {
  //   window.parentFormView = this;
  // }.on('didInsertElement'),

})

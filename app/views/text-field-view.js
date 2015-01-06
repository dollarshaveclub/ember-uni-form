Ember.TextField.reopen({

  submit: 'submit',

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendAction('submit');
    }
  }

});

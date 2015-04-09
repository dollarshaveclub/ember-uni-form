import Ember from 'ember';

export default Ember.View.extend({

  submit: 'submit',

  keyDown: function (e) {
    if (e && e.keyCode === 13) {
      e.preventDefault();
      this.sendAction('submit');
    }
  }

});

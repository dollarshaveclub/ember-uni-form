//
// @source http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
//
App.FocusInputComponent = Ember.TextField.extend({
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement')
});

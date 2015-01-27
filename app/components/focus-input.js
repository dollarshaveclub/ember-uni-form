import Ember from 'ember';
//
// @source http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
//
export default Ember.Component.extend({
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement')
});

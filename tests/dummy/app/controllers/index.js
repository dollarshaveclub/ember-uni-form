import Ember from 'ember';
import HasUniForm from '../mixins/has-uni-form';

export default Ember.Controller.extend(
  HasUniForm,
{

  breakfastDish: 'eggs',
  isBreakfastDishDisabled: false,

  isPurplePantsFan: true,
  isPurplePantsDisabled: false,

});

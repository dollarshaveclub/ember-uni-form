import Ember from 'ember';
import HasUniForm from '../mixins/has-uni-form';

export default Ember.Controller.extend(
  HasUniForm,
{

  breakfastDish: 'eggs',
  isDishabled: false,

  isPurplePantsFan: true,
  isPantsDisabled: false,

});

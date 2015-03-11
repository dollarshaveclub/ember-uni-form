import Ember from 'ember';
import HandlesValidationErrorsForInputs from '../mixins/handles-validation-errors-for-inputs';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Select.extend(
  HandlesValidationErrorsForInputs,
  TriggersChange,
{

  attributeBindings: [ 'autocomplete' ],
  autocomplete: true,

});

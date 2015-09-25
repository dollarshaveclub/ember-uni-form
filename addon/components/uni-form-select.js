import Ember from 'ember';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Select.extend({

  classNames: [ 'uni-form-select' ],
  classNameBindings: [ 'required' ],

  name: Ember.computed.reads('property'),
  prompt: Ember.computed.alias('placeholder'),

});

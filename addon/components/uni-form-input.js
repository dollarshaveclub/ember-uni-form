import Ember from 'ember';
import layout from '../templates/uni-form-input';
import HasFieldStatus from '../mixins/has-field-status';
import TriggersChange from '../mixins/triggers-change';

export default Ember.Component.extend(
  HasFieldStatus,
  TriggersChange,
{

  tagName: 'label',
  classNames: [ 'uni-form-input' ],
  layout: layout,
  type: 'text',

  name: Ember.computed.reads('property'),
  value: Ember.computed.alias('field.value'),

  label: function () {
    return (this.get('property') || '').dasherize().replace(/-/g, ' ').capitalize();
  }.property('property'),

});

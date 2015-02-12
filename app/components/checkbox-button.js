import Ember from 'ember';
import TruthinessTogglerComponent from './truthiness-toggler';

// {{ checkbox-button checkboxLabel="Billing address same as shipping"
//                    name='billingSameAsShipping'
//                    toggleProp=formModel.billingAddressSameAsShippingAddress }}

export default TruthinessTogglerComponent.extend({

  tagName: 'label',
  classNames: [ 'checkbox-button' ],
  classNameBindings: [ 'checked' ],
  attributeBindings: [ 'checkboxLabel', 'name', 'toggleProp' ],

  checked: function () {
    return this.get('toggleProp');
  }.property('toggleProp')

});

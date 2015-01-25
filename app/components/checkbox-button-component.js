
// {{ checkbox-button checkboxLabel="Billing address same as shipping"
//                    name='billingSameAsShipping'
//                    toggleProp=formModel.billingAddressSameAsShippingAddress }}

require('./truthiness-toggler-component');

App.CheckboxButtonComponent = App.TruthinessTogglerComponent.extend({

  attributeBindings: [ 'checkboxLabel', 'name', 'toggleProp' ],
  classNameBindings: [ 'checked' ],
  classNames: [ 'checkbox-button' ],
  tagName: 'label',

  checked: function () {
    return this.get('toggleProp');
  }.property('toggleProp')

});

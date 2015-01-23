

// {{ checkbox-button checkboxLabel="Billing address same as shipping"
//                    name='billingSameAsShipping'
//                    toggleProp=formModel.billingAddressSameAsShippingAddress }}

App.CheckboxButtonComponent = Ember.Component.extend({

  attributeBindings: [ 'checkboxLabel', 'name', 'toggleProp' ],
  classNameBindings: [ 'checked' ],
  classNames: [ 'checkbox-button' ],
  tagName: 'label',

  checked: function () {
    return this.get('toggleProp');
  }.property('toggleProp')

});

import Ember from 'ember'
import UniFormSelectComponent from 'ember-uni-form/components/uni-form-select'

export default UniFormSelectComponent.extend({

  prompt: 'Month',

  content: Ember.computed(function () {
    return [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
    .map((s) => ({ label: s, value: s }))
  })

})

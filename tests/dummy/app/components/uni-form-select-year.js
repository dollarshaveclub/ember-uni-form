import Ember from 'ember'
import UniFormSelectComponent from 'ember-uni-form/components/uni-form-select'

var NUM_YEARS = 13

export default UniFormSelectComponent.extend({

  prompt: 'Year',

  content: Ember.computed(function () {
    var year = new Date().getFullYear()
    var options = []
    for (var i = 0; i < NUM_YEARS; i++) {
      var s = (year + i).toString()
      options.push({ label: s, value: s })
    }
    return options
  })

})

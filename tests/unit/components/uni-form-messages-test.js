import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('uni-form-messages', {
  unit: true,
})

test('it should have class="uni-form-messages"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-messages'), true)
})

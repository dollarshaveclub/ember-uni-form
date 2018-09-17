import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('uni-form-radio-tag', {
  unit: true,
})

test('it should have class="uni-form-radio-tag"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-radio-tag'), true)
})

// Covered by uni-form-radio tests.

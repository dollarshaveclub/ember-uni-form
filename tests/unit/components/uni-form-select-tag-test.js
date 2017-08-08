import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('uni-form-select-tag', {
  unit: true,
  needs: ['service:fastboot'],
})

test('it should have class="uni-form-select-tag"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-select-tag'), true)
})

// Covered by uni-form-select tests.

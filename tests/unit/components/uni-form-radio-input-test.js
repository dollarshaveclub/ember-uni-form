import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-radio-input', {
  unit: true
});

test('it should have class="uni-form-radio-input"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-radio-input'), true);
});

// Covered by uni-form-radio tests.

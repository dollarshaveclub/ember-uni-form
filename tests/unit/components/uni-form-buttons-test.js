import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-buttons', {
  unit: true,
});

test('it should have class="uni-form-buttons"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-buttons'), true);
});

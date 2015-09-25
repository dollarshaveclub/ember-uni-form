import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it should have class="uni-form"', function (assert) {
  assert.equal(this.$().hasClass('uni-form'), true);
});

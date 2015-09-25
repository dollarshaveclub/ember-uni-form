import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form', {
  unit: true
});

//
// Content
//

test('it should have class="uni-form"', function (assert) {
  assert.equal(this.$().hasClass('uni-form'), true);
});

test('it renders as a form tag', function (assert) {
  assert.equal(this.$().prop('tagName'), 'FORM');
});

import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-checkbox', {
  unit: true
});

//
// Content
//

test('it should have class="uni-form-checkbox"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-checkbox'), true);
});

test('it renders as a label with a child input (so any click triggers input click)', function (assert) {
  assert.equal(this.$().prop('tagName'), 'LABEL');
  assert.ok(this.$().has('input'));
});

test('it should render attrs.label inside .label', function (assert) {
  this.subject({ label: 'test label text' });
  assert.equal(this.$('.label').html(), 'test label text');
});

test('it should not render .label if attrs.label is empty', function (assert) {
  assert.equal(this.$('.label').length, 0);
});

test('it sets input[name] to attrs.property (for autocomplete)', function (assert) {
  this.subject({ property: 'property name' });
  assert.equal(this.$('input').attr('name'), 'property name');
});

//
// Property binding
//

// Moved to integration tests because this fails for unknown reasons
// test('it should have class="checked" when checked', function (assert) {
//   this.subject({ checked: true });
//   assert.equal(this.$().hasClass('checked'), true);
// });

test('it should have class="disabled" when disabled', function (assert) {
  this.subject({ disabled: true });
  assert.equal(this.$().hasClass('disabled'), true);
});

test('its input should be disabled when attrs.disabled is truthy', function (assert) {
  this.subject({ disabled: true });
  assert.equal(this.$('input:disabled').length, 1);
});

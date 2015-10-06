import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-textarea', {
  unit: true
});

//
// Content
//

test('it should have class="uni-form-textarea"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-textarea'), true);
});

test('it renders as a label with a child textarea (so any click triggers textarea click)', function (assert) {
  assert.equal(this.$().prop('tagName'), 'LABEL');
  assert.ok(this.$().has('textarea'));
});

test('it should render attrs.label inside .label', function (assert) {
  this.subject({ label: 'test label text' });
  assert.equal(this.$('.label').html(), 'test label text');
});

test('it should not render .label if attrs.label is empty', function (assert) {
  assert.equal(this.$('.label').length, 0);
});

test('it sets textarea[name] to attrs.property (for autocomplete)', function (assert) {
  this.subject({ property: 'property name' });
  assert.equal(this.$('textarea').attr('name'), 'property name');
});

test('it should render .message.<tone>', function (assert) {
  this.subject({ message: { body: 'message content', tone: 'snarky' } });
  assert.equal(this.$('.snarky.message').html(), 'message content');
});

//
// Property binding
//

test('it should have class="disabled" when disabled', function (assert) {
  this.subject({ disabled: true });
  assert.equal(this.$().hasClass('disabled'), true);
});

test('its input should be disabled when attrs.disabled is truthy', function (assert) {
  this.subject({ disabled: true });
  assert.equal(this.$('textarea').is(':disabled'), true);
});

test('it should have class="error" when attrs.tone=error and showStatus=true', function (assert) {
  this.subject({ tone: 'error', showStatus: true });
  assert.equal(this.$().hasClass('error'), true);
});

test('it should have class="required" when required', function (assert) {
  this.subject({ required: true });
  assert.equal(this.$().hasClass('required'), true);
});

test('it should set textarea[maxlength=attrs.maxlength]', function (assert) {
  this.subject({ maxlength: 35 });
  assert.equal(this.$('textarea').attr('maxlength'), 35);
});

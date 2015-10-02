import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-select', {
  unit: true,
  needs: [ 'component:uni-form-select-tag' ],
});

//
// Content
//

test('it should have class="uni-form-select"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-select'), true);
});

test('it renders the prompt option with class="prompt" and value=""', function (assert) {
  this.subject({ prompt: 'here' });
  assert.equal(this.$('option.prompt[value=""]').length, 1);
});

test('it renders as a label with a child select (so any click triggers select focus)', function (assert) {
  assert.equal(this.$().prop('tagName'), 'LABEL');
  assert.equal(this.$('select').length, 1);
});

test('it should render attrs.label inside .label', function (assert) {
  this.subject({ label: 'test label text' });
  assert.equal(this.$('.label').html(), 'test label text');
});

test('it should not render .label if attrs.label is empty', function (assert) {
  assert.equal(this.$('.label').length, 0);
});

test('it sets select[name] to attrs.property (for autocomplete)', function (assert) {
  this.subject({ property: 'property name' });
  assert.equal(this.$('select').attr('name'), 'property name');
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

test('its select should be disabled when attrs.disabled is truthy', function (assert) {
  this.subject({ disabled: true });
  assert.equal(this.$('select').is(':disabled'), true);
});

test('it should have class="error" when attrs.tone=error', function (assert) {
  this.subject({ tone: 'error' });
  assert.equal(this.$().hasClass('error'), true);
});

test('it should have class="required" when required', function (assert) {
  this.subject({ required: true });
  assert.equal(this.$().hasClass('required'), true);
});

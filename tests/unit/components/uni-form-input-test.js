import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('uni-form-input', {
  unit: true,
})

//
// Content
//

test('it should have class="uni-form-input"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-input'), true)
})

test('it renders as a label with a child input (so any click triggers input click)', function (assert) {
  assert.equal(this.$().prop('tagName'), 'LABEL')
  assert.ok(this.$().has('input'))
})

test('it should render attrs.label inside .label', function (assert) {
  this.subject({ label: 'test label text' })
  assert.equal(this.$('.label').html(), 'test label text')
})

test('it should not render .label if attrs.label is empty', function (assert) {
  this.subject({ label: '' })
  assert.equal(this.$('.label').length, 0)
})

test('it sets input[name] to attrs.payloadKey (for autocomplete)', function (assert) {
  this.subject({ payloadKey: 'foo.bar' })
  assert.equal(this.$('input').attr('name'), 'foo.bar')
})

test('it should render .message.<tone>', function (assert) {
  this.subject({ message: { body: 'message content', tone: 'snarky' } })
  assert.equal(this.$('.snarky.message').html(), 'message content')
})

//
// Property binding
//

test('it should have class="disabled" when disabled', function (assert) {
  this.subject({ disabled: true })
  assert.equal(this.$().hasClass('disabled'), true)
})

test('its input should be disabled when attrs.disabled is truthy', function (assert) {
  this.subject({ disabled: true })
  assert.equal(this.$('input').is(':disabled'), true)
})

test('it should have class="error" when attrs.tone=error and showStatus=true', function (assert) {
  this.subject({ tone: 'error', showStatus: true })
  assert.equal(this.$().hasClass('error'), true)
})

test('it should have class="required" when required', function (assert) {
  this.subject({ required: true })
  assert.equal(this.$().hasClass('required'), true)
})

test('it should set input[maxlength=attrs.maxlength]', function (assert) {
  this.subject({ maxlength: 35 })
  assert.equal(this.$('input').attr('maxlength'), 35)
})

// These are the only types of inputs uni-form-input is guaranteed to work with
// Full List of Inputs: http://www.w3schools.com/tags/att_input_type.asp
const inputTypes = [
  'button',
  'hidden',
  'image',
  'password',
  'reset',
  'text',
]

inputTypes.forEach((type) => {
  test(`it should set input[type=${type}]`, function (assert) {
    this.subject({ type })
    assert.equal(this.$('input').attr('type'), type)
  })
})

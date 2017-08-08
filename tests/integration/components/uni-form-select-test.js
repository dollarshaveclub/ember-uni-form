import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('uni-form-select', {
  integration: true
})

//
// Value binding
//

test('it should update value on change', function (assert) {
  this.set('x', 'initial')
  this.set('content', [
    { label: 'updated', value: 'updated' },
    { label: 'initial', value: 'initial' },
  ])
  this.render(hbs`{{ uni-form-select content=content value=x }}`)
  assert.equal(this.get('x'), 'initial')
  this.$('option[value="updated"]').prop('selected', true).trigger('change')
  assert.equal(this.get('x'), 'updated')
})

test('it should change selection on value update', function (assert) {
  this.set('x', 'initial')
  this.set('content', [
    { label: 'updated', value: 'updated' },
    { label: 'initial', value: 'initial' },
  ])
  this.render(hbs`{{ uni-form-select content=content value=x }}`)
  assert.equal(this.$('option[value="initial"]').is(':selected'), true)
  this.set('x', 'updated')
  assert.equal(this.$('option[value="updated"]').is(':selected'), true)
})

//
// Dynamic binding
//

test('it should two-way bind value to field.value', function (assert) {
  this.set('x', { value: 'blue' })
  this.set('y', [
    { label: 'red', value: 'red' },
    { label: 'green', value: 'green' },
    { label: 'blue', value: 'blue' },
  ])
  this.render(hbs`{{ uni-form-select content=y prompt='(.___.)' field=x }}`)
  assert.equal(this.$('option[value="blue"]').is(':selected'), true)
  this.set('x.value', 'red')
  assert.equal(this.$('option[value="red"]').is(':selected'), true)
  this.$('option[value="green"]').prop('selected', true).trigger('change')
  assert.equal(this.get('x.value'), 'green')
})

test('it should bind class="required" to field.required', function (assert) {
  this.set('x', { required: true })
  this.render(hbs`{{ uni-form-select field=x }}`)
  assert.equal(this.$('.uni-form-select').hasClass('required'), true)
})

//
// Property binding
//

test('it should select (and show) the prompt when the value is undefined', function (assert) {
  this.set('content', [
    { label: 'updated', value: 'updated' },
    { label: 'initial', value: 'initial' },
  ])
  this.render(hbs`{{ uni-form-select content=content prompt='prompt' }}`)
  assert.equal(this.$('option.prompt').is(':selected'), true)
})

test('it should have class="prompting" when prompt option is selected', function (assert) {
  this.set('x', 'initial')
  this.set('content', [
    { label: 'updated', value: 'updated' },
    { label: 'initial', value: 'initial' },
  ])
  this.render(hbs`{{ uni-form-select content=content prompt='prompt' value=x }}`)
  assert.equal(this.$('.uni-form-select').hasClass('prompting'), false, 'A')
  assert.equal(this.$('option.prompt').is(':selected'), false, 'B')
  this.$('option.prompt').prop('selected', true).trigger('change')
  assert.equal(this.$('.uni-form-select').hasClass('prompting'), true, 'C')
  assert.equal(this.$('option.prompt').is(':selected'), true, 'D')
  this.set('x', 'updated')
  assert.equal(this.$('.uni-form-select').hasClass('prompting'), false)
  assert.equal(this.$('option.prompt').is(':selected'), false)
})

test('it should bind select[disabled] to attrs.disabled', function (assert) {
  this.render(hbs`{{ uni-form-select disabled=isDisabled }}`)
  assert.equal(this.$('select').is(':disabled'), false)
  this.set('isDisabled', true)
  assert.equal(this.$('select').is(':disabled'), true)
})

//
// Content
//

test('it should render the contents of the yield block', function (assert) {
  this.render(hbs`{{#uni-form-select}}<hr class="yielded-content">{{/uni-form-select}}`)
  assert.equal(this.$('.yielded-content').length, 1)
})

test('it should render field.message as .message when showStatus=true', function (assert) {
  this.set('x', { message: { body: 'message content' } })
  this.render(hbs`{{ uni-form-select field=x showStatus=true }}`)
  assert.equal(this.$('.message').html(), 'message content')
})

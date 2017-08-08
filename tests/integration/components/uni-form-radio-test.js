import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('uni-form-radio', {
  integration: true
})

//
// Value binding
//

test('it should update groupValue on click', function (assert) {
  this.set('x', 'initial')
  this.render(hbs`{{ uni-form-radio groupValue=x value='updated by component' }}`)
  assert.equal(this.get('x'), 'initial')
  this.$('input').trigger('click')
  assert.equal(this.get('x'), 'updated by component')
})

test('it should update groupValue on change', function (assert) {
  this.set('x', 'initial')
  this.render(hbs`{{ uni-form-radio groupValue=x value='updated by component' }}`)
  assert.equal(this.get('x'), 'initial')
  this.$('input').prop('checked', true).trigger('change')
  assert.equal(this.get('x'), 'updated by component')
})

test('it should be checked when groupValue = value', function (assert) {
  this.set('x', 'initial')
  this.render(hbs`{{ uni-form-radio groupValue=x value='component value' }}`)
  assert.equal(this.$('input').is(':checked'), false)
  this.set('x', 'component value')
  assert.equal(this.$('input').is(':checked'), true)
})

//
// Dynamic binding
//

test('it should bind value to field.value', function (assert) {
  this.set('x', { value: 'blue' })
  this.render(hbs`{{ uni-form-radio field=x value='red' }}`)
  this.$('input').prop('checked', true).trigger('change')
  assert.equal(this.get('x.value'), 'red')
})

test('it should bind class="required" to field.required', function (assert) {
  this.set('x', { required: true })
  this.render(hbs`{{ uni-form-radio field=x }}`)
  assert.equal(this.$('.uni-form-radio').hasClass('required'), true)
})

//
// Property binding
//

test('it should have class="checked" when checked', function (assert) {
  this.set('x', 'initial')
  this.render(hbs`{{ uni-form-radio }}`)
  assert.equal(this.$().hasClass('checked'), false)
  this.$('input').trigger('click')
  assert.equal(this.$('label').hasClass('checked'), true)
})

test('it should bind input[disabled] to attrs.disabled', function (assert) {
  this.render(hbs`{{ uni-form-radio disabled=isDisabled }}`)
  assert.equal(this.$('input').is(':disabled'), false)
  this.set('isDisabled', true)
  assert.equal(this.$('input').is(':disabled'), true)
})

//
// Content
//

test('it should render the contents of the yield block', function (assert) {
  this.render(hbs`{{#uni-form-radio}}<hr class="yielded-content">{{/uni-form-radio}}`)
  assert.equal(this.$('.yielded-content').length, 1)
})

test('it should render field.message as .message when showStatus=true', function (assert) {
  this.set('x', { message: { body: 'message content' } })
  this.render(hbs`{{ uni-form-radio field=x showStatus=true }}`)
  assert.equal(this.$('.message').html(), 'message content')
})

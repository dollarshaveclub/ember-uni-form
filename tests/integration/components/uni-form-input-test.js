import Ember from 'ember'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('uni-form-input', {
  integration: true,
})

//
// Value binding
//

test('it should bind the input[value] to attrs.value', function (assert) {
  var done = assert.async()
  this.set('x', 'initial')
  this.render(hbs`{{ uni-form-input value=x inputValueDelay=5 }}`)
  Ember.run.later(() => {
    assert.equal(this.$('input').val(), 'initial')
    this.set('x', 'updated via context')
    Ember.run.later(() => {
      assert.equal(this.$('input').val(), 'updated via context')
      this.$('input').val('updated via input').trigger('change')
      Ember.run.later(() => {
        assert.equal(this.get('x'), 'updated via input')
        done()
      }, 10)
    }, 5)
  }, 5)
})

//
// Dynamic binding
//

test('it should two-way bind value to field.value', function (assert) {
  var done = assert.async()
  this.set('x', { value: 'blue' })
  this.render(hbs`{{ uni-form-input field=x inputValueDelay=5 }}`)
  Ember.run.later(() => {
    assert.equal(this.$('input').val(), 'blue')
    this.set('x.value', 'red')
    Ember.run.later(() => {
      assert.equal(this.$('input').val(), 'red')
      this.$('input').val('green').trigger('change')
      Ember.run.later(() => {
        assert.equal(this.get('x.value'), 'green')
        done()
      }, 10)
    }, 5)
  }, 5)
})

test('it should bind class="required" to field.required', function (assert) {
  this.set('x', { required: true })
  this.render(hbs`{{ uni-form-input field=x }}`)
  assert.equal(this.$('.uni-form-input').hasClass('required'), true)
})

//
// Property binding
//

test('it should bind input[disabled] to attrs.disabled', function (assert) {
  this.render(hbs`{{ uni-form-input disabled=isDisabled }}`)
  assert.equal(this.$('input').is(':disabled'), false)
  this.set('isDisabled', true)
  assert.equal(this.$('input').is(':disabled'), true)
})

test('it should one-way bind input[maxlength] to field.maxlength', function (assert) {
  this.set('x', { maxlength: 42 })
  this.render(hbs`{{ uni-form-input field=x }}`)
  assert.equal(this.$('input').attr('maxlength'), 42)
  this.set('x.maxlength', 37)
  assert.equal(this.$('input').attr('maxlength'), 37)
})

test('it should bind input[autocomplete] to attrs.autocomplete', function (assert) {
  this.set('autocomplete', 'off')
  this.render(hbs`{{ uni-form-input autocomplete=autocomplete }}`)
  assert.equal(this.$('input').attr('autocomplete'), 'off')
  this.set('autocomplete', 'on')
  assert.equal(this.$('input').attr('autocomplete'), 'on')
})

//
// Content
//

test('it should render the contents of the yield block', function (assert) {
  this.render(hbs`{{#uni-form-input}}<hr class="yielded-content">{{/uni-form-input}}`)
  assert.equal(this.$('.yielded-content').length, 1)
})

test('it should render field.message as .message when showStatus=true', function (assert) {
  this.set('x', { message: { body: 'message content' } })
  this.render(hbs`{{ uni-form-input field=x showStatus=true }}`)
  assert.equal(this.$('.message').html(), 'message content')
})

import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var INPUT_DEBOUNCE_DELAY = 300;

moduleForComponent('uni-form-textarea', {
  integration: true,
});

//
// Value binding
//

test('it should bind the textarea[value] to attrs.value', function (assert) {
  this.set('x', 'initial');
  this.render(hbs`{{ uni-form-textarea value=x }}`);
  assert.equal(this.$('textarea').val(), 'initial');
  this.set('x', 'updated via context');
  assert.equal(this.$('textarea').val(), 'updated via context');
  this.$('textarea').val('updated via textarea').trigger('change');
  var done = assert.async();
  Ember.run.later(() => {
    assert.equal(this.get('x'), 'updated via textarea');
    done();
  }, INPUT_DEBOUNCE_DELAY + 100);
});

//
// Dynamic binding
//

test('it should two-way bind value to field.value', function (assert) {
  this.set('x', { value: 'blue' });
  this.render(hbs`{{ uni-form-textarea field=x }}`);
  assert.equal(this.$('textarea').val(), 'blue');
  this.set('x.value', 'red');
  assert.equal(this.$('textarea').val(), 'red');
  this.$('textarea').val('green').trigger('change');
  var done = assert.async();
  Ember.run.later(() => {
    assert.equal(this.get('x.value'), 'green');
    done();
  }, INPUT_DEBOUNCE_DELAY + 100);
});

test('it should bind class="required" to field.required', function (assert) {
  this.set('x', { required: true });
  this.render(hbs`{{ uni-form-textarea field=x }}`);
  assert.equal(this.$('.uni-form-textarea').hasClass('required'), true);
});

//
// Property binding
//

test('it should bind textarea[disabled] to attrs.disabled', function (assert) {
  this.render(hbs`{{ uni-form-textarea disabled=isDisabled }}`);
  assert.equal(this.$('textarea').is(':disabled'), false);
  this.set('isDisabled', true);
  assert.equal(this.$('textarea').is(':disabled'), true);
});

test('it should one-way bind textarea[maxlength] to field.maxlength', function (assert) {
  this.set('x', { maxlength: 42 });
  this.render(hbs`{{ uni-form-textarea field=x }}`);
  assert.equal(this.$('textarea').attr('maxlength'), 42);
  this.set('x.maxlength', 37);
  assert.equal(this.$('textarea').attr('maxlength'), 37);
});

//
// Content
//

test('it should render the contents of the yield block', function (assert) {
  this.render(hbs`{{#uni-form-textarea}}<hr class="yielded-content">{{/uni-form-textarea}}`);
  assert.equal(this.$('.yielded-content').length, 1);
});

test('it should render field.message as .message when showStatus=true', function (assert) {
  this.set('x', { message: { body: 'message content' } });
  this.render(hbs`{{ uni-form-textarea field=x showStatus=true }}`);
  assert.equal(this.$('.message').html(), 'message content');
});

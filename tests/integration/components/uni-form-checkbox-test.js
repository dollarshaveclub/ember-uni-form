import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('uni-form-checkbox', {
  integration: true
});

//
// Value binding
//

test('it should update value on click', function (assert) {
  this.set('x', true);
  this.render(hbs`{{ uni-form-checkbox value=x }}`);
  this.$('input').trigger('click');
  assert.equal(this.get('x'), false);
});

test('it should update value on change', function (assert) {
  this.set('x', false);
  this.render(hbs`{{ uni-form-checkbox value=x }}`);
  this.$('input').prop('checked', true).trigger('change');
  assert.equal(this.get('x'), true);
});

//
// Dynamic binding
//

test('it should bind value to parentFormView.model.<attrs.property>', function (assert) {
  this.set('x', { model: { isColor: true } });
  this.render(hbs`{{#uni-form form=x }}{{ uni-form-checkbox property='isColor' }}{{/uni-form}}`);
  assert.equal(this.$('input').is(':checked'), true);
  this.set('x.model.isColor', false);
  assert.equal(this.$('input').is(':checked'), false);
  this.$('input').prop('checked', true).trigger('change');
  assert.equal(this.get('x.model.isColor'), true);
});

test('it should bind class="required" to parentFormView.model.validations.<attrs.property>.presence', function (assert) {
  this.set('x', { model: { validations: { isColor: { presence: true } } } });
  this.render(hbs`{{#uni-form form=x }}{{ uni-form-checkbox property='isColor' }}{{/uni-form}}`);
  assert.equal(this.$('.uni-form-checkbox').hasClass('required'), true);
});

//
// Property binding
//

test('it should be checked when value is truthy and not checked when it is falsey', function (assert) {
  this.set('x', 'a truthy string');
  this.render(hbs`{{ uni-form-checkbox value=x }}`);
  assert.equal(this.$('input').is(':checked'), true);
  this.set('x', null);
  assert.equal(this.$('input').is(':checked'), false);
});

test('it should have class="checked" when checked', function (assert) {
  this.set('x', true);
  this.render(hbs`{{ uni-form-checkbox value=x }}`);
  assert.equal(this.$('.uni-form-checkbox').hasClass('checked'), true);
});

//
// Content
//

test('it should render the contents of the yield block', function (assert) {
  this.render(hbs`{{#uni-form-checkbox}}<hr class="yielded-content">{{/uni-form-checkbox}}`);
  assert.equal(this.$('.yielded-content').length, 1);
});

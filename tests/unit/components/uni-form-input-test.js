import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('uni-form-input', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function (assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('Label text is rendered in child label tag', function (assert) {
  this.subject({ label: 'test label text' });
  assert.equal(this.$('label').html(), 'test label text');
});

test('Value attribute is bound to input element value', function (assert) {
  var value = 'start';
  this.set('contextValue', value);
  this.render(hbs`{{ uni-form-input value=contextValue }}`);
  assert.equal(value, 'start');
  this.$('input').val('end');
  assert.equal(value, 'end');
});

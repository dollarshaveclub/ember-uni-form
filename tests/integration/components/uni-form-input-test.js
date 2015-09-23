import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('uni-form-input', {
  integration: true,
});

test('Direct value binding: it should update context variable X when the value attribute is context variable X and the input element value changes', function (assert) {
  this.set('contextValue', 'initial context value');
  this.render(hbs`
    {{ uni-form-input value=contextValue }}
  `);
  assert.equal(this.get('contextValue'), 'initial context value');
  this.$('input').val('updated input value').trigger('change');
  assert.equal(this.get('contextValue'), 'updated input value');
});

test('Direct value binding: it should update the input element value when the value attribute is a context variable and it changes', function (assert) {
  this.set('contextValue', 'initial context value');
  this.render(hbs`
    {{ uni-form-input value=contextValue }}
  `);
  assert.equal(this.$('input').val(), 'initial context value');
  this.set('contextValue', 'updated context value');
  assert.equal(this.$('input').val(), 'updated context value');
});

test('Yield block: it should render the contents of the yield block', function (assert) {
  this.render(hbs`
    {{#uni-form-input}}
      <hr class="yielded-content">
    {{/uni-form-input}}
  `);
  assert.equal(this.$('.yielded-content').length, 1);
});

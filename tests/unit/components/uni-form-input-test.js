import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('uni-form-input', {
  unit: true
});

test('Type attribute: it should set the child input type to attrs.type', function (assert) {
  assert.expect(1);
  this.subject({ type: 'subject-component-type-attribute-value' });
  assert.equal(this.$('input').attr('type'), 'subject-component-type-attribute-value');
});

test('Label attribute: it should render attrs.label as the content of a label tag', function (assert) {
  assert.expect(1);
  this.subject({ label: 'test label text' });
  assert.equal(this.$('label').html(), 'test label text');
});

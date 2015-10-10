import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('uni-form-field', {
  needs: [ 'model:uni-form' ],
});

test('it should have "form", a belongsTo relationship to a uni-form', function(assert) {
  var UniFormField = this.store().modelFor('uni-form-field');
  var relationship = Ember.get(UniFormField, 'relationshipsByName').get('form');
  assert.equal(relationship.type, 'uni-form');
  assert.equal(relationship.kind, 'belongsTo');
});

test('it should have sortedMessages in descending order by message priority', function (assert) {
  this.subject().messages = [
    { priority: 2 },
    { priority: 5 },
    { priority: 3 },
    { priority: 1 },
    { priority: 4 },
  ];
  Ember.run(() => {
    assert.deepEqual(this.subject().get('sortedMessages'), [
      { priority: 5 },
      { priority: 4 },
      { priority: 3 },
      { priority: 2 },
      { priority: 1 },
    ]);
  });
});

test('it should filter form.messages by field name', function (assert) {
  this.subject({ name: 'email' }).form = { messages: [
    { field: 'email', priority: 2 },
    { field: 'email', priority: 5 },
    { field: 'email', priority: 3 },
    { field: 'email', priority: 1 },
    { field: 'email', priority: 4 },
  ] };
  Ember.run(() => {
    assert.deepEqual(this.subject().get('sortedMessages'), [
      { field: 'email', priority: 5 },
      { field: 'email', priority: 4 },
      { field: 'email', priority: 3 },
      { field: 'email', priority: 2 },
      { field: 'email', priority: 1 },
    ]);
  });
});

test('it should have "required" which reads form.model.validations.<name>.presence', function (assert) {
  this.subject({ name: 'email' }).form = { model: { validations: { email: { presence: true } } } };
  Ember.run(() => assert.equal(this.subject().get('required'), true));
});

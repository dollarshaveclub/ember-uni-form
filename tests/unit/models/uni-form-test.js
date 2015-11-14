import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('uni-form', {
  needs: [ 'model:uni-form-field' ],
  unit: true,
});

//
// Properties
//

test('it should parse fieldNames from JSONAPISerializer output', function (assert) {
  this.subject({ model: { serialize: () => ({ data: { attributes: { email: 'me@example.com', password: 'secret' }, id: 1, relationships: {}, type: 'action-create-sessions' } }) } });
  assert.deepEqual(this.subject().get('fieldNames'), [ 'email', 'password' ]);
});

test('it should parse fieldNames from ActiveModelSerializer output', function (assert) {
  this.subject({ model: { serialize: () => ({ email: 'me@example.com', password: 'secret' }) } });
  assert.deepEqual(this.subject().get('fieldNames'), [ 'email', 'password' ]);
});

test('it should populate fieldsByName for keys in serialized output', function (assert) {
  this.subject({ model: { serialize: () => ({ email: 'me@example.com', password: 'secret' }) } });
  Ember.run(() => {
    assert.deepEqual(Object.keys(this.subject().get('fieldsByName')), [ 'email', 'password' ]);
  });
});

//
// Methods
//

test('it should add a message with a priority when addMessage is given an object', function (assert) {
  this.subject().addMessage({ body: 'test message' });
  assert.deepEqual(this.subject().get('messages')[0], { body: 'test message', priority: 0 });
});

test('it should add a message when addMessage is given a string', function (assert) {
  this.subject().addMessage('test message');
  assert.deepEqual(this.subject().get('messages')[0], { body: 'test message' });
});

//
// Observers
//

test('it should update client errors when model.validationErrors.<fieldName> changes', function (assert) {
  this.subject({ model: {
    serialize: () => ({ email: 'me@example.com', password: 'secret' }),
    validationErrors: Ember.Object.create({ email: [ 'original error' ] }),
  } });
  Ember.run(() => assert.deepEqual(this.subject().get('messages')[0], {
    body: 'original error', field: 'email', path: '', source: 'client', tone: 'error'
   }));
  this.subject().set('model.validationErrors.email', [ 'updated error' ]);
  Ember.run(() => assert.deepEqual(this.subject().get('messages')[0], {
    body: 'updated error', field: 'email', path: '', source: 'client', tone: 'error'
  }));
});

import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

var addressFieldPaths = [ 'addressLine1', 'addressLine2', 'city', 'hasMailbox', 'notes', 'state', 'zipCode', 'zoning' ];

moduleForModel('uni-form', {
  needs: [ 'model:uni-form-field', 'model:address' ],
  unit: true,
});

//
// Properties
//

test('it should parse fieldPaths from its model', function (assert) {
  Ember.run(() => this.subject({ model: this.store().createRecord('address') }));
  assert.deepEqual(this.subject().get('fieldPaths'), addressFieldPaths);
});

test('it should map fieldPaths to fieldNames', function (assert) {
  Ember.run(() => this.subject({ model: this.store().createRecord('address') }));
  assert.deepEqual(this.subject().get('fieldNames'), addressFieldPaths);
});

test('it should populate fieldsByName for attributes on its model', function (assert) {
  Ember.run(() => this.subject({ model: this.store().createRecord('address') }));
  Ember.run(() => {
    assert.deepEqual(Object.keys(this.subject().get('fieldsByName')), addressFieldPaths);
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

test('it should update client errors when model.validationErrors.<fieldPath> changes', function (assert) {
  Ember.run(() => {
    this.subject({ model: this.store().createRecord('address') });
    this.subject().set('model.validationErrors', Ember.Object.create({ zipCode: [ 'original error' ] }));
    assert.deepEqual(this.subject().get('messages')[0], {
      body: 'original error', field: 'zipCode', path: '', source: 'client', tone: 'error'
    });
    this.subject().set('model.validationErrors.zipCode', [ 'updated error' ]);
    assert.deepEqual(this.subject().get('messages')[0], {
      body: 'updated error', field: 'zipCode', path: '', source: 'client', tone: 'error'
    });
  });
});

test('it should update client errors when model.validationErrors.<fieldPath> changes', function (assert) {
  Ember.run(() => {
    this.subject({ fieldPaths: [ 'color' ], model: {
      validationErrors: Ember.Object.create({ color: [ 'original error' ] })
    } });
    assert.deepEqual(this.subject().get('messages')[0], {
      body: 'original error', field: 'color', path: '', source: 'client', tone: 'error'
    });
    this.subject().set('model.validationErrors.color', [ 'updated error' ]);
    assert.deepEqual(this.subject().get('messages')[0], {
      body: 'updated error', field: 'color', path: '', source: 'client', tone: 'error'
    });
  });
});

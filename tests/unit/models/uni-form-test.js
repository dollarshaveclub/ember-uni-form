import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

var addressPayloadKeys = [ 'addressLine1', 'addressLine2', 'city', 'hasMailbox', 'notes', 'state', 'zipCode', 'zoning' ];
var addressFieldNames = addressPayloadKeys;

var paymentMethodPayloadKeys = [
  'billingAddressSameAsShippingAddress',
  'cvv',
  'expMonth',
  'expYear',
  'number',
  'billingAddress',
  'billingAddress.addressLine1',
  'billingAddress.addressLine2',
  'billingAddress.city',
  'billingAddress.hasMailbox',
  'billingAddress.notes',
  'billingAddress.state',
  'billingAddress.zipCode',
  'billingAddress.zoning',
];
var paymentMethodFieldNames = paymentMethodPayloadKeys.map(key => key.replace('.', '_'));

moduleForModel('uni-form', {
  needs: [
    'model:address',
    'model:payment-method',
    'model:uni-form-field',
    'serializer:address',
    'serializer:payment-method',
  ],
  unit: true,
});

//
// Properties
//

test('it should parse payloadKeys from its payload', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('address') }));
  assert.deepEqual(this.subject().get('payloadKeys'), addressPayloadKeys);
});

test('it should parse payloadKeys from its payload and support child models', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('payment-method', { billingAddress: this.store().createRecord('address') }) }));
  assert.deepEqual(this.subject().get('payloadKeys'), paymentMethodPayloadKeys);
});

test('it should map payloadKeys to fieldNames', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('address') }));
  assert.deepEqual(this.subject().get('fieldNames'), addressFieldNames);
});

test('it should map payloadKeys to fieldNames and support child models', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('payment-method', { billingAddress: this.store().createRecord('address') }) }));
  assert.deepEqual(this.subject().get('fieldNames'), paymentMethodFieldNames);
});

test('it should populate fieldsByName for attributes on its payload', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('address') }));
  Ember.run(() => {
    assert.deepEqual(Object.keys(this.subject().get('fieldsByName')), addressFieldNames);
  });
});

test('it should populate fieldsByName for attributes on its payload and support child models', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('payment-method', { billingAddress: this.store().createRecord('address') }) }));
  Ember.run(() => {
    assert.deepEqual(Object.keys(this.subject().get('fieldsByName')), paymentMethodFieldNames);
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

test('it should update client errors when payload.validationErrors.payloadKey changes (for non-nested fields)', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('address') }));
  this.subject().set('payload.validationErrors', Ember.Object.create({ zipCode: [ 'original error' ] }));
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'original error', field: 'zipCode', path: '', source: 'client', tone: 'error'
  });
  this.subject().set('payload.validationErrors.zipCode', [ 'updated error' ]);
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'updated error', field: 'zipCode', path: '', source: 'client', tone: 'error'
  });
});

test('it should update client errors when payload.parentKey.validationErrors.basename changes (for nested fields)', function (assert) {
  Ember.run(() => this.subject({ payload: this.store().createRecord('payment-method', { billingAddress: this.store().createRecord('address') }) }));
  this.subject().set('payload.billingAddress.validationErrors', Ember.Object.create({ zipCode: [ 'original error' ] }));
  assert.deepEqual(this.subject().get('messages')[0], {
    field: 'zipCode', body: 'original error', path: 'billingAddress', source: 'client', tone: 'error'
  });
  this.subject().set('payload.billingAddress.validationErrors.zipCode', [ 'updated error' ]);
  assert.deepEqual(this.subject().get('messages')[0], {
    field: 'zipCode', body: 'updated error', path: 'billingAddress', source: 'client', tone: 'error'
  });
});

test('it should update client errors when payload.validationErrors.payloadKey changes (for non-nested fields)', function (assert) {
  Ember.run(() => {
    this.subject({ payloadKeys: [ 'color' ], payload: {
      validationErrors: Ember.Object.create({ color: [ 'original error' ] })
    } });
  });
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'original error', field: 'color', path: '', source: 'client', tone: 'error'
  });
  this.subject().set('payload.validationErrors.color', [ 'updated error' ]);
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'updated error', field: 'color', path: '', source: 'client', tone: 'error'
  });
});

test('it should update client errors when payload.parentKey.validationErrors.basename changes (for nested fields)', function (assert) {
  Ember.run(() => {
    this.subject({ payloadKeys: [ 'user.color' ], payload: {
      user: { validationErrors: Ember.Object.create({ color: [ 'original error' ] }) }
    } });
  });
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'original error', field: 'color', path: 'user', source: 'client', tone: 'error'
  });
  this.subject().set('payload.user.validationErrors.color', [ 'updated error' ]);
  assert.deepEqual(this.subject().get('messages')[0], {
    body: 'updated error', field: 'color', path: 'user', source: 'client', tone: 'error'
  });
});

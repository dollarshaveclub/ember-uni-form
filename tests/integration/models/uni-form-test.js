import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('uni-form', {
  integration: true,
});

//
// Dynamic binding
//

test('it should add client error messages when validationErrors change',
function validationErrors(assert) {
  this.subject({ payloadKeys: ['color'], payload: {
    validationErrors: Ember.Object.create({ color: ['is ugly'] }),
  } });
  assert.deepEqual(this.subject().get('messages')[0], {
    field: 'color', body: 'is ugly', path: '', source: 'client', tone: 'error',
  });
});

test('payloadKeys', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', { payload: { someKey: 'someValue' } });
    assert.ok(mockModel);

    let expectedPayloadKeys = ['someKey'];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'it has the correct initial payloadKeys');

    mockModel.set('payload', {
      someOtherKey: 'someOtherValue',
      nestedObject: {
        nestedObjKey: 'nestedObjValue',
      },
    });
    expectedPayloadKeys = [
      'someOtherKey',
      'nestedObject',
      'nestedObject.nestedObjKey',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'payload update has triggered update in payloadKeys');
  });
});

test('payload with model', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: store.createRecord('address'),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'addressLine1',
      'addressLine2',
      'city',
      'hasMailbox',
      'notes',
      'state',
      'zipCode',
      'zoning',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload that is an address model');
  });
});

test('payload with nested model', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: store.createRecord('payment-method', {
        billingAddress: store.createRecord('address'),
      }),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
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
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload from nested model');
  });
});

test('payload with nested uni-form model', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: store.createRecord('uni-form', {
        payload: store.createRecord('address'),
      }),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'payload',
      'payload.addressLine1',
      'payload.addressLine2',
      'payload.city',
      'payload.hasMailbox',
      'payload.notes',
      'payload.state',
      'payload.zipCode',
      'payload.zoning',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload from nested uni-form model');
  });
});

test('payload with nested uni-form model with plain object payload',
function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: store.createRecord('uni-form', {
        payload: { someKey: 'someValue' },
      }),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'payload',
      'payload.someKey',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      `contains correct payloadKeys from payload from
      nested uni-form model with plain object payload`);
  });
});

test('payload with double nested uni-form model with ember model payload',
function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: store.createRecord('uni-form', {
        payload: store.createRecord('uni-form', {
          payload: store.createRecord('address'),
        }),
      }),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'payload',
      'payload.payload',
      'payload.payload.addressLine1',
      'payload.payload.addressLine2',
      'payload.payload.city',
      'payload.payload.hasMailbox',
      'payload.payload.notes',
      'payload.payload.state',
      'payload.payload.zipCode',
      'payload.payload.zoning',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload from double nested uni-form model');
  });
});

test('payload with nested model inside plain object', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: {
        plainObjectKey: store.createRecord('payment-method', {
          billingAddress: store.createRecord('address'),
        }),
      },
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'plainObjectKey',
      'plainObjectKey.billingAddressSameAsShippingAddress',
      'plainObjectKey.cvv',
      'plainObjectKey.expMonth',
      'plainObjectKey.expYear',
      'plainObjectKey.number',
      'plainObjectKey.billingAddress',
      'plainObjectKey.billingAddress.addressLine1',
      'plainObjectKey.billingAddress.addressLine2',
      'plainObjectKey.billingAddress.city',
      'plainObjectKey.billingAddress.hasMailbox',
      'plainObjectKey.billingAddress.notes',
      'plainObjectKey.billingAddress.state',
      'plainObjectKey.billingAddress.zipCode',
      'plainObjectKey.billingAddress.zoning',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload with nested model inside plain object');
  });
});

test('payload with nested model inside ember object', function testPayloadKeys(assert) {
  const subject = this.subject();
  const store = subject.get('store');
  Ember.run(() => {
    const mockModel = store.createRecord('uni-form', {
      payload: Ember.Object.create({
        plainObjectKey: store.createRecord('payment-method', {
          billingAddress: store.createRecord('address'),
        }),
      }),
    });
    assert.ok(mockModel);

    const expectedPayloadKeys = [
      'plainObjectKey',
      'plainObjectKey.billingAddressSameAsShippingAddress',
      'plainObjectKey.cvv',
      'plainObjectKey.expMonth',
      'plainObjectKey.expYear',
      'plainObjectKey.number',
      'plainObjectKey.billingAddress',
      'plainObjectKey.billingAddress.addressLine1',
      'plainObjectKey.billingAddress.addressLine2',
      'plainObjectKey.billingAddress.city',
      'plainObjectKey.billingAddress.hasMailbox',
      'plainObjectKey.billingAddress.notes',
      'plainObjectKey.billingAddress.state',
      'plainObjectKey.billingAddress.zipCode',
      'plainObjectKey.billingAddress.zoning',
    ];
    assert.deepEqual(mockModel.get('payloadKeys'), expectedPayloadKeys,
      'contains correct payloadKeys from payload with nested model inside ember object');
  });
});

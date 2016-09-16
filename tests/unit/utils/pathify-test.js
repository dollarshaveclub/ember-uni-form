import pathify from 'ember-uni-form/utils/pathify';
import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('util:pathify', {
  beforeEach() {
    this.mockStore = {
      createRecord() {},
      deleteRecord() {},
    };
  },
});

test('when payload is an object', function testObjectPayload(assert) {
  const mockObject = Ember.Object.extend({});
  const obj = mockObject.create({
    someKey: 0,
    someOtherKey: {
      someInnerKey: {
        someInnerInnerKey: 'wow',
      },
    },
    someOuterKey: 'someOuterKeyValue',
  });
  const result = pathify(obj, this.mockStore);
  assert.ok(result);

  const expectedPayloadKeys = [
    'someKey',
    'someOtherKey',
    'someOtherKey.someInnerKey',
    'someOtherKey.someInnerKey.someInnerInnerKey',
    'someOuterKey',
  ];
  assert.deepEqual(result, expectedPayloadKeys, 'it returns correct payloadKeys');
});

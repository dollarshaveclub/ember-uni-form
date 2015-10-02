import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('uni-form', {
  needs: [ 'model:uni-form-field' ],
  unit: true,
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

import messagePriority from '../../../utils/message-priority';
import { module, test } from 'qunit';

var ERROR_PRIORITY = 50;

module('util:message-priority');

test('it should return message.priority when set', function (assert) {
  assert.equal(messagePriority({ priority: 42 }), 42);
});

test('it should return defined priority for message.tone', function (assert) {
  assert.equal(messagePriority({ tone: 'error' }), ERROR_PRIORITY);
});

test('it should return 0 otherwise', function (assert) {
  assert.equal(messagePriority({ tone: 'sdnfsdkjvcnbsdjkl' }), 0);
});

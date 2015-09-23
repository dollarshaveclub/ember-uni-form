import Ember from 'ember';
import TriggersChangeMixin from '../../../mixins/triggers-change';
import { module, test } from 'qunit';

module('mixin:triggers-change');

// Replace this with your real tests.
test('it works', function(assert) {
  var TriggersChangeObject = Ember.Object.extend(TriggersChangeMixin);
  var subject = TriggersChangeObject.create();
  assert.ok(subject);
});

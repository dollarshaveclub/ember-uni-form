import Ember from 'ember'
import TriggersChange from 'ember-uni-form/mixins/triggers-change'
import { module, test } from 'qunit'

module('mixin:triggers-change')

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(TriggersChange).create())
})

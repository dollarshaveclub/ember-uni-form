import Ember from 'ember'
import DebouncesInputValue from 'ember-uni-form/mixins/debounces-input-value'
import { module, test } from 'qunit'

module('mixin:debounces-input-value')

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(DebouncesInputValue).create())
})

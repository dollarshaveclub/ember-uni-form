import Ember from 'ember'
import HasFieldStatus from 'ember-uni-form/mixins/has-field-status'
import { module, test } from 'qunit'

module('mixin:has-field-status')

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(HasFieldStatus).create())
})

test('it should set focus on focusIn and reset it on focusOut', function (assert) {
  var subject = Ember.Object.extend(HasFieldStatus).create()
  subject.focusIn()
  assert.equal(subject.get('focus'), true)
  subject.focusOut()
  assert.equal(subject.get('focus'), false)
})

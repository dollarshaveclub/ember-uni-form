import Ember from 'ember';
import HasFieldStatus from 'ember-uni-form/mixins/has-field-status';
import { module, test } from 'qunit';

module('mixin:has-field-status');

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(HasFieldStatus).create());
});

import Ember from 'ember';
import FindsParentForm from 'ember-uni-form/mixins/finds-parent-form';
import { module, test } from 'qunit';

module('mixin:finds-parent-form');

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(FindsParentForm).create());
});

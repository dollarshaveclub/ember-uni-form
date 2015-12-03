import Ember from 'ember';
import FindsParentFormView from 'ember-uni-form/mixins/finds-parent-form-view';
import { module, test } from 'qunit';

module('mixin:finds-parent-form-view');

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(FindsParentFormView).create());
});

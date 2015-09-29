import Ember from 'ember';
import FindsParentFormMixin from 'ember-uni-form/mixins/finds-parent-form';
import { module, test } from 'qunit';

module('mixin:finds-parent-form');

// Replace this with your real tests.
test('it works', function(assert) {
  var FindsParentFormObject = Ember.Object.extend(FindsParentFormMixin);
  var subject = FindsParentFormObject.create();
  assert.ok(subject);
});

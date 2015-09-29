import Ember from 'ember';
import FindsFieldByNameMixin from 'ember-uni-form/mixins/finds-field-by-name';
import { module, test } from 'qunit';

module('mixin:finds-field-by-name');

// Replace this with your real tests.
test('it works', function(assert) {
  var FindsFieldByNameObject = Ember.Object.extend(FindsFieldByNameMixin);
  var subject = FindsFieldByNameObject.create();
  assert.ok(subject);
});

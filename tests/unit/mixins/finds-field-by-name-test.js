import Ember from 'ember';
import FindsFieldByName from 'ember-uni-form/mixins/finds-field-by-name';
import { module, test } from 'qunit';

module('mixin:finds-field-by-name');

test('it works', function (assert) {
  assert.ok(Ember.Object.extend(FindsFieldByName).create());
});

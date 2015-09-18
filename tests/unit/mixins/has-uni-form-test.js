import Ember from 'ember';
import HasUniFormMixin from '../../../mixins/has-uni-form';
import { module, test } from 'qunit';

module('mixin:has-uni-form');

// Replace this with your real tests.
test('it works', function(assert) {
  var HasUniFormObject = Ember.Object.extend(HasUniFormMixin);
  var subject = HasUniFormObject.create();
  assert.ok(subject);
});

import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('uni-form', {
  needs: [ 'model:uni-form-field' ],
  unit: true,
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

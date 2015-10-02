import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('uni-form-field', {
  needs: [ 'model:uni-form' ],
});

test('it should have "form", a belongsTo relationship to a uni-form', function(assert) {
  var UniFormField = this.store().modelFor('uni-form-field');
  var relationship = Ember.get(UniFormField, 'relationshipsByName').get('form');
  assert.equal(relationship.type, 'uni-form');
  assert.equal(relationship.kind, 'belongsTo');
});

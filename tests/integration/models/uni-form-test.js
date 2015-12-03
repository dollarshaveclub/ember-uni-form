import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForModel('uni-form', {
  integration: true
});

//
// Dynamic binding
//

test('it should add client error messages when validationErrors change', function (assert) {
  this.subject({ payloadKeys: [ 'color' ], payload: {
    validationErrors: Ember.Object.create({ color: [ 'is ugly' ] })
  } });
  assert.deepEqual(this.subject().get('messages')[0], {
    field: 'color', body: 'is ugly', path: '', source: 'client', tone: 'error'
  });
});

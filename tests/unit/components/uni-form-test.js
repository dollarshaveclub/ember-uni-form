import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('uni-form', {
  unit: true,
  needs: ['service:fastboot'],
});

//
// Content
//

test('it should have class="uni-form"', function (assert) {
  assert.equal(this.$().hasClass('uni-form'), true);
});

test('it renders as a form tag', function (assert) {
  assert.equal(this.$().prop('tagName'), 'FORM');
});

//
// Submit
//

test('it should preventDefault on the submit event', function (assert) {
  assert.expect(1);
  this.subject().submit({ preventDefault: () => assert.ok(true) });
});

test('it should not choke if submit is called without an event', function (assert) {
  assert.expect(0);
  this.subject().submit();
});

test('it should call attrs.action on submit when there is no validation', function (assert) {
  assert.expect(1);
  this.subject({ action: () => assert.ok(true), form: { payload: {} } });
  this.subject().submit().then(assert.async());
});

test('it should call attrs.action on submit when validation succeeds', function (assert) {
  assert.expect(1);
  this.subject({ action: () => assert.ok(true), form: { payload: { validate: () => new Ember.RSVP.Promise(resolve => resolve()) } } });
  this.subject().submit().then(assert.async());
});

test('it should set submitFailed on submit when model.validate fails', function (assert) {
  this.subject({ action: () => assert.ok(true), form: { payload: { validate: () => new Ember.RSVP.Promise((resolve, reject) => reject()) } } });
  var done = assert.async();
  this.subject().submit().then(() => {
    assert.equal(this.subject().get('submitFailed'), true);
    done();
  });
});

test('it should not call attrs.action on submit when model.validate fails', function (assert) {
  assert.expect(0);
  this.subject({ action: () => assert.ok(true), form: { payload: { validate: () => new Ember.RSVP.Promise((resolve, reject) => reject()) } } });
  this.subject().submit().then(assert.async());
});

test('it should call attrs.action on submit when model.validate fails and submitWithErrors is set', function (assert) {
  assert.expect(1);
  this.subject({ action: () => assert.ok(true), form: { payload: { validate: () => new Ember.RSVP.Promise((resolve, reject) => reject()) } }, submitWithErrors: true });
  this.subject().submit().then(assert.async());
});

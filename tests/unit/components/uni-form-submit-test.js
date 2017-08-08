import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('uni-form-submit', {
  unit: true,
  needs: ['service:fastboot'],
})

//
// Content
//

test('it should have class="uni-form-submit"', function (assert) {
  assert.equal(this.$().hasClass('uni-form-submit'), true)
})

test('it should have type="submit"', function (assert) {
  assert.equal(this.$().attr('type'), 'submit')
})

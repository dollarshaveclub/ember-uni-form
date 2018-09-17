import { test } from 'qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'

moduleForAcceptance('acceptance:uniform')

test('visiting /payment-method', function (assert) {
  visit('/payment-method')

  andThen(function () {
    assert.equal(currentURL(), '/payment-method', 'it should not break acceptance tests')
  })
})

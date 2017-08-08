import Ember from 'ember'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('triggers-change', {
  integration: true,
})

test('it should trigger DOM node change event on didInsertElement', function testTrigger (assert) {
  const done = assert.async()
  this.set('x', 'initial')
  this.render(hbs`{{ triggers-change changeTriggerInterval=1 triggerUnderTest=true }}`)
  this.$('.triggers-change').on('change', () => this.set('x', 'updated via change event on DOM node'))
  Ember.run.later(() => {
    assert.equal(this.get('x'), 'updated via change event on DOM node')
    done()
  }, 2)
})

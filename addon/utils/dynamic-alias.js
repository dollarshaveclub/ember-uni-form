import Ember from 'ember';

export default function dynamicAlias (target, keyKey) {
  var prefix = target ? `${target}.` : '';
  var dynamicAliasKey = `${prefix}${keyKey}_alias`;
  return Ember.computed(function () {
    var key = `${prefix}${this.get(keyKey)}`;
    Ember.defineProperty(this, dynamicAliasKey, Ember.computed.alias(key));
    return this.get(key);
  }).property(keyKey, dynamicAliasKey);
}

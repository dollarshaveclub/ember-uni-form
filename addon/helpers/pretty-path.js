import Ember from 'ember';

export function prettyPath(params/*, hash*/) {
  if (!params[0]) return;
  return params[0].replace('.', ' ').dasherize().split('-').map(s => s.capitalize()).join(' ');
}

export default Ember.HTMLBars.makeBoundHelper(prettyPath);

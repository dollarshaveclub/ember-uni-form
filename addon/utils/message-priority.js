//
// A `message` has a field, body, source, tone and priority.
//
// ```javascript
// var msg = {
//   field: 'email',
//   body: 'Please enter a valid email address.',
//   path: 'childModel',
//   source: 'client',
//   tone: 'error',
//   priority: 50,
// };
// ```
var TONE_PRIORITY_MAP = {
  error: 50,
  warning: 40,
  success: 30,
  info: 20,
  muted: 10,
};

export default function messagePriority (message) {
  var m = message || {};
  return m.priority || TONE_PRIORITY_MAP[m.tone] || 0;
}

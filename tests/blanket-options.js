/* globals blanket, module */

var options = {
  modulePrefix: 'ember-uni-form',
  filter: '//.*ember-uni-form/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    lcovOptions: {
      outputFile: 'lcov.dat',
      renamer: function (moduleName) { return moduleName.replace(/^ember-uni-form/, 'addon') + '.js' }
    },
    reporters: ['lcov'],
    autostart: true
  }
}
if (typeof exports === 'undefined') {
  blanket.options(options)
} else {
  module.exports = options
}

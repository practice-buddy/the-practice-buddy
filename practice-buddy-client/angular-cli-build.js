/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.+(js|js.map)',
      'systemjs/dist/system.src.+(js|js.map)',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.+(js|js.map)',
      'reflect-metadata/*.{js,js.map}',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'ng2-dragula/**/*.js',
      'dragula/dist/dragula.js',
      'dragula/dist/dragula.css',
      'lodash/**/*.js',
      'showdown/dist/showdown.min.+(js|js.map)',
      'ng2-file-upload/**/*.+(js|js.map)'
    ]
  });
};

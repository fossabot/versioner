"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;

var _commander = _interopRequireDefault(require("commander"));

var _Versioner = require("./../Versioner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function define() {
  /*  program
       .command('bump <part>')
       .description('bump a part [patch, minor, or major] in the version')
       .option('-u --update', 'update the bumped version')
       .action((part, options) => {        
           
           version(part, options);
       }); */
  _commander["default"].command('get').description('Get the current version').option('-u --update', 'update the version').option('-b --bump <part>', 'bump a part of the version [patch, minor, or major]').action(function (options) {
    version(options);
  });
}

function version(opts) {
  var versioner = new _Versioner.Versioner("versioner.json", 'development');

  if (!!opts.bump) {
    var bump = {
      build: function build() {
        return versioner.build();
      },
      patch: function patch() {
        return versioner.patch();
      },
      minor: function minor() {
        return versioner.minor();
      },
      major: function major() {
        return versioner.major();
      }
    };
    bump[opts.bump]();
  }

  if (opts.update) {
    versioner.update();
  }

  var v = versioner.release.ToString();
  console.log("".concat(v, "-").concat(versioner.env.config.suffix, ".").concat(versioner.env.config.build));
}
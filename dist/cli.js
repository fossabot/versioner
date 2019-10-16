/* 
        NOTICE NOTICE NOTICE 
                         
        THIS IS AN AUTOMATICALLY GENERATED FILE BY GULP
        DO NOT EDIT THIS FILE DIRECTLY
        MAKE EDITS TO THE SAME FILE LOCATED IN THE 'SRC' FOLDER
    */

"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import { runCommand, getCLIArgument, isNullUndefinedOrEmpty, getFullFilePath }  from './utilities';
//import path from 'path';
var cli = function cli(arg) {
  switch (arg) {
    case 'init':
      newProject();
      break;

    case 'inc':
      increment();
      break;

    case 'releases':
      createReleaseBranches();
      break;

    default:
      console.log('The following are your options:\n\t init \n\t inc \n\t releases');
      break;
  }
};

module.exports.cli = cli;

var _require = require("./Versioner"),
    Versioner = _require.Versioner;

var _require2 = require('./Models'),
    VersionModel = _require2.VersionModel;

var _require3 = require('./custom-utils'),
    checkIfBranchExists = _require3.checkIfBranchExists,
    createBranch = _require3.createBranch,
    isEmpty = _require3.isEmpty;

var verbose = false; // reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

function increment() {
  var versioner = new Versioner("versioner.json", 'development');
  versioner.env.increment();
  versioner.update();

  if (verbose) {
    console.log(versioner.data);
    console.log(versioner.version());
    console.log(versioner.release);
  }
}

function newProject() {
  _commander["default"].option('-p, --project <p>', 'Name of your project').parse(process.argv);

  var project = _commander["default"].project;
  console.log(project);

  if (!project) {
    _commander["default"].help(function (help) {
      return _colors["default"].red('\nmissing required arguments!\n\n') + help;
    });

    return;
  }

  console.log(project);
  Versioner.init(project);
}

function createReleaseBranches() {
  var _ref = new Versioner("versioner.json", 'development'),
      release = _ref.release,
      data = _ref.data;

  var project = data.project;
  var patch = new VersionModel(release);
  patch.patch++;
  var minor = new VersionModel(release);
  minor.minor++;
  var major = new VersionModel(release);
  major.major++;
  var releases = [patch.ToString(), minor.ToString(), major.ToString()];
  releases.forEach(function (v, i, e) {
    var releaseBranch = isEmpty(project) ? "release/".concat(v) : "release/".concat(project, "/").concat(v);
    checkIfBranchExists(releaseBranch, function () {
      return console.log("".concat(releaseBranch, " already exists"));
    }, function () {
      createBranch(releaseBranch, function () {
        return console.log("".concat(releaseBranch, " was created"));
      });
    });
  });
}
/* function gitaddremote() {
        
    program
    .option('-n, --nickname <n>', 'Give the nickname for the remote repo')
    .option('-u, --url <u>', 'Give the url that points to the remote repo')
    .parse(process.argv); 
        
    let nickname = program.nickname;
    let url = program.url;

    if (!nickname || !url) {
        program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
    }
    
    try {
        let command = `
            git checkout master &&
            git remote add ${nickname} ${url} &&
            git fetch ${nickname} &&
            git pull ${nickname} master --allow-unrelated-histories &&
            git branch -u ${nickname}/master master &&
            git add *
            git push
        `;

        runCommand(command, cb);
    }
    catch {
        let command = `
            git remote add ${nickname} ${url}
            git push -u ${nickname} master
        `;

        runCommand(command, cb);
    }
    
} */
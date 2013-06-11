'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WhatupGenerator = module.exports = function WhatupGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WhatupGenerator, yeoman.generators.Base);

WhatupGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n    Yo, Whatup?!' +
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'projectName',
    message: 'Whatup - what you wanna call your project?',
    default: 'myProject'
  }, {
    name: 'ghAcct',
    message: 'Whatup - enter your GitHub screen name',
    default: "brocksampson"
  },{
    name: 'useLess',
    message: 'Whatup - you wanna use LESS?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  }, {
    name: 'testFramework',
    message: 'Whatup - you wanna use Jasmine or qUnit?',
    default: 'jasmine'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.projectName = props.projectName;
    this.useLess = (/y/i).test(props.useLess);
    this.ghAcct = props.ghAcct;
    this.testFramework = props.testFramework.toLowerCase();

    cb();
  }.bind(this));
};

WhatupGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  // LESS support
  if(this.useLess){
    this.mkdir('less');
  }

  // test frameworks
  this.testFw = {
    name: "grunt-contrib-jasmine",
    version: "~0.4.2"
  }

  if(this.testFramework === "qunit"){

    this.testFw.name = "grunt-contrib-qunit",
    this.testFw.version = "~0.1.0"
  } else if(this.testFramework !== "jasmine"){

    console.log("I don't know what " + this.testFramework + " is, so I'm going to default to Jasmine");
  }


  this.copy('_bower.json', 'bower.json');
};

WhatupGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

WhatupGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};

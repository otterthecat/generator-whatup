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

    cb();
  }.bind(this));
};

WhatupGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  if(this.useLess){
    this.mkdir('less');
  }

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

WhatupGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

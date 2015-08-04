'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
//var generators = require('yeoman-generator');
//var glob = require('glob');
//var slugify = require('underscore.string/slugify');

module.exports = yeoman.generators.Base.extend({

    prompting: {
        index: function () {
          // Have Yeoman greet the user.
          this.log(yosay(
            'Welcome to the laudable ' + chalk.red('Yebo') + ' generator!'
          ));

            var done = this.async();

            var prompts = [{
                type: 'confirm',
                name: 'someOption',
                message: 'Would you like to enable this option?',
                default: true
            }];

            this.prompt(prompts, function (props) {
              this.props = props;
              // To access props later use this.props.someOption;
              done();
            }.bind(this));
        },

        database: function () {

            var done = this.async();

            var prompt = [{
                type: 'list',
                name: 'database',
                message: 'Select a database to use:',
                choices: [
                  'None',
                  'MongoDB (not yet supported)'
            ],
            store: true
            }];

            this.prompt(prompt, function (response) {
            this.props.database = response.database.toLowerCase();
            done();
            }.bind(this));
        },
    },

    writing: {
        folders: function () {
          this.fs.copy(
            this.templatePath('/bin'),
            this.destinationPath('/bin')
          );
          this.fs.copy(
            this.templatePath('/models'),
            this.destinationPath('/models')
          );
          this.fs.copy(
            this.templatePath('/public'),
            this.destinationPath('/public')
          );
          this.fs.copy(
            this.templatePath('/routes'),
            this.destinationPath('/routes')
          );
          this.fs.copy(
            this.templatePath('/views'),
            this.destinationPath('/views')
          );
        },

        rootfiles: function () {
          this.fs.copy(
            this.templatePath('app.js'),
            this.destinationPath('app.js')
          );
          this.fs.copy(
            this.templatePath('config.js'),
            this.destinationPath('config.js')
          );
          this.fs.copy(
            this.templatePath('deploy.md'),
            this.destinationPath('deploy.md')
          );
          this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
          );
        },

        projectfiles: function () {
          this.fs.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
          );
        }
    },

    install: function () {
        // this.installDependencies();

          // Have Yeoman tell the user to run npm install.
          this.log(yosay(
            'please run ' + chalk.red('npm install')
          ));
    }
});

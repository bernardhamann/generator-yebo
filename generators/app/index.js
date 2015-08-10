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
            this.templatePath('/'),
            this.destinationPath('/')
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

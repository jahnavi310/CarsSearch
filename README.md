# Cars Search App
A single page app that uses json for data and is built with AngularJS, Node and Browserify, where Gulp is the task runner.


## Installing
Before running, you must install and configure the following one-time dependencies:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [gulp.js](http://gulpjs.com/) - use the terminal command below
```bash
$ npm install -g gulp
```

Once the dependencies have been installed, enter the following in the terminal:
```bash

$ cd CarsSearchApp
$ npm install
```
## Running
Enter the following in the terminal:
```bash
$ gulp
$ gulp clean - cleans the dist files
```
## Running your tests
```$ gulp test``` - runs the protractor e2e tests.
After installing gulp and nodejs run the above command to fire up up your e2e tests.
The default browser used in the protractor conf file is chrome, if you do not have the chrome browser instance installed you will recieve the following error:
'Could not find chromedriver instance'

If you see this in the console please run the following command:
node_modules/protractor/bin/webdriver-manager update

## Local Server URL:Port
```
http://localhost:4000
```
## Main Purpose of the App
Get acquainted with angular and nodeJS, make a responsive single page app. 
Get acquainted with protractor for e2e testing.

What is protractor?
http://angular.github.io/protractor/#/

Stay tuned... more to COME!!!

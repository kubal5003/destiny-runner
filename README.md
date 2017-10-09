# Destiny Runner (GUI for Karma)


This package attempts to create a GUI runner for karma. The author doesn't  really like the default console runner and hence attempt to do something better.

![Screen from Destiny](https://raw.githubusercontent.com/kubal5003/destiny-runner/master/destiny-screen.png)

###Warning!
This is a pre-alpha version. This package will not work (yet..)

###Contributions wanted!

This project is currently in its infancy and any contribution is very much wanted & appreciated. Very soon a liberal contribution policy will be adopted.
If you want to contribute, please read the list below, let me know that you start working on something & go, go, go!


###Road to MVP (1.0)

The MVP is currently defined as - let Destiny be a drop-in replacement for a console reporter/logger, only more usable one.

This includes:

 - be able to display a list of tests executed by Karma in the hierarchical order
 - be able to process updates from subsequent runs
 - be able to handle multiple browsers in separate tabs
 - when Destiny is run Karma should start as well as browser window should open with the GUI
 - compatibility matrix with Karma versions should be made and dependencies in package.json adjusted accordingly
 - currently only Jasmine will be supported, Mocha is nice to have
 - test restart should be possible from Destiny, without resorting to Karma owned browser (refresh button)
 - all the logs from browser console should be available on test level & stack trace for failed tests
 - there should be a simple filtering for tests (name, describe, success/fail/skip)
 - there should be a nice way to run Destiny after it is installed i.e. npm run destiny or just destiny
 
 
 Ideally you should be able to run destiny with a headless browser and work on your project.
 
 
 ###Ideas for the future
  
  - Be able to schedule a re-run of only one test / one-suite / multiple-suites. It should render the fdescribe/fit source modification obsolete!
  (most likely requires changes in Karma)
  - Display test coverage reports with detailed information (Karma already provides this info when istanbul loader is being used)
  - More advanced / smarter filtering for tests
  - Calculating suite results based on all the test results (like any test runner does..)
  - Better UI/UX ?
  
 
 
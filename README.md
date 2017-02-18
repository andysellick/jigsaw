Canvas Jigsaw
=============

Prototype of a canvas jigsaw game, put together in a few hours. Can be configured to handle any size of jigsaw with any image, if required.

Working demo here: http://www.custarddoughnuts.co.uk/jigsaw

Further information here: http://custarddoughnuts.co.uk/article/2017/3/9/javascript-jigsaw-puzzle

Use of Gulp
------------

There is a `gulpfile.js` within this repository to make development much quicker for the house styles. All you need to do is:

* Install Node (http://nodejs.org) & Gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)  
* Run `npm run setup`  

This will install all the dependencies found in `package.json` (The `node_modules` folder that is generated when you run this command should be created on a case-by-case basis and not pushed to a repository), install the Bower dependencies found in `package.json` and run the local server through the `gulp` command.

Note for Windows users with Git Bash: you may need to run 'npm run setup' a couple of times for it to finally work.
  
This will open up a tab in your browser, running a server at `localhost:3000` (unless you have set up a proxy server address - details on how to change this are in the `gulpfile.js` file).


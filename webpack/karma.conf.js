var webpackConfig = require('./webpack.config.test');
var argv = require('yargs').argv;
module.exports = function (config) {

  if (argv.test) {
    reporters = ['kjhtml', 'progress', 'spec', 'coverage'];
  } else {
    reporters = ['kjhtml'];
  }
  var _config = {
    basePath: './',

    frameworks: ['jasmine'],

    files: [
      "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
      { pattern: "./src/**/*.spec.js", type: "module", included: true },
      { pattern: "./src/**/*.js", type: "module", included: true }
    ],

    preprocessors: {
      './src/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    exclude: [],

    //reporters: ['kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    reporters: reporters,
    junitReporter: {
      outputDir: 'reporters/test-report/', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined // if included, results will be saved as $outputDir/$browserName/$outputFile
    },

    coverageReporter: {
      includeAllSources: true,
      // instrumenterOptions: {
      //   istanbul: { noCompact: true }
      // },
      reporters: [
        {
          dir: 'reporters/coverage/',
          subdir: '.',
          type: 'html'
        }, {
          dir: 'reporters/coverage/',
          subdir: '.',
          type: 'cobertura'
        }, {
          dir: 'reporters/coverage/',
          subdir: '.',
          type: 'json'
        }, {
          dir: 'reporters/coverage/',
          subdir: '.',
          type: 'lcovonly',
          file: 'coverage.lcov'
        }
      ]
    },

  };

  config.set(_config);
};

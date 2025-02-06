import { Config } from 'karma';

module.exports = function (config: Config & any) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      clearContext: false // Mantiene los resultados de pruebas visibles en la UI de Karma
    },
    coverageReporter: {
      type: 'lcov',
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      file: 'lcov.info'
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
};
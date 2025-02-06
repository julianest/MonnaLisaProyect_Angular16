
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter')
    ],
    client: {
      clearContext: false
    },
    reporters:['progress','sonarqube', 'coverage'],
    browser:['Chrome'],
    coverageReporter: {
      type: 'lcov',
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      file: 'lcov.info'
    },
    sonarqubeReporter: {
      basePath: 'src/app',
      outputFolder: 'reports',
      filePattern: '**/*spec.ts',
      //filePattern: '**/*.xml', // Asegúrate de que se esté generando un archivo .xml
      encoding: 'utf-8',
      legacyMode: false,
      reportName: () => {
        return 'sonar_report.xml';
      }
    },
    singleRun: true,
    customLaunchers:{
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true
  });
};

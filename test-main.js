var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var testModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(testModule);
    }
});
require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',
    waitSeconds: 0,
    packages: [
        {
            name: '@syncfusion/ej2-base',
            location: 'node_modules/@syncfusion/ej2-base',
            main: 'index.js'
        },
        {
            name: '@syncfusion/ej2-data',
            location: 'node_modules/@syncfusion/ej2-data',
            main: 'index.js'
        }
        // Include dependent packages
    ],

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

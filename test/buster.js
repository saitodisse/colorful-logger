var config = module.exports;

config['Mogger Tests'] = {
    environment: 'node',  // or 'browser'
    rootPath: '../',
    sources: [
        'src/colorful-logger.js'
    ],
    tests: [
        'test/*.test.js'
    ]
};
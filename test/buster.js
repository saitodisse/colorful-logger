/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * ColorfulLogger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 */

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
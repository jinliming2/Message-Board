/**
 * Created by Liming on 2017/3/28.
 */
"use strict";
let path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        [__dirname, 'src', 'app', 'index.js'].join(path.sep)
    ],
    resolve: {
        modulesDirectories: ['node_modules']
    },
    output: {
        path: [__dirname, 'build'].join(path.sep),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel?presets[]=react,presets[]=es2015'
            }
        ]
    }
};

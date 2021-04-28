var path = require('path');

module.exports = {
    devtool: "source-map",
    entry:  "./src/index.tsx",
    cache: true,
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: '../../src/main/resources/static/built/bundle.js'
    },
};


const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

let config = {
    devtool: "source-map",
    entry: resolveAppPath('src'),
    cache: true,
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
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(ico|jpe?g|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                loader: "file-loader"
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html'),
        })
    ]
};


module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.mode = 'development';
        config.output = {
            filename: 'static/js/bundle.js',
        };
        config.devServer = {
            // Serve index.html as the base
            contentBase: resolveAppPath('public'),

            // Enable compression
            compress: true,

            // Enable hot reloading
            hot: true,

            host,
            port: 3000,

            proxy: {
                '/api': 'http://localhost:8080',
            },

            // Public path is root of content base
            publicPath: '/'
        }
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
        config.output = {
            filename: '../../src/main/resources/static/built/bundle.js'
        };
    }
    return config;
};

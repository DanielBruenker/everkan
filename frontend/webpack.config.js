const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

let config = {
    devtool: "source-map",
    entry: "./src/index.tsx",
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
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.(ico|jpe?g|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                use: "file-loader"
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ]
};


module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.output = {
            path: path.resolve( __dirname, 'dist' ),
            filename: 'main.js',
            publicPath: '/',
        };
    }

    if (argv.mode === 'production') {
        config.output = {
            filename: '../../src/main/resources/static/built/bundle.js'
        };
    }
    return config;
};


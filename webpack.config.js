const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },

    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.ts',
            '.tsx',
            '.js',
            '.scss',
            '.css',
            '.ttf',
            '.dtd',
            '.svg',
            '.eot',
            '.woff2',
            '.woff'
        ]
    },
    module: {

        loaders: [

            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.(ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                }
            },
            {
                test: /\.woff2?$/,
                // Inline small woff files and output them below font/.
                // Set mimetype just in case.
                loader: 'url-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 50000,
                    mimetype: 'application/font-woff',
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ],

    },
    plugins: [
        // new Webpack.optimize.UglifyJsPlugin(),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new Webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};

module.exports = config;

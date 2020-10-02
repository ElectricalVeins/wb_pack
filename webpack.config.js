const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const bundlePath = path.resolve(__dirname, 'bundle')

module.exports = {
    context: path.resolve(__dirname, 'src/assets/js'), // context for the entry point
    entry: './index.js', // entry point of the js
    output: {
        filename: '[contenthash].bundle.js', //main output js file
        path: bundlePath, // path to output folder
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }), // to extract style into the separate file

        new webpack.ProgressPlugin(), // show build progress

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }), // to insert html into the build

        new CleanWebpackPlugin(), // to clean the bundle folder on rebuild
    ],
    devServer: {
        contentBase: bundlePath,
        port: 9000,
        open: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
}

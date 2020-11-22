/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
    const isDevServer = env.isDevServer || false;
    return {
        entry: {
            main: './src/app/app-main.tsx',
        },
        devtool: 'inline-source-map',
        mode: 'development',
        module: {
            rules: [{
                test: /\.(ts|js)x?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    }
                }],
                exclude: [/node_modules/, /src\/server/]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.pug/,
                loader: 'pug-loader',
            }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', 'scss'],
            alias: {
                'src': path.resolve(__dirname, 'src')
            }
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist/app'),
            publicPath: isDevServer ? '' : '/assets'
        },
        optimization: {},
        devServer: {
            port: 9090,
        },
        plugins: [
            new Dotenv({
                systemvars: true
            }),
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/app/main.html',
                filename: 'index.html'
            })
        ],
    }
};
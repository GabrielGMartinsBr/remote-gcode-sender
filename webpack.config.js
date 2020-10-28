const Dotenv = require('dotenv-webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = (env = {}) => {
    const isDevServer = env.isDevServer || false;
    console.log({isDevServer})
    return {
        entry: {
            main: './src/app/index.ts',
        },
        devtool: 'inline-source-map',
        mode: 'development',
        module: {
            rules: [{
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
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
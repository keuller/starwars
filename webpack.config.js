let path = require('path')
let webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')

let extractCSS = new ExtractTextPlugin("css/app.css")
  , extractSCSS = new ExtractTextPlugin("css/theme.css")

let config = {
    entry: {
        bundle: path.join(__dirname, 'src/web/index.js'),
        runtime: ['react', 'react-dom'],
        vendor: ['redux', 'react-redux', 'redux-observable']
    },

    output: {
        path: path.join(__dirname, 'public', 'dist'),
        publicPath: '/public/dist/',
        filename: '[name].js'
    },

    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: extractCSS.extract([ 'css-loader' ])
        }, {
            test: /\.sass$/,
            use: extractSCSS.extract([ 'css-loader', 'sass-loader' ])
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }
        ]
    },

    resolve: {
        modules: ['src/web', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    devServer: {
        historyApiFallback: true,
        port: '8000',
        noInfo: true
    },

    devtool: '#eval-source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['public/dist']),
        extractSCSS,
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: ['runtime', 'vendor'],
            warnings: false
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.devtool = '#source-map'
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    ])
}

module.exports = config

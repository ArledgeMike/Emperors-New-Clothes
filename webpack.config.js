const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/serverConfig');

const PATHS = {
    app: path.join(__dirname, 'app'),
    css: path.join(__dirname, 'app/public'),
    build: path.join(__dirname, 'build')
}

const common = {
    entry:{
        app:PATHS.app
    },
    output:{
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'The Emporers new clothes'
        })
    ]
}

var config = {
    output:{
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate:'webpack:///[resource-path]?[loaders]'
    }
};

switch(process.env.npm_lifecycle_event){
    case 'build' :
        config = merge(
            common,
            {
                devtool: 'source-map'
            },
            parts.css(PATHS.css)
        );
        break;
    default:
        config = merge(
            common,
            parts.css(PATHS.css), 
            {
                devtool: 'eval-source-map'
            },
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'stepextensionocgapifeaturesaction',
      filename: 'remoteEntry.js',
      exposes: {
        './InputUrl': './src/InputUrl',
        './CollectionsDropDown': './src/CollectionsDropDown',
        './DynamicInputs': './src/DynamicInputs',
        './OGCForm': './src/OGCForm',
      },
      shared: ['react', 'react-dom'],
    }),
 /*   new WebpackRemoteTypesPlugin({
      remotes: {
        kaoto: 'kaoto@http://localhost:1337/',
      },
      outputDir: './src/types',
      remoteFileName: '[name]-dts.tgz',
    }),*/
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

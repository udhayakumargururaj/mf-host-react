const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/', // Adjust the public path as needed
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add support for JSX files
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'host', // Name of the host application
      filename: 'remoteEntry.js',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js', // Name and URL of the remote application
      },
      shared: {
        react: { singleton: true,requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true,requiredVersion: '^17.0.2' },
      },
    }),
  ],
};

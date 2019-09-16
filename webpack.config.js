var path = require('path');
//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    // entry: './src/index.js',
    // output: {
    //   filename: 'bundle.js',
    // },
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },     
      {
        test: /\.s?css$/,
        use: [{ loader: 'style-loader'}, { loader: 'css-loader'}, { loader: 'sass-loader'}],
        exclude: /node_modules/,
      }
    ]
  },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       filename: "./index.html"
//     })
//   ],
//   resolve: {
//     extensions: [".js", ".jsx"]
//   },
//   watch: true,
};
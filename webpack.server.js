const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
};

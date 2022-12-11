const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Config file for webpack bundling.
 * Configures how and where webpack will build the source code:
 *  - produces 2 js bundles:
 *    - main: where our own source js code is
 *    - pdf.worker: pdf.js worker needed by pdf.js library
 *  - for html files it just copies them with the correct refrences
 *  - for css we use 'mini-css-extract-plugin' which will for production
 *      build optimzed separate css file and for develpment use a 'css-loader'
 *      to inject jss inline to built html files
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.js",
    "pdf.worker": "pdfjs-dist/build/pdf.worker.entry",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      favicon: "./src/assets/favicon.ico",
    }),
    new Dotenv(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};

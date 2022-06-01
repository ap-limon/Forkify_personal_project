const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizeerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
let devtool = "source-map";
let cssFilename = "main.css";
let jsFilename = "main.js";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  devtool = false;
  cssFilename = "main[contenthash].css";
  jsFilename = "main[contenthash].js";
}

module.exports = {
  mode: mode,
  entry: "./src/js/controller.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Forkify cooking recipe project",
      template: "./index.html",
      favicon: "./src/img/favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: cssFilename,
    }),
  ],
  output: {
    filename: jsFilename,
    assetModuleFilename: "images/[contenthash][ext][query]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: devtool,
  devServer: {
    port: 3030,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizeerPlugin({
        minimizer: {
          implementation: ImageMinimizeerPlugin.squooshMinify,
        },
      }),
    ],
  },
};

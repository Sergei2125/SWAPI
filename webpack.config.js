const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// there are several ways how to use different config setup
// we can use different webpack config files, but in our case
// we use special NODE_ENV variable to distinguish production from development
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  // entry point
  // you can easily omit it, webpack 5 uses the same entry by default
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    // webpack bundle directory output
    path: path.resolve(__dirname, "./dist"),
    // bundle file name according to environment
    filename: dev ? "[name].bundle.js" : "[name].[fullhash].bundle.js",
  },
  module: {
    rules: [
      {
        // regexp to show which files our rules will be applied to
        test: /\.s[ac]ss$/i,
        use: [
          // webpack applies loaders from last to first

          // style-loader (creates `style` nodes from JS strings)
          // takes the string constructed by css-loader and embeds it in the style tag in index.html
          // https://github.com/webpack-contrib/style-loader
          // for production builds it's recommended to extract the CSS from your bundle
          // being able to use parallel loading of CSS/JS resources later on
          // https://github.com/webpack-contrib/mini-css-extract-plugin
          dev ? "style-loader" : MiniCssExtractPlugin.loader,
          // translates CSS into CommonJS
          // interprets @import and url() like import/require() and will resolve them
          "css-loader",
          // compiles SASS to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // variable used in index.html title
      title: "SWAPI",
      // variable used in index.html h1 header
      header: "Dev Incubator CSS to S(C|A)SS",
      // webpack relative or absolute path to the template
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // clean up output folder
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: dev ? "[name].css" : "[name].[fullhash].css",
    }),
  ],
  devServer: {
    // it instructs webpack dev-server to use HMR(hot-module-replacement)
    hot: true,
    // start webpack dev-server on port 4000
    port: 4000,
    // webpack dev-server refreshes page if files change
    watchFiles: ["public/index.html"],
  },
};

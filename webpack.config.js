const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const HWPConfig = [];
// fs.readdirSync(path.resolve(__dirname, "../src/pages")).forEach((file) => {
//   page = new HtmlWebpackPlugin({
//     filename: file.replace(".twig", ".html"),
//     template: path.resolve(__dirname, `../src/pages/${file}`),
//     hash: true,
//   });
//   HWPConfig.push(page);
// });

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.bundle.js",
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          "autoprefixer",
          "css-loader",
          "node-sass",
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.twig$/,
        use: {
          loader: "twig-html-loader",
        },
      },
    ],
  },
  watch: true,
  plugins: [new HtmlWebpackPlugin()],
};

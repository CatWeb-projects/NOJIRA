const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HWPConfig = [];
fs.readdirSync(path.resolve(__dirname, "./TWIG/Pages")).forEach((file) => {
  page = new HtmlWebpackPlugin({
    filename: file.replace(".twig", ".html"),
    template: path.resolve(__dirname, `./TWIG/Pages/${file}`),
    hash: true,
  });
  HWPConfig.push(page);
});

const CssConfig = [];
fs.readdirSync(path.resolve(__dirname, "./SCSS")).forEach((file) => {
  page = new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[id].css",
  });
  CssConfig.push(page);
});

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
  },
  devServer: {
    port: 3000,
    watchContentBase: true,
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              // outputPath: "./CSS",
              // name: "[name].css",
              // path: path.join(__dirname, "./CSS"),
              // filename: file.replace(".scss"),
              // template: path.resolve(__dirname, `./CSS/${file}`),
            },
          },
          "autoprefixer",
          "node-sass",
        ],
      },
      {
        test: /\.twig$/,
        use: {
          loader: "twig-html-loader",
        },
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: "base64-inline-loader?limit=1000&name=[name].[ext]",
      },
    ],
  },
  plugins: [...HWPConfig, ...CssConfig],
};

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

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.twig$/,
        use: [
          "raw-loader",
          {
            loader: "twig-html-loader",
            options: {
              data: {},
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: "base64-inline-loader?limit=1000&name=[name].[ext]",
      },
    ],
  },
  plugins: [
    ...HWPConfig,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

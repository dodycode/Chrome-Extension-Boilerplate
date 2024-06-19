const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    popup: path.resolve("./src/popup/index.tsx"),
    background: path.resolve("./src/background/background.ts"),
    // add
    options: path.resolve("./src/options/index.tsx"),
    "content-script": path.resolve("./src/content/index.tsx"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx/,
        exclude: /node_modules/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                indent: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/i,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "react Chrome extension",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      title: "react Chrome extension",
      filename: "options.html",
      chunks: ["options"],
    }),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
  ],
  output: {
    filename: "[name].js",
  },
  mode: process.env.NODE_ENV || "development",
  devtool:
    process.env.NODE_ENV === "production" ? false : "cheap-module-source-map",
};

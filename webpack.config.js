const path = require("node:path");
const webpackNodeExternals = require("webpack-node-externals");
const { NODE_ENV = "production" } = process.env;

/**
 * @type {import("webpack").Configuration}
 * */
module.exports = {
  entry: "./src/main.ts",
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
  devtool: "source-map",
};

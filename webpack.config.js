const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const libraryTarget = process.env.LIBRARY_TARGET;
const names = {
  var: "json_blob",
  commonjs2: "json_blob.commonjs2"
};

module.exports = {
  entry: `${__dirname}/src/json_blob.js`,
  devtool: "source-map",
  target: "web",
  mode: "production",
  node: {
    fs: "empty"
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: `${names[libraryTarget]}.js`,
    library: "jsonBlob",
    libraryTarget: libraryTarget
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: [`${__dirname}/src/`],
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({sourceMap: true})
  ]
};

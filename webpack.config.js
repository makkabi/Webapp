const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  // Mode wird in dem Script in package.json gesetzt
  const mode = argv && argv.mode;

  return {
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: {
      app: `${__dirname}/js/src/app.js`,
    },
    output: {
      path: `${__dirname}/js/dist`,
      filename: '[name].build.js',
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env']],
              },
            },
          ],
        },
      ],
    },
  };
};

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin([{from: 'src/quizzes/quizzes.yaml'}]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    //https://github.com/gaearon/react-hot-loader/issues/456
    // [HMR] Cannot apply update.
    // [HMR] Error: Aborted because ./src/app.module.ts is not accepted
    // Update propagation: ./src/app.module.ts -> ./src/main.ts
    // 위 오류를 유발함.
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json',
  },
};

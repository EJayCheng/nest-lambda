const path = require('path');
const lazyImports = [
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
];
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (options, webpack) => {
  const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin();
  const ignorePlugin = new webpack.IgnorePlugin({
    checkResource(resource) {
      if (lazyImports.includes(resource)) {
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
      }
      return false;
    },
  });
  return {
    ...options,
    entry: [path.join(__dirname, '/src/index.ts')],
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    mode: 'production',
    target: 'node',
    externals: [],
    plugins: [...options.plugins, ignorePlugin, forkTsCheckerWebpackPlugin],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
};

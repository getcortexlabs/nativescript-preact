const { resolve } = require('node:path');
const webpack = require('@nativescript/webpack');

module.exports = env => {
  webpack.init(env);
  webpack.chainWebpack(config => {
    config.resolve.extensions.prepend('.tsx');
    config.module.rule('ts').test(/\.tsx?$/);
    // The linked adapter and the app must share one copy of each runtime.
    config.resolve.alias
      .set('@nativescript/core', resolve(__dirname, 'node_modules/@nativescript/core'))
      .set('preact', resolve(__dirname, 'node_modules/preact'));
  });
  return webpack.resolveConfig();
};

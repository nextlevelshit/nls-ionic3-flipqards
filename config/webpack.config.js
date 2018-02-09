/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */

const path = require('path');
const webpack = require('webpack');
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ENV = process.env.IONIC_ENV;

const optimizedProdLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.js$/,
    loader: [
      {
        loader: process.env.IONIC_CACHE_LOADER
      },
      {
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: true
        }
      },
    ]
  },
  {
    test: /\.ts$/,
    loader: [
      {
        loader: process.env.IONIC_CACHE_LOADER
      },

      {
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: true
        }
      },

      {
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  }
];

function getProdLoaders() {
  if (process.env.IONIC_OPTIMIZE_JS === 'true') {
    return optimizedProdLoaders;
  }
  return devConfig.module.loaders;
}

const devConfig = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')],
    alias: {
      "@app": path.resolve('./src/app/'),
      "@assets": path.resolve('./src/assets/'),
      "@env": path.resolve(`./src/env/env.dev.ts`),
      "@pages": path.resolve('./src/pages/'),
      "@pipes": path.resolve('./src/pipes/'),
      "@mock": path.resolve('./src/mock.ts'),
      "@theme": path.resolve('./src/theme/'),
      "@entities": path.resolve('./src/entities/'),
    }
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    ionicWebpackFactory.getCommonChunksPlugin(),
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, 'typeorm/browser');
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

const prodConfig = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')],
    alias: {
      "@app": path.resolve('./src/app/'),
      "@assets": path.resolve('./src/assets/'),
      "@env": path.resolve(`./src/env/env.ts`),
      "@pages": path.resolve('./src/pages/'),
      "@pipes": path.resolve('./src/pipes/'),
      "@mock": path.resolve('./src/mock.ts'),
      "@theme": path.resolve('./src/theme/'),
      "@entities": path.resolve('./src/entities/'),
    }
  },

  module: {
    loaders: getProdLoaders()
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    ionicWebpackFactory.getCommonChunksPlugin(),
    new ModuleConcatPlugin(),
    new PurifyPlugin(),
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, 'typeorm/browser');
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = {
  dev: devConfig,
  prod: prodConfig
}

import webpack from 'webpack';
import cssnano from 'cssnano';
import path from 'path';
import argv from 'argv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssImport from 'postcss-import';
import lost from 'lost';
import postcssAssets from 'postcss-assets';


const CLIENT_PATH = __dirname + '/src';
const DIST_PATH = __dirname + '/public';
const COMPILER_PUBLIC_PATH = 'http://client.voutre.llc/';
const ENV = process.env.NODE_ENV || 'development';
const COMPILER_VENDOR = [
  'history',
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
];

const webpackConfig = {
  name: 'client',
  target: 'web',
  resolve: {
    root: CLIENT_PATH,
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = `${CLIENT_PATH}/index`;
webpackConfig.entry = {
  app: [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${COMPILER_PUBLIC_PATH}__webpack_hmr`],
  vendor: COMPILER_VENDOR
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: DIST_PATH,
  publicPath: COMPILER_PUBLIC_PATH
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env'  : {
      'NODE_ENV' : JSON.stringify(ENV)
    },
    'NODE_ENV'     : ENV,
    '__DEV__'      : ENV === 'development',
    '__PROD__'     : ENV === 'production',
    '__TEST__'     : ENV === 'test',
    '__DEBUG__'    : ENV === 'development' && !argv.no_debug,
    '__DEBUG_NEW_WINDOW__' : !!argv.nw,
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
  }),
  new HtmlWebpackPlugin({
    template: `${CLIENT_PATH}/index.html`,
    hash: true,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
];

//Dev plugins
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

// ------------------------------------
// Pre-Loaders
// ------------------------------------
webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}];

webpackConfig.eslint = {
  configFile: '.eslintrc',
  emitWarning: ENV == 'development'
};

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      development: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }]
        ]
      },
      production: {
        plugins: [
          'transform-react-remove-prop-types',
          'transform-react-constant-elements'
        ]
      }
    }
  }
},
{
  test: /\.json$/,
  loader: 'json'
}];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
];

PATHS_TO_TREAT_AS_CSS_MODULES.push(
  CLIENT_PATH.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')
);

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&');

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'postcss'
    ]
  });
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;
webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfig.postcss = function(webpack) {
  return [
    postcssImport({ addDependencyTo: webpack }),
    postcssAssets({ 
      basePath: 'src/assets/',
      loadPaths: ["img/", "fonts/"],
      baseUrl: "http://client.voutre.llc/assets/"
    }),
    lost( ),
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ];
};

webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
);

export default webpackConfig;

// Built from http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html
import gulp from 'gulp';
import util from 'gulp-util';
import source from 'vinyl-source-stream'; // Used to stream bundle for further handling
import browserify from 'browserify';
import watchify from 'watchify';
import envify from 'envify/custom';

const addUglify = bundler => (
  bundler.transform(envify({ NODE_ENV: 'production' }), { global: true })
  .transform('uglifyify', { global: true })
);

const createBundle = (bundler) => {
  bundler.bundle() // Create new bundle that uses the cache for high performance
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public/dist/'));
};

gulp.task('browserify', () => {
  let bundler = browserify({
    entries: ['public/scripts/index.jsx'], // Only need initial file, browserify finds the deps
    debug: true, // Gives us sourcemapping
    cache: {},
    packageCache: {},
    fullPaths: false, // Requirement of watchify
    extensions: ['.js', '.jsx'],
  })
  .transform('browserify-css', { autoInject: true })
  .transform('babelify', { presets: ['es2015', 'react'] });

  if (util.env.production) {
    addUglify(bundler);
  } else {
    bundler = watchify(bundler);

    bundler.on('update', () => { // When any files update
      createBundle(bundler);
    });
  }

  createBundle(bundler);
});

// Just running the two tasks
gulp.task('default', ['browserify']);

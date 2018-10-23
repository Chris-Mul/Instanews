// const gulp = require('gulp'),
//  prettyError = require('gulp-prettyerror'),
//  sass = require('gulp-sass'),
//  autoprefixer = require('gulp-autoprefixer'),
//  rename = require('gulp-rename'),
//  cssnano = require('gulp-cssnano'),
//  uglify = require('gulp-uglify-es').default,
//  eslint = require('gulp-eslint'),
//  browserSync = require('browser-sync');

// // Create basic Gulp tasks

// gulp.task('sass', function(done) {
//  gulp
//    .src('./sass/style.scss', { sourcemaps: true })
//    .pipe(prettyError())
//    .pipe(sass())
//    .pipe(
//      autoprefixer({
//        browsers: ['last 2 versions']
//      })
//    )
//    .pipe(gulp.dest('./build/css'))
//    .pipe(cssnano())
//    .pipe(rename('style.min.css'))
//    .pipe(gulp.dest('./build/css'));

//  gulp
//    .src('./sass/style-stretch.scss', { sourcemaps: true })
//    .pipe(prettyError())
//    .pipe(sass())
//    .pipe(
//      autoprefixer({
//        browsers: ['last 2 versions']
//      })
//    )
//    .pipe(gulp.dest('./build/css'))
//    .pipe(cssnano())
//    .pipe(rename('style-stretch.min.css'))
//    .pipe(gulp.dest('./build/css'));

//  done();
// });

// gulp.task('lint', function() {
//  return (gulp
//      .src(['./js/*.js'])
//      // Also need to use it here...
//      .pipe(prettyError())
//      .pipe(eslint())
//      .pipe(eslint.format())
//      .pipe(eslint.failAfterError()) );
// });

// gulp.task(
//  'scripts',
//  gulp.series('lint', function() {
//    return gulp
//      .src('./js/*.js')
//      .pipe(uglify())
//      .pipe(
//        rename({
//          extname: '.min.js'
//        })
//      )
//      .pipe(gulp.dest('./build/js'));
//  })
// );

// // Set-up BrowserSync and watch

// gulp.task('browser-sync', function() {
//  browserSync.init({
//    server: {
//      baseDir: './'
//    }
//  });

//  gulp
//    .watch(['build/css/*.css', 'build/js/*.js'])
//    .on('change', browserSync.reload);
// });

// gulp.task('watch', function() {
//  gulp.watch('js/*.js', gulp.series('scripts'));
//  gulp.watch('sass/*.scss', gulp.series('sass'));
// });

// gulp.task('default', gulp.parallel('browser-sync', 'watch'));

const gulp = require('gulp'),
  prettyError = require('gulp-prettyerror'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify-es').default,
  eslint = require('gulp-eslint'),
  browserSync = require('browser-sync').create();

// Create basic Gulp tasks

gulp.task('sass', function(done) {
  gulp
    .src('./sass/style.scss', { sourcemaps: true })
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));

  
  done();
});

gulp.task('lint', function() {
  return (gulp
      .src(['./js/*.js'])
      // Also need to use it here...
      .pipe(prettyError())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError()) );
});

gulp.task(
  'scripts',
  gulp.series('lint', function() {
    return gulp
      .src('./js/*.js')
      .pipe(uglify())
      .pipe(
        rename({
          extname: '.min.js'
        })
      )
      .pipe(gulp.dest('./build/js'));
  })
);
gulp.task("html", function (done) {
  gulp
      .src("./*.html")
      .pipe(prettyError())
      .pipe(gulp.dest("./build"))
      .on("end", done);
});

gulp.task("images", function (done) {
  gulp
      .src("./assets/images/*")
      .pipe(prettyError())
      .pipe(gulp.dest("./build/images"))
      .on("end", done);
});

gulp.task("fonts", function (done) {
  gulp
      .src("./assets/fonts/*")
      .pipe(prettyError())
      .pipe(gulp.dest("./build/fonts"))
      .on("end", done);
});
// Set-up BrowserSync and watch

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp
    .watch(['build/index.html','build/css/*.css', 'build/js/*.js', 'build/images/*','build/fonts/*'])
    .on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', gulp.series('scripts'));
  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('./assets/images/*', gulp.series('images'));
  gulp.watch('./assets/fonts/*', gulp.series('fonts'));
});

gulp.task("build", gulp.parallel("html", "scripts", "sass", "images", "fonts"));
gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));
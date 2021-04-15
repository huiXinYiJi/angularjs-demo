var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var open = require('open')

var app = {
  srcPath: 'src/',
  devPath: 'build/',
  prdPath: 'dist/'
}

gulp.task('lib', function(done) {
  gulp.src('bower_components/**/*.js')
  .pipe(gulp.dest(app.devPath + 'vendor'))
  .pipe(gulp.dest(app.prdPath + 'vendor'))
  done()
})

gulp.task('html', function(done) {
  gulp.src(app.srcPath + '**/*.html')
  .pipe(gulp.dest(app.devPath))
  .pipe(gulp.dest(app.prdPath))
  .pipe($.connect.reload())
  done()
})

// 数据模拟
gulp.task('json', function(done) {
  gulp.src(app.srcPath + 'data/**/*.json')
  .pipe(gulp.dest(app.devPath + 'data'))
  .pipe(gulp.dest(app.prdPath + 'data'))
  .pipe($.connect.reload())
  done()
})

gulp.task('less', function(done) {
  gulp.src(app.srcPath + 'styles/index.less')
  .pipe($.plumber()) // 阻止 gulp 插件发生错误导致进程退出并输出错误日志
  .pipe($.less())
  .pipe(gulp.dest(app.devPath + 'css'))
  .pipe($.cssmin())
  .pipe(gulp.dest(app.prdPath + 'css'))
  .pipe($.connect.reload())
  done()
})

gulp.task('js', function(done) {
  gulp.src(app.srcPath + 'script/**/*.js')
  .pipe($.plumber())
  .pipe($.concat('index.js'))
  .pipe(gulp.dest(app.devPath + 'js'))
  .pipe($.uglify())
  .pipe(gulp.dest(app.prdPath + 'js'))
  .pipe($.connect.reload())
  done()
})

gulp.task('image', function(done) {
  gulp.src(app.srcPath + 'image/**/*')
  .pipe(gulp.dest(app.devPath + 'image'))
  .pipe($.imagemin())
  .pipe(gulp.dest(app.prdPath + 'image'))
  .pipe($.connect.reload())
  done()
})

gulp.task('clean', function(done) {
  gulp.src([app.prdPath, app.devPath], {allowEmpty: true})
  .pipe($.clean())
  done()
})

gulp.task('serve', function(done) {
  $.connect.server({
    root: [app.devPath],
    livereload: true,
    port: 1234
  })
  open('http://localhost:1234')

  gulp.watch(app.srcPath + 'script/**/*.js', gulp.series('js'))
  gulp.watch(app.srcPath + 'image/**/*', gulp.series('image'))
  gulp.watch(app.srcPath + 'styles/**/*.less', gulp.series('less'))
  gulp.watch(app.srcPath + 'data/**/*.json', gulp.series('json'))
  gulp.watch(app.srcPath + '**/*.html', gulp.series('html'))
  gulp.watch(app.srcPath + 'bower_components/**/*.js', gulp.series('lib'))
  done()
})

gulp.task('build', gulp.series('clean', 'js', 'less', 'json', 'html', 'image', 'lib'))

gulp.task('default', gulp.series('build', 'serve'))

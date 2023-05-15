const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create();
// const gulpif = require('gulp-if');

// let prod = false;
// const isProd = (done) => {
//   prod = true;
//   done();
// }

const clean = () => {
  return del(['dist'])
}

const resoursec = () => {
  return src('src/resoursec/**')
   .pipe(dest('dist'))
}


const styles = () => {
  return src('src/styles/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass())
  //  .pipe(concat('styles.css'))
   .pipe(autoprefixer({
    cascade: false
   }))
   .pipe(cleanCss({
    level: 2
   }))
   .pipe((sourcemaps.write()))
   .pipe(browserSync.stream())
   .pipe(dest('dist/styles'))
}

const htmlMinify = () => {
  return src('src/**/*.html')
   .pipe(htmlMin({
    collapseWhitespace: true,
   }))
   .pipe(browserSync.stream())
   .pipe(dest('dist'))
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
   .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
   }))
   .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
   .pipe(sourcemaps.init())
   .pipe(babel({
    presets: ['@babel/env']
   }))
   .pipe(concat('main.js'))
   .pipe(uglify().on('error', notify.onError()))
   .pipe(sourcemaps.write())
   .pipe(dest('dist'))
   .pipe(browserSync.stream())
}

const fonts = () => {
  return src('src/fonts/**/*')
      .pipe(dest('dist/fonts'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
    'src/images/*.svg'
  ])
   .pipe(image())
   .pipe(dest('dist/images'))
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.scss', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resoursec/**', resoursec)


exports.clean = clean
exports.styles = styles
exports. scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(htmlMinify, scripts, styles, fonts, resoursec, images, svgSprites, watchFiles)
exports.dev = series(clean, resoursec, htmlMinify, scripts, styles, fonts, images, svgSprites, watchFiles)



// echo \"Error: no test specified\" && exit 1"

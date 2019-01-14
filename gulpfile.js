const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');

function css() {
  return src('src/sass/*.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('public/css'))
}

exports.css = css;
exports.default = parallel(css);
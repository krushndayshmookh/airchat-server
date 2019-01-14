const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');

function static () {
    return src('public/**/*')
        .pipe(dest('build'));
}

function css() {
    return src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('build/css'))
}

exports.static = static;
exports.css = css;
exports.default = parallel(css);
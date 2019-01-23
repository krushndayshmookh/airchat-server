const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
var del = require("del");

function clean () {
    return del(["build"]);
}

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

function devCss() {
    watch('src/scss', parallel(css));
}

exports.clean = clean;
exports.static = static;
exports.css = css;
exports.devCss = devCss;
exports.default = series(clean, parallel(css));
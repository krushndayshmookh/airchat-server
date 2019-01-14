const { src, dest, parallel, watch } = require('gulp');
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

function devCss() {
    watch('src/scss', parallel(css));
}

exports.static = static;
exports.css = css;
exports.devCss = devCss;
exports.default = parallel(css);
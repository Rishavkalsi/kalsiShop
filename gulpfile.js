const { src, dest, watch, series, parallel, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');


// SVG Sprite Config

const config = {
    shape: {
      dimension: { // Set maximum dimensions
        maxWidth: 32,
        maxHeight: 32,
        precision: 2,
        attributes: false, 
      },
    },
    mode: {
      symbol: {
        dest: './',
        sprite: 'sprite.svg'
      }
    },
    dest: './'
  };
// Tasks


function css() {
    return src('scss/*.scss')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('css'));
}



function svg(){
    return src('icons/*.svg')
        .pipe(svgSprite(config))
        .pipe(dest('icons'));
  }

// Watch files

function watchFiles() {
    watch(['./scss'], css);
}

exports.default = parallel(css, svg);
exports.watch = watchFiles;
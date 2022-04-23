const { src, dest, watch, series, parallel } = require('gulp');

// CSS Y SAS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps= require('gulp-sourcemaps');
const cssnano= require('cssnano');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JAVASCRIPT
const terser = require('gulp-terser-js');



function css( done ) {
    // compilar SASS
    //Pasos : 1 - Identificar la hoja de estilos, 2 - Compilarla, 3 - Guardar el .css
    
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}
function imagenes(  ) {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )   
}
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp( opciones ) )
    .pipe( dest('build/img'))
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe( avif( opciones ) )
    .pipe( dest('build/img'))
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev( done ) {
    watch( 'src/scss/**/*.scss', css );    
    watch('src/img/**/*', imagenes); 
    watch( 'src/js/**/*.js', javascript );  
    done();  
}

exports.css = css;
exports.js = javascript;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, javascript, dev );


'use strict';

const projectFolder = "dist"; // ПАПКА КОТОРАЯ ЕСТЬ ИСХОДНОЙ
const sourceFolder = "#source"; // НАЧАЛЬНАЯ ПАПКА
const fs = require('fs');

//<ПУТИ К ЕЛЕМЕНТАМ>====================================================================================================
const path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/"
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/**/_*.html"],
    css: [sourceFolder + "/sass/*.sass", "!" + sourceFolder + "/sass/**/_*.sass"],
    js: [sourceFolder + "/js/*.js", "!" + sourceFolder + "/js/**/_*.js"],
    img: sourceFolder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
    fonts: sourceFolder + "/fonts/**/*.ttf"
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/sass/**/*.sass",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg, png, svg, gif, ico, webp}"
  },
  clean: projectFolder + "/"
};
//</ПУТИ К ЕЛЕМЕНТАМ>===================================================================================================


const {src, dest, series, parallel} = require("gulp"),
      gulp = require("gulp"),
      browsersync = require("browser-sync").create(),
      fileInclude = require("gulp-file-include"),
      del = require("del"),
      sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      gcmq = require('gulp-group-css-media-queries'),
      cleanCss = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify-es').default,
      imagemin = require('gulp-imagemin'),
      webp = require('gulp-webp'),
      webpHtml = require('gulp-webp-html'),
      webpcss = require('gulp-webpcss'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2'),
      fonter = require('gulp-fonter');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: projectFolder + "/"
    },
    port: 3000
  });
}
// Запускает проект в браузере

function html() {
  return src(path.src.html)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}
// Проводит операции над html файлом

function css() {
        src(sourceFolder + "/css/*.css")
        .pipe(dest(path.build.css));
  return src(path.src.css)
        .pipe(sass({
          outputStyle: 'expanded'
        }))
        .pipe(gcmq())
        .pipe(autoprefixer({
          overrideBrowserslist: ["last 5 versions"]
        }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
          extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}
// Проводит операции над css файлом

function js() {
  return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
          extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}
// Проводит операции над js файлом

function img() {
  return src(path.src.img)
        .pipe(webp({
          quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          interlaced: true,
          optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}
// Проводит операции над картинками

function fonts() {
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
}
// Проводит операции над шрифтами

function fontsStyle(params) {

  let fileContent = fs.readFileSync(sourceFolder + '/sass/assets/_fonts.sass');
  if (fileContent == '') {
    fs.writeFile(sourceFolder + '/sass/assets/_fonts.sass', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let cFontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
            if (cFontname != fontname) {
              fs.appendFile(sourceFolder + '/sass/assets/_fonts.sass',
              '@include font("' + fontname + '", "' + fontname + '", "400", "normal")\r\n', cb);
            }
          cFontname = fontname;
        }
      }
    });
  }
}

function cb() { }

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css, sourceFolder + "/css/**/*.css"], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}
// Следит за изменением файлов

function clean() {
  return del(path.clean);
}
// Очищает исходную папку

gulp.task('otf2ttf', function() {
  return src([sourceFolder + "/fonts/*.otf"])
        .pipe(fonter({
          format: ['ttf']
        }))
        .pipe(dest(sourceFolder + "/fonts/"));
});
// Превращает шрифты otf в ttf

const build = series(clean, parallel(html, css, js, img, fonts), fontsStyle);
const watch = parallel(build, watchFiles, browserSync);

exports.default = watch;

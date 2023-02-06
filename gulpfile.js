const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("scss/style.scss", {sourcemaps: false})
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest("css"));
}

// Browsersync Task
// Initialize - Since it is not a gulp plugin so it won't 
// return anything. Just initialise it and call the callback
// function, for gulp to know that BSync has been initialised
function bsServe(cb) {
  browsersync.init({
    server: {
      baseDir: "."
    }
  });

  cb();
}

// Reload
function bsReload(cb) {
  browsersync.reload();
  cb();
}


// Gulp Workflow
// =============
// watch task
function watchTask() {
  watch("*.html", bsReload);
  watch(["scss/**/*.scss"], series(scssTask, bsReload));
}

// Default
exports.default = series(
  scssTask,
  bsServe,
  watchTask
);
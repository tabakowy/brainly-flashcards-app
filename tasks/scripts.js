'use strict'

import babelify from 'babelify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import gulp from 'gulp'
import log from 'gulplog'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import { dirs } from './config'

const jsPaths = {
  src: `${dirs.src}/scripts/index.js`,
  dest: `${dirs.dest}/assets`
}

export function scripts() {
  const b = browserify({
    entries: jsPaths.src,
    debug: true
  }).transform("babelify")

  return b.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsPaths.dest))
}

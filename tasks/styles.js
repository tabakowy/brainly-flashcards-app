'use strict'

import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import { dirs } from './config'

const sassPaths = {
  src: `${dirs.src}/styles/index.scss`,
  dest: `${dirs.dest}/assets`
}

export function styles() {
  return gulp.src(sassPaths.src)
    .pipe(sass({
      includePaths: ['./node_modules', './bower_components']
    }))
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(sassPaths.dest))
}

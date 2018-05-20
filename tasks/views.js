'use strict'

import gulp from 'gulp'
import fileinclude from 'gulp-file-include'
import { dirs } from './config'

export function views() {
  return gulp.src([`${dirs.src}/views/*.html`])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dirs.dest))
}

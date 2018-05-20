'use strict'

import gulp from 'gulp'
import { dirs } from './tasks/config'
import { serve, reload } from './tasks/server'
import { scripts } from './tasks/scripts'
import { styles } from './tasks/styles'
import { views } from './tasks/views'

export function watch() {
  gulp.watch(`${dirs.src}/scripts/**/*.js`, scripts)
  gulp.watch(`${dirs.src}/views/**/*.(html|php)`, views)
  gulp.watch(`${dirs.src}/styles/**/*.(scss|css)`, styles)
}

export const dev = gulp.parallel(scripts, styles, views, serve, watch)

export default dev

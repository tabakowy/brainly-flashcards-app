'use strict'

import browserSync from 'browser-sync'
import gulp from 'gulp'
import { dirs } from './config'

export const server = browserSync.create()

export function serve() {
  server.init({
    open: false,

    server: {
      baseDir: dirs.dest
    },

    files: [
      `${dirs.dest}/*.html`,
      `${dirs.dest}/assets/*.css`,
      `${dirs.dest}/assets/*.js`
    ],

    snippetOptions: {
      rule: {
        // match: /<\/body>/i,
        // fn: (snippet, match) => snippet + match
        match: /([^/]*)$/i,
        fn: (snippet, match) => match + snippet
      }
    }
  })
}

export function reload() {
  server.reload()
}

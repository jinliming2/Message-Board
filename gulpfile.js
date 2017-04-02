/**
 * Created by Liming on 2017/3/28.
 */
"use strict";
let gulp = require('gulp');
let webpack = require('webpack-stream');

gulp.task('scripts', () =>
    gulp.src('./src/app/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./build'))
);

gulp.task('html', () =>
    gulp.src('./src/**/**.html')
        .pipe(gulp.dest('./build'))
);

gulp.task('css', () =>
    gulp.src('./src/**/**.css')
        .pipe(gulp.dest('./build'))
);

gulp.task('icon', () =>
    gulp.src('./src/**/**.ico')
        .pipe(gulp.dest('./build'))
);

gulp.task('default', ['scripts', 'html', 'css', 'icon'], () => {
    gulp.watch('./src/app/**/**.js', ['scripts']);
    gulp.watch('./src/**/**.html', ['html']);
    gulp.watch('./src/**/**.css', ['css']);
});

gulp.task('product', ['scripts', 'html', 'css', 'icon']);

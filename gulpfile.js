'use strict';

var pkg             = require('./package.json');
var del             = require('del');
var gulp            = require('gulp');
var moment          = require('moment');
var runSequence     = require('run-sequence');
var browserSync     = require('browser-sync');

var $ = require('gulp-load-plugins')();

var log                  = $.util.log;
var argv                 = $.util.env;
var ENV                  = !!argv.env ? argv.env : 'dev';
var COLORS               = $.util.colors;

function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
        port: 8000,
        notify: false,
        server: {
            baseDir: baseDir
        },
        browser: browser
    });
}

var paths = {
    gulpfile:   'gulpfile.js',
    app: {
        basePath:       'app/',
        fonts:          ['app/fonts/**/*.{eot,svg,ttf,woff}', 'jspm_packages/**/*.{eot,svg,ttf,woff}'],
        styles:         'app/styles/**/*.scss',
        images:         'app/images/**/*.{png,gif,jpg,jpeg}',
        config: {
            dev:        'app/core/config/core.config.dev.js',
            test:       'app/core/config/core.config.test.js',
            prod:       'app/core/config/core.config.prod.js'
        },
        scripts:        ['app/js/**/*.js',
                         '!app/js/**/*.spec.js'
        ],
        html:           'app/index.html',
        templates:      'app/templates/**/*.html'
    },
    tmp: {
        basePath:       '.tmp/',
        styles:         '.tmp/styles/',
        scripts:        '.tmp/scripts/'
    },
    build: {
        basePath:       'build/',
        dist: {
            basePath:   'build/dist/',
            fonts:      'build/dist/fonts/',
            images:     'build/dist/images/',
            styles:     'build/dist/styles/',
            scripts:    'build/dist/scripts/'
        },
        docs:           'build/docs/'
    }
};

var banner = $.util.template(
    '/**\n' +
    ' * <%= pkg.description %>\n' +
    ' * @version v<%= pkg.version %> - <%= today %>\n' +
    ' * @author <%= pkg.author.name %>\n' +
    ' * @copyright <%= year %>(c) <%= pkg.author.name %>\n' +
    ' * @license <%= pkg.license.type %>, <%= pkg.license.url %>\n' +
    ' */\n', {file: '', pkg: pkg, today: moment(new Date()).format('D/MM/YYYY'), year: new Date().toISOString().substr(0, 4)});

gulp.task('clean', 'Delete \'build\' and \'.tmp\' directories', function (cb) {
    var files = [].concat(paths.build.basePath, paths.tmp.basePath);
    log('Cleaning: ' + COLORS.blue(files));

    return del(files, cb);
});

gulp.task('jshint', 'Hint JavaScripts files', function () {
    return gulp.src(paths.app.scripts.concat(paths.gulpfile))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('watch', 'Watch files for changes', function () {
    // Watch images and fonts files
    gulp.watch([paths.app.images, paths.app.fonts], [browserSync.reload]);

    // Watch css files
    //gulp.watch(paths.app.styles, ['sass']);

    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile], ['jshint', browserSync.reload]);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates], ['htmlhint', browserSync.reload]);
});

gulp.task('serve', 'Serve for the dev environment', ['sass', 'watch'], function() {
    startBrowserSync(['.tmp', 'src', 'jspm_packages', './' ]);
});
gulp.task('default', 'Watch files and build environment', ['serve']);

gulp.task('build', 'Build application for deployment', function (cb) {
    runSequence(
        ['clean'],
        ['compile', 'extras', 'images', 'fonts'],
        cb
    );
}, {
    options: {
        'env=<environment>': 'environment flag (prod|dev|test)',
        'cdn': 'replace local path with CDN url'
    }
});

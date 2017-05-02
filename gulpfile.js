var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var exec = require('child_process').exec;


// == PATHS ==

var paths = {
    scripts: 'app/**/*.js',
    content: 'app/content/**/*.json',
    styles: ['./app/**/*.css', './app/**/*.scss'],
    images: './app/images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts'
};


// == SHARED PIPES ==

var pipes = {};

// put dependency JS files in correct order
pipes.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

// put app JS files in correct order
pipes.orderedAppScripts = function() {
    return plugins.angularFilesort();
};

// run JS lint on app JS files
pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};


// == DEV PIPES == 

// move bower dependency files into dist.dev
pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

// move validated app JS files into dist.dev
pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

// move json files into dist.dev
pipes.builtContentDev = function() {
    return gulp.src(paths.content)
        .pipe(gulp.dest(paths.distDev + '/content/'));
};

// convert HTML partials to JS and move into dist.dev
pipes.builtPartialsDev = function() {
    return gulp.src(paths.partials)
        .pipe(templateCache('partials.js', { module:'partials', standalone:true }))
        .pipe(gulp.dest(paths.distDev));
};

// compile SASS files and move them and other CSS into dist.dev
pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
};

// move images into dist.dev
pipes.processedImagesDev = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

// move index.html into dist.dev and inject it with dependencies, app JS files, and styles
pipes.builtIndexDev = function() {
    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var scriptedPartials = pipes.builtPartialsDev();

    var appStyles = pipes.builtStylesDev();

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.distDev))
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(scriptedPartials, {relative: true, name: 'partials'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

// output the whole dev application
pipes.builtAppDev = function() {
    return es.merge(pipes.builtIndexDev(), pipes.builtContentDev(), pipes.processedImagesDev());
};


// == PROD PIPES ==

// add '.min' to file names
pipes.minifiedFileName = function() {
    return plugins.rename(function(path) {
        path.extname = '.min' + path.extname;
    });
};

// concatenate & uglify bower dependency JS files and move to dist.prod
pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

// concatenate & uglify app JS files and partials and move to dist.prod
pipes.builtAppScriptsProd = function() {
    return pipes.validatedAppScripts()
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.distScriptsProd));
};

// move json files into dist.prod
pipes.builtContentProd = function() {
    return gulp.src(paths.content)
        .pipe(gulp.dest(paths.distProd + '/content/'));
};

// convert HTML partials to JS and move into dist.prod
pipes.builtPartialsProd = function() {
    return gulp.src(paths.partials)
        .pipe(templateCache('partials.js', { module:'partials', standalone:true }))
        .pipe(gulp.dest(paths.distScriptsProd));
};

// compile & minify SASS files and other CSS and move to dist.prod
pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

// move images to dist.prod
pipes.processedImagesProd = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images/'));
};

// move index.html to dist.prod and inject with vendor.min.js, app.min.js, CSS and minify the whole thing
pipes.builtIndexProd = function() {
    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var scriptedPartials = pipes.builtPartialsProd();
    var appStyles = pipes.builtStylesProd();

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.distProd))
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(scriptedPartials, {relative: true, name: 'partials'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

// output the whole prod application
pipes.builtAppProd = function() {
    return es.merge(pipes.builtIndexProd(), pipes.builtContentProd(), pipes.processedImagesProd());
};


// == DEV TASKS ==

gulp.task('clean-dev', function() { 
    return del(paths.distDev);
});

gulp.task('build-dev', ['clean-dev'], pipes.builtAppDev);

gulp.task('watch-dev', function() {
    watch(paths.index, function() {
        return pipes.builtIndexDev()
            .pipe(browserSync.stream());
    });
    watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
            .pipe(browserSync.stream());
    });
    watch(paths.content, function() {
        return pipes.builtContentDev()
            .pipe(browserSync.stream());
    });
    watch(paths.partials, function() {
        return pipes.builtPartialsDev()
            .pipe(browserSync.stream());
    });
    watch(paths.styles, function() {
        return pipes.builtStylesDev()
            .pipe(browserSync.stream());
    });
});

gulp.task('server-dev', function (cb) {
  exec('npm run lite-dev', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('dev', ['build-dev', 'watch-dev', 'server-dev']);


// == PROD TASKS ==

gulp.task('clean-prod', function() {
    return del(paths.distProd);
});

gulp.task('build-prod', ['clean-prod'], pipes.builtAppProd);

gulp.task('watch-prod', function() {
    watch(paths.index, function() {
        return pipes.builtIndexProd()
            .pipe(browserSync.stream());
    });
    watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
            .pipe(browserSync.stream());
    });
    watch(paths.content, function() {
        return pipes.builtContentProd()
            .pipe(browserSync.stream());
    });
    watch(paths.partials, function() {
        return pipes.builtPartialsProd()
            .pipe(browserSync.stream());
    });
    watch(paths.styles, function() {
        return pipes.builtStylesProd()
            .pipe(browserSync.stream());
    });
});

gulp.task('server-prod', function (cb) {
  exec('npm run lite-prod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('prod', ['build-prod', 'watch-prod', 'server-prod']);
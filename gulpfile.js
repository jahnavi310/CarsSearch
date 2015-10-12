// Node Modules Dependencies
var gulp = require('gulp')
var dest = require('gulp-dest')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var bower = require('gulp-bower');
var jsonminify = require('gulp-jsonminify')
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
 
// App Source and Distribution Dirs
var bases = {
    app: 'app/',
    dist: 'dist/',
};

// Content Path Variables
var paths = {
    //scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
    //libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
    styles: ['css/**/*.css'],
    html: ['index.html'],
    images: ['images/**/*.png'],
    bower: ['bower_components/'],
    //assets: ['assets/**/*.svg','assets/**/*.map','assets/**/*.css'],
    json: ['data/*.json'],
    //extras: ['icons.svg'],
};


// Local Server
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 4000
    })
})


// E2E Tests
gulp.task('test', function () {
    return gulp.src(["./src/tests/*.js"])
    .pipe(protractor({
        configFile: "tests/conf.js",
        args: ['--baseUrl', 'http://localhost:4000/']
    }))
    .on('error', function(e) { throw e })

    
});


// gulp.task('jsonminify', function () {
//     return gulp.src(['./app/data/*.json'])
//         .pipe(jsonminify())
//         .pipe(gulp.dest('./dist/data'));
// });

// Export Bower Components
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(bases.dist +'js/libs'))
});


// Comple Scripts
gulp.task('browserify', function() {
        // Grabs the app.js file
        return browserify('./app/app.js')
            // bundles it and creates a file called main.js
            .bundle().pipe(source('main.js'))
            // saves it the dist/js/ directory
            .pipe(gulp.dest(bases.dist +'js')).pipe(connect.reload())
});


// Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
 gulp.src(paths.images, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'images/'));
});


// Minify CSS and output in dist folder
gulp.task('minify-css', function() {
    return gulp.src('./app/css/*.css').pipe(minifyCss({
        compatibility: 'ie8'
    })).pipe(gulp.dest('./dist/css'));
});


// Copy all other files to dist directly
gulp.task('copy', function() {
 // Copy html
 gulp.src(paths.html, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist))
 .pipe(connect.reload());

 // Copy styles
 gulp.src(paths.styles, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist + 'styles'))
 .pipe(connect.reload());

 // Copy lib scripts, maintaining the original directory structure
 // gulp.src(paths.libs, {cwd: 'app/**'})
 // .pipe(gulp.dest(bases.dist));

//Copy extra files
 // gulp.src(paths.extras, {cwd: bases.app})
 // .pipe(gulp.dest(bases.dist));
 
 //Copy JSON files
 gulp.src(paths.json, {cwd: bases.app}) 
 .pipe(gulp.dest('./dist/data'));
});

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(bases.dist).pipe(clean());
});


gulp.task('watch', function() {
    gulp.watch(bases.app+'**/*.js', ['browserify'])
    gulp.watch(bases.app+'**', ['copy'])
    gulp.watch(bases.app+'css/*.css', ['minify-css'])
    gulp.watch(bases.dist, ['connect']);
});

gulp.task('default', ['copy','bower','browserify','minify-css','imagemin', 'connect','watch']);
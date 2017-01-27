var basePaths = {
    src: 'src/',
    dest: 'dist/',
    stat: 'static/'
};
var paths = {
    templates: {
        src: basePaths.src,
        dest: basePaths.dest
    },
    images: {
        src: basePaths.src + basePaths.stat + 'img/',
        dest: basePaths.dest + basePaths.stat + 'img/'
    },
    scripts: {
        src: basePaths.src + basePaths.stat + 'js/',
        dest: basePaths.dest + basePaths.stat + 'js/'
    },
    styles: {
        src: basePaths.src + basePaths.stat + 'less/',
        dest: basePaths.dest + basePaths.stat + 'css/'
    },
    assets: {
        src: basePaths.src + basePaths.stat + 'assets/',
        dest: basePaths.dest + basePaths.stat + 'assets/'
    },
    bower: {
        src: basePaths.src + basePaths.stat + 'bower_components',
        dest: basePaths.dest + basePaths.stat + 'bower_components'
    }
};

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    }),
    browserSync = $.browserSync.create(),
    copyFiles = {
        scripts: []
    };
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');

/* CSS - LESS */
function processCss(inputStream, taskType) {
    return inputStream
        .pipe($.plumber(function(error) {
            $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
            this.emit('end');
        }))
        .pipe($.newer(paths.styles.dest))
        .pipe($.less({ paths: [$.path.join(__dirname, 'less', 'includes')] }))
        .pipe($.rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
        //.pipe($.notify({ message: taskType + ' task complete' }));
}

gulp.task('styles', ['less:main']);
gulp.task('less:main', function() {
    return processCss(gulp.src(paths.styles.src + 'styles.less'), 'Styles');
});

/* JS */
gulp.task('scripts', ['scripts:moveFiles'], function() {
  return gulp.src(paths.scripts.src + '*.js')
    .pipe($.plumber(function(error) {
        $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
    }))
    .pipe($.bytediff.start())
    .pipe($.newer(paths.scripts.dest))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe($.bytediff.stop())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
    //.pipe($.notify({ message: 'Scripts task complete' }));
});

/* Move JS files that are already minified to dist/js/ folder */
gulp.task('scripts:moveFiles', function() {
    gulp.src(copyFiles.scripts, { base: './static/js/' })
    .pipe(gulp.dest(paths.scripts.dest));
});

/* Images */
gulp.task('images', function() {
  return gulp.src(paths.images.src + '**/*',{base: paths.images.src})
    .pipe($.plumber(function(error) {
        $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
    }))
    //.pipe($.bytediff.start()) //seems to be causing a problem with image reprocessing in subdirs on windows
    .pipe($.newer(paths.images.dest))
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    //.pipe($.bytediff.stop()) //seems to be causing a problem with image reprocessing in subdirs on windows
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
    //.pipe($.notify({ message: 'Images task complete' }));
});

/* HTML */
gulp.task('copyHtml', function(){
    return gulp.src(paths.templates.src + "*.html")
        .pipe(gulp.dest(paths.templates.dest))
        .pipe(browserSync.stream())
        //.pipe($.notify({ message: 'HTML task complete' }));
});

gulp.task('copyBowerStuff',function(){
    gulp.src([paths.bower.src + '/**/*'])
    .pipe(gulp.dest(paths.bower.dest));
});

gulp.task('copyAssets',function(){
    gulp.src([paths.assets.src + '/**/*'])
    .pipe(gulp.dest(paths.assets.dest));
});

/* optional - file generation */
//http://stackoverflow.com/questions/23230569/how-do-you-create-a-file-from-a-string-in-gulp
function createFile(filename, variables) {
	var src = require('stream').Readable({ objectMode: true })
	src._read = function () {
		for(var f = 0; f < variables.length; f++){
			this.push(new gutil.File({ cwd: "", base: "", path: filename.replace('XXX',f), contents: new Buffer(variables[f]) }))
		}
	    this.push(null)
	}
	return src;
}
//create the file content in the form of an array. In this case we take a string and replace 'VAR1' with loop number
function generateFileVariables(numfiles,filecontent){
	var output = [];
	for(var i = 0; i < numfiles; i++){
		var str = filecontent.replace(/VAR1/gi, i);
		output.push(str);
	}
	return output;
}

var numfiles = 10;
var filecontent = "This is an example of the content that could go into a file. It might contain variables that will be output automatically such as this: VAR1";
var filevariables = generateFileVariables(numfiles,filecontent);

gulp.task('generateFiles', function () {
	return createFile("fileXXX.txt", filevariables)
	.pipe(gulp.dest(paths.templates.dest + 'files/'))
});

/* BrowserSync */
gulp.task('browser-sync', ['styles', 'scripts', 'images', 'copyHtml', 'copyAssets', 'copyBowerStuff'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
        //Use if you don't want BS to open a tab in your browser when it starts up
        //open: false
        // Will not attempt to determine your network status, assumes you're OFFLINE
        //online: false
    });
    gulp.watch(paths.styles.src + '**/*.less', ['styles']);
    gulp.watch(paths.scripts.src + '**/*.js', ['scripts']);
    gulp.watch(paths.images.src + '**/*', ['images']);
    gulp.watch(paths.templates.src + '*.html', ['copyHtml']).on('change', browserSync.reload);
});

gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});

/* Clean up stray files */
gulp.task('clean', ['clear'], function(cb) {
    $.del([basePaths.dest], cb)
});

/* Default task */
gulp.task('default', ['clean'], function() {
    gulp.start('browser-sync');
});

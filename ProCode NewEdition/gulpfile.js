var gulp = require( 'gulp')
	,plumber = require('gulp-plumber')
	,watch = require( 'gulp-watch')
	,prefixer = require( 'gulp-autoprefixer')
	,uglify = require( 'gulp-uglify')
	,sass = require( 'gulp-sass')
	,sourcemaps = require( 'gulp-sourcemaps')
	,rigger = require( 'gulp-rigger')
	,cssmin = require( 'gulp-clean-css')
	,imagemin = require( 'gulp-imagemin')
	,pngquant = require( 'imagemin-pngquant')
	,rimraf = require( 'rimraf')
	,browserSync = require( 'browser-sync')
	,reload = browserSync.reload;


var path = {
	build: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'src/**/**/**/*.html',
		js: 'src/js/main.js',
		style: 'src/css/main.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/**/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/css/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};

var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "front_log"
};


var logErr = function( err){
	console.warn( err);
	this.emit( 'end');
};

gulp.task( 'html:build', function () {
	gulp.src( path.src.html)
		.pipe( plumber())
		.pipe( rigger())
		.pipe( gulp.dest( path.build.html))
		.pipe( reload( { stream: true}));
});

gulp.task( 'js:build', function () {
	gulp.src( path.src.js)
		.pipe( plumber())
		.pipe( rigger())
		//.pipe( sourcemaps.init())
		//.pipe( uglify())
		//.pipe( sourcemaps.write())
		.pipe( gulp.dest( path.build.js))
		.pipe( reload( { stream: true}));
});


gulp.task( 'style:build', function () {
	gulp.src( path.src.style)
		.pipe( plumber())
		.pipe( sourcemaps.init())
		.pipe( sass())
		.pipe( prefixer())
		.pipe( cssmin())
		.pipe( sourcemaps.write())
		.pipe( gulp.dest(path.build.css))
		.pipe( reload( { stream: true}));
});


gulp.task('image:build', function () {
	gulp.src( path.src.img)
		.pipe( plumber())
		.pipe( imagemin( {
			progressive: true,
			svgoPlugins: [ { removeViewBox: false}],
			use: [ pngquant()],
			interlaced: true
		}))
		.pipe( gulp.dest( path.build.img))
		.pipe( reload( { stream: true}));
});


gulp.task('fonts:build', function() {
	gulp.src( path.src.fonts)
		.pipe( plumber())
		.pipe( gulp.dest(path.build.fonts))
});


gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('webserver', function () {
	browserSync(config);
});


gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);
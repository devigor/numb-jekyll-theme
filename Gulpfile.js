const gulp                      = require('gulp');
const autoprefixer              = require('gulp-autoprefixer');
const imagemin                  = require('gulp-imagemin');
const svgmin                    = require('gulp-svgmin');
const stylus                    = require('gulp-stylus');
const uglify                    = require('gulp-uglify');
const concat                    = require('gulp-concat');
const babel                     = require('gulp-babel');
const browserSync               = require('browser-sync');
const cp                        = require('child_process')

const prodFiles = {
    css: './src/styl/**/*styl',
    stylus: './src/styl/**.styl',
    img: './src/img/*.png',
    svg: './src/img/svg/*.svg',
    js: './src/js/**.js'
}

const buildFiles = {
    css: 'assets/css/',
    img: 'assets/img/',
    svg: 'assets/img/svg/',
    js: 'assets/js/'
}

gulp.task('jekyll-build', (done) => {
	return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'})
		.on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
	browserSync.reload();
});

gulp.task('server', ['jekyll-build'], () => {

    browserSync.init(__dirname, {
        server: {
            baseDir: '_site/'
        }
    });
})

gulp.task('css', () => {
    return gulp.src(prodFiles.stylus)
           .pipe(stylus())
           .pipe(gulp.dest('_site/assets/css/'))
           .pipe(browserSync.reload({stream: true}))
           .pipe(gulp.dest(buildFiles.css));
})

gulp.task('autoprefixer', () => {
    return gulp.src(buildFiles.css)
           .pipe(autoprefixer())
           .pipe(gulp.dest(buildFiles.css));
})

gulp.task('imagemin', () => {
    return gulp.src(prodFiles.img)
           .pipe(imagemin())
           .pipe(gulp.dest(buildFiles.img));
})

gulp.task('svgmin', () => {
    return gulp.src(prodFiles.svg)
           .pipe(svgmin())
           .pipe(gulp.dest(buildFiles.svg));
})

gulp.task('js', () => {
    return gulp.src(prodFiles.js)
           .pipe(babel({
             presets: ['es2015']
           }))
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(gulp.dest(buildFiles.js));
})

gulp.task('watch', () => {
  gulp.watch(prodFiles.css, ['css']);
  gulp.watch(prodFiles.js, ['js']);
  gulp.watch(prodFiles.img, ['imagemin']);
  gulp.watch(prodFiles.svg, ['svgmin']);
  gulp.watch(['*.html','**/*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
})

// Tasks Dev and Prod
gulp.task('build', () => {
    gulp.start(
        'css',
        'autoprefixer',
        'js',
        'imagemin',
        'svgmin'
    )
})

gulp.task('dev', [
    'build',
    'watch',
    'server'
])

gulp.task('default', () => {
  console.log('Please using yarn start or npm start!! :)')
})

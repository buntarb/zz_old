var gulp = require( 'gulp' );

gulp.task( '__gcl-patch__', function( ){

	gulp.src( './libs/google-closure-patches/closure/goog/events/events.js' )

		.pipe( gulp.dest( './libs/google-closure-library/closure/goog/events' ) );
} );





///**********************************************************************************************************************
// * CONFIGURATIONS                                                                                                     *
// **********************************************************************************************************************/
//var PUBLIC                          = 'public/',
//
//    // Styles directories
//    STYLES                          = 'styles/',
//    STYLES_DESKTOP                  = PUBLIC+STYLES+'desktop/**/*.scss',
//    STYLES_MOBILE                   = PUBLIC+STYLES+'mobile/**/*.scss',
//
//    // Images directories
//    IMAGES                          = 'http://img.looxy.com/',
//    IMAGES_COMPILED                 = 'images/',
//    IMAGES_SOURCE                   = 'images.src/',
//    IMAGES_SPRITESHEET_DESKTOP      = PUBLIC+IMAGES_SOURCE+'sprites/desktop/*.png',
//    IMAGES_SPRITESHEET_MOBILE       = PUBLIC+IMAGES_SOURCE+'sprites/mobile/*.png',
//    IMAGES_SPRITESHEET_DESKTOP_PET  = PUBLIC+IMAGES_SOURCE+'sprites/desktop/pet/*.png';
//
///**********************************************************************************************************************
// * DEPENDENCIES                                                                                                       *
// **********************************************************************************************************************/
//var gulp            = require('gulp'),
//    del             = require('del'),
//    imagemin        = require('gulp-imagemin'),
//    pngquant        = require('imagemin-pngquant'),
//    gifsicle        = require('imagemin-gifsicle'),
//    jpegtran        = require('imagemin-jpegtran'),
//    minifyCSS       = require('gulp-minify-css'),
//    browserSync     = require('browser-sync'),
//    reload          = browserSync.reload;
//$ = require('gulp-load-plugins')({
//    pattern: ['gulp-*', 'gulp.*'],
//    replaceString:/\bgulp[\-.]/
//});
//
///**********************************************************************************************************************
// * BROWSER SYNC TASK                                                                                                  *
// **********************************************************************************************************************/
//gulp.task('browser-sync',function(){
//    browserSync({proxy:'m.zdates.com'})
//});
//
///**********************************************************************************************************************
// * REMOVE SPRITESHEET IMAGES TASK                                                                                     *
// **********************************************************************************************************************/
//function removeSpritesheet(){
//    del(PUBLIC+IMAGES_SOURCE+'spritesheet_*.png');
//}
//gulp.task('remove.spritesheet',removeSpritesheet);
//
///**********************************************************************************************************************
// * REMOVE ALL COMPILED IMAGES TASK                                                                                    *
// **********************************************************************************************************************/
//function removeImages(){
//    del(PUBLIC+IMAGES_COMPILED);
//}
//gulp.task('remove.images',removeImages);
//
///**********************************************************************************************************************
// * DESKTOP SPRITE TASK                                                                                                *
// **********************************************************************************************************************/
//function compileSpritesheetDesktop(){
//    var version=(new Date()).valueOf();
//    var spriteData=gulp.src(IMAGES_SPRITESHEET_DESKTOP)
//        .pipe($.spritesmith({
//            imgPath:IMAGES+'spritesheet_desktop_'+version+'.png',
//            imgName:'spritesheet_desktop_'+version+'.png',
//            cssName:'_spritesheet.scss',
//            algorithm:'binary-tree',
//            cssFormat:'css',
//            padding:10
//        }));
//    spriteData.img.pipe(gulp.dest(PUBLIC+IMAGES_SOURCE));
//    spriteData.css.pipe(gulp.dest(PUBLIC+STYLES+'desktop/partials'));
//}
//gulp.task('compile.spritesheet.desktop',compileSpritesheetDesktop);
//
///**********************************************************************************************************************
// * MOBILE SPRITE TASK                                                                                                 *
// **********************************************************************************************************************/
//function compileSpritesheetMobile(){
//    var version=(new Date()).valueOf();
//    var spriteData=gulp.src(IMAGES_SPRITESHEET_MOBILE)
//        .pipe($.spritesmith({
//            imgPath:IMAGES+'spritesheet_mobile_'+version+'.png',
//            imgName:'spritesheet_mobile_'+version+'.png',
//            cssName:'_spritesheet.scss',
//            algorithm:'binary-tree',
//            cssFormat:'css',
//            padding:10
//        }));
//    spriteData.img.pipe(gulp.dest(PUBLIC+IMAGES_SOURCE));
//    spriteData.css.pipe(gulp.dest(PUBLIC+STYLES+'mobile/components/_components'));
//}
//gulp.task('compile.spritesheet.mobile',compileSpritesheetMobile);
//
///**********************************************************************************************************************
// * DESKTOP PET SPRITE TASK                                                                                            *
// **********************************************************************************************************************/
//function compileSpritesheetDesktopPet(){
//    var version=(new Date()).valueOf();
//    var spriteData=gulp.src(IMAGES_SPRITESHEET_DESKTOP_PET)
//        .pipe($.spritesmith({
//            imgPath:IMAGES+'spritesheet_desktop_pet_'+version+'.png',
//            imgName:'spritesheet_desktop_pet_'+version+'.png',
//            cssName:'_spritesheet_desktop_pet.scss',
//            algorithm:'binary-tree',
//            cssFormat:'css',
//            padding:10
//        }));
//    spriteData.img.pipe(gulp.dest(PUBLIC+IMAGES_SOURCE));
//    spriteData.css.pipe(gulp.dest(PUBLIC+STYLES+'desktop/partials'));
//}
//gulp.task('compile.spritesheet.desktop.pet',compileSpritesheetDesktopPet);
//
///**********************************************************************************************************************
// * IMAGES COMPILE TASK                                                                                                *
// **********************************************************************************************************************/
//function compileImages(){
//    return gulp.src(PUBLIC+IMAGES_SOURCE+'**/*.*')
//        .pipe(imagemin({
//            interlaced:true,
//            progressive:true,
//            optimizationLevel:0,
//            use:[
//                pngquant({quality:'65-80',speed:4}),
//                gifsicle({interlaced:true}),
//                jpegtran({progressive:true})
//            ]
//        }))
//        .pipe(gulp.dest(PUBLIC+IMAGES_COMPILED));
//}
//gulp.task('compile.images',compileImages);
//
///**********************************************************************************************************************
// * DESKTOP SCSS COMPILE TASK                                                                                          *
// **********************************************************************************************************************/
//function compileStyleDesktop(){
//    return gulp.src(STYLES_DESKTOP)
//        .pipe($.sass({
//            includePaths:require('node-bourbon').includePaths,
//            style:'compressed'
//        }))
//        .pipe(gulp.dest(PUBLIC+STYLES))
//        .pipe($.rename('desktop-styles.css'))
//        .pipe(minifyCSS({keepBreaks:false}))
//        .pipe(gulp.dest(PUBLIC+STYLES))
//        .pipe(reload({stream:true}));
//}
//gulp.task('compile.style.desktop',compileStyleDesktop);
//
///**********************************************************************************************************************
// * MOBILE SCSS COMPILE TASK                                                                                           *
// **********************************************************************************************************************/
//function compileStyleMobile(){
//    return gulp.src(STYLES_MOBILE)
//        .pipe($.sass({
//            includePaths:require('node-bourbon').includePaths,
//            style:'compressed'
//        }))
//        .pipe(gulp.dest(PUBLIC+STYLES))
//        .pipe($.rename('mobile-styles.css'))
//        .pipe(minifyCSS({keepBreaks:false}))
//        .pipe(gulp.dest(PUBLIC+STYLES))
//        .pipe(reload({stream:true}));
//}
//gulp.task('compile.style.mobile',compileStyleMobile);
//
///**********************************************************************************************************************
// * UPGRADE STYLES TASKS                                                                                               *
// **********************************************************************************************************************/
//gulp.task('update.cascade.remove.spritesheet',removeSpritesheet);
//gulp.task('update.cascade.compile.spritesheet.desktop',['update.cascade.remove.spritesheet'],compileSpritesheetDesktop);
//gulp.task('update.cascade.compile.spritesheet.mobile',['update.cascade.compile.spritesheet.desktop'],compileSpritesheetMobile);
//gulp.task('update.cascade.compile.spritesheet.desktop.pet',['update.cascade.compile.spritesheet.mobile'],compileSpritesheetDesktopPet);
//gulp.task('update',['update.cascade.compile.spritesheet.desktop.pet']);
//
//gulp.task('upgrade.cascade.remove.images',removeImages);
//gulp.task('upgrade.cascade.compile.images',['upgrade.cascade.remove.images'],compileImages);
//gulp.task('upgrade.cascade.compile.style.desktop',['upgrade.cascade.compile.images'],compileStyleDesktop);
//gulp.task('upgrade.cascade.compile.style.mobile',['upgrade.cascade.compile.style.desktop'],compileStyleMobile);
//gulp.task('upgrade',['upgrade.cascade.compile.style.mobile']);
//
///**********************************************************************************************************************
// * WATCH TASK                                                                                                         *
// **********************************************************************************************************************/
//gulp.task('watch',function(){
//    gulp.watch(STYLES_DESKTOP,['compile.style.desktop']);
//    gulp.watch(STYLES_MOBILE,['compile.style.mobile']);
//});
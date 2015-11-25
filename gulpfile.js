// Copyright 2005 The ZZ Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**********************************************************************************************************************
 * File overview section                                                                                              *
 **********************************************************************************************************************/

/**
 * @fileoverview Declare project gulp commands.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

var gulp = require( 'gulp' );
var http = require( 'http' );
var sass = require( 'gulp-sass' );
var express = require('express' );
var fs = require( 'fs' );
var exec = require( 'child_process' ).exec;

/**********************************************************************************************************************
 * Functions declare section                                                                                          *
 **********************************************************************************************************************/

/**
 * Start web server on localhost:8080.
 */
function startWebServer( ){

	var app = express( );
	var port = 8080;

	//noinspection JSCheckFunctionSignatures,JSUnresolvedVariable
	app.use( express.static( __dirname ) );
	app.listen( port );
	console.log('Static server started at http://localhost:' + port);
}

/**
 * Recursive path scan.
 * @param {string} dir
 * @param {function} done
 */
var walk = function( dir, done ){

	var results = [ ];
	fs.readdir( dir, function( err, list ){

		if( err ) return done( err );
		var i = 0;
		( function next( ){

			var file = list[ i++ ];
			if( !file ) return done( null, results );
			file = dir + '/' + file;
			fs.stat( file, function( err, stat ){

				if( stat && stat.isDirectory( ) ){

					walk( file, function( err, res ){

						results = results.concat( res );
						next( );
					} );
				}else{

					results.push( file );
					next( );
				}
			} );
		})( );
	} );
};

/**
 * Compile templates from .soy files to .js files using Closure Tools utility.
 */
function compileTemplates( ){

	walk( './templates', function( err, results ){

		if( err ) console.log( err );
		var cmd =

			'java -jar ./libs/google-closure-templates/SoyToJsSrcCompiler.jar ' +

			'--shouldProvideRequireSoyNamespaces ' +
			'--codeStyle concat ' +
			'--cssHandlingScheme goog ' +
			'--shouldGenerateJsdoc ' +
			'--outputPathFormat ./sources/zz/_template/{INPUT_FILE_NAME_NO_EXT}.js ' +
			'--srcs ' + results.join( ',' );

		exec( cmd, function( err ){

			if( err ) console.log( err );
		} );
	} );
}

/**
 * Compile stylesheets from .scss files to .gss files using gulp-sass utility.
 */
function compileSass( ){

	gulp.src( './stylesheets/scss/zz.scss' )

		.pipe( sass( ) )
		.pipe( sass.sync( ).on( 'error', sass.logError ) )
		.pipe( gulp.dest( './stylesheets/_gss' ) );
}

/**
 * Compile stylesheets from .gcl files to .css files using Closure Tools utility.
 */
function compileGss( ){

	var cmd =

		'java -jar ./libs/google-closure-stylesheets/index.jar ' +

			'--allow-unrecognized-functions ' +
			'--allow-unrecognized-properties ' +
			'--output-file ./stylesheets/_css/zz.css ' +
			'--output-renaming-map-format CLOSURE_COMPILED ' +
			'--rename CLOSURE ' +
			'--output-renaming-map ./sources/zz/_stylesheet/remap.dat ' +
			'./stylesheets/_gss/zz.css';

	exec( cmd, function( err ){

		if( err ) console.log( err );
		cmd =

			'cat ./sources/zz/_stylesheet/remap.tpl ' +
				'./sources/zz/_stylesheet/remap.dat ' +
				'>./sources/zz/_stylesheet/remap.js';

		exec( cmd, function( err ){

			if( err ){

				console.log( err );

			}else{

				copyResources( );
			}
		} );
	} );
}

/**
 * Calculate application dependencies.
 */
function calcDependencies( ){//noinspection JSUnresolvedFunction

	var cmd = 'rm ./sources/zz/deps.js';
	exec( cmd, function( err ){

		if( err ) console.log( err );
		cmd =

			'python ./libs/google-closure-library/closure/bin/calcdeps.py ' +
				'--output_mode deps ' +
				'--dep ./libs/google-closure-library/closure/goog/ ' +
				'--path ./sources/zz/ > ./sources/zz/deps.js';

		exec( cmd, function( err ){

			if( err ) console.log( err );
		} );
	} );
}

/**
 * Copy application resources.
 */
function copyResources( ){

	var cmd = 'rm -r ./stylesheets/_css/resources/';
	exec( cmd, function( err ){

		if( err ) console.log( err );
		cmd = 'cp -r ./resources ./stylesheets/_css/resources';
		exec( cmd, function( err ){

			if( err ) console.log( err );
			cmd = 'rm -r ./stylesheets/_gss/resources/';
			exec( cmd, function( err ){

				if( err ) console.log( err );
				cmd = 'cp -r ./resources ./stylesheets/_gss/resources';
				exec( cmd, function( err ){

					if( err ) console.log( err );
				} );
			} );
		} );
	} );
}

/**
 * Start watchers processes.
 */
function watchFrontendChanges( ){

	gulp.watch( './templates/**/*', [ 'compile:tpl' ] );
	gulp.watch( './stylesheets/scss/**/*', [ 'compile:sass' ] );
	gulp.watch( './stylesheets/_gss/zz.css', [ 'compile:gss' ] );
	gulp.watch( './sources/zz/base.js', [ 'calcDependencies' ] );
	gulp.watch( './sources/zz/*/*.js', [ 'calcDependencies' ] );
	gulp.watch( './sources/zz/*/*/*.js', [ 'calcDependencies' ] );
	gulp.watch( './sources/zz/*/*/*/*.js', [ 'calcDependencies' ] );
}

/**
 * Run compiler in check mode.
 */
function checkApplication( ){

	var cmd =

		'python ./libs/google-closure-library/closure/bin/build/closurebuilder.py ' +

			// Libraries root dirs
			'--root=./libs/google-closure-library/closure/goog/ ' +
			'--root=./libs/google-closure-library/third_party/closure/ ' +
			'--root=./libs/google-closure-templates/ ' +
			'--root=./sources/zz/ ' +

			// Externs
			//'--compiler_flags="--externs=./sources/zz/_extern/gapi.js" ' +

			// Project namespace
			'--namespace="zz" ' +

			// Compiler settings
			'--output_mode=compiled ' +
			'--compiler_jar=./libs/google-closure-compiler/compiler.jar ' +
			'--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ' +
			'--compiler_flags="--language_in=ECMASCRIPT5" ' +
			'--compiler_flags="--language_out=ECMASCRIPT5" ' +

			// Uncomment this line for check-only mode
			'--compiler_flags="--checks-only" ';

	exec( cmd, function( error, stdout, stderr ){

		console.log( stderr );
		if( error ) console.log( error );
	} );
}

/**
 * Compile existing application.
 * //@ sourceMappingURL=zz.js.map
 */
function compileApplication( ){

	var cmd = 'rm ./app/zz.js ./app/zz.css';
	exec( cmd, function( err ){

		if( err ) console.log( err );
		cmd =

			'python ./libs/google-closure-library/closure/bin/build/closurebuilder.py ' +

				// Libraries root dirs
				'--root=./libs/google-closure-library/closure/goog/ ' +
				'--root=./libs/google-closure-library/third_party/closure/ ' +
				'--root=./libs/google-closure-templates/ ' +
				'--root=./sources/zz/ ' +

				// Externs
				//'--compiler_flags="--externs=./sources/zz/_extern/gapi.js" ' +

				// Project namespace
				'--namespace="zz" ' +

				// Compiler settings
				'--output_mode=compiled ' +
				'--compiler_jar=./libs/google-closure-compiler/compiler.jar ' +

				'--compiler_flags="--source_map_format=V3" ' +
				'--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ' +
				'--compiler_flags="--language_in=ECMASCRIPT5_STRICT" ' +
				'--compiler_flags="--language_out=ECMASCRIPT5_STRICT" ' +

				// Output file
				'--compiler_flags="--create_source_map=./app/zz.js.map" ' +
				'--compiler_flags="--js_output_file=./app/zz.js" ';

		exec( cmd, function( error, stdout, stderr ){

			console.log( stderr );
			if( err ) console.log( error );
			var cmd = 'cp ./stylesheets/_css/zz.css ./app/zz.css';
			exec( cmd, function( err ){

				if( err ) console.log( err );
				cmd = 'rm -r ./app/resources/*';
				exec( cmd, function( err ){

					if( err ) console.log( err );
					cmd = 'cp -r ./resources/* ./app/resources/';
					exec( cmd, function( err ){

						if( err ) console.log( err );
					} );
				} );
			} );
		} );
	} );
}

/**********************************************************************************************************************
 * Gulp tasks declare section                                                                                         *
 **********************************************************************************************************************/

gulp.task( 'startWebServer', startWebServer );
gulp.task( 'calcDependencies', calcDependencies );
gulp.task( 'checkApplication', checkApplication );
gulp.task( 'compileApplication', compileApplication );
gulp.task( 'watchFrontendChanges', watchFrontendChanges );

gulp.task( 'copy:resources', copyResources );
gulp.task( 'compile:sass', compileSass );
gulp.task( 'compile:gss', compileGss );
gulp.task( 'compile:tpl', compileTemplates );
gulp.task( 'compile:app', compileApplication );
gulp.task( 'start:ws', startWebServer );
gulp.task( 'start:fe', watchFrontendChanges );
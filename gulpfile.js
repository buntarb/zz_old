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
var http = require('http');
var express = require('express');

/**********************************************************************************************************************
 * Functions declare section                                                                                          *
 **********************************************************************************************************************/

/**
 * Copy all necessary patched files to GCL folder. This command runs in background during installation process.
 */
function gclPatch( ){

	gulp.src( './libs/google-closure-patches/closure/goog/events/events.js' )

		.pipe( gulp.dest( './libs/google-closure-library/closure/goog/events' ) );
}

/**
 * Start web server on localhost:8080.
 */
function startWebServer( ){

	var app = express( );
	var port = 8080;

	//noinspection JSCheckFunctionSignatures,JSUnresolvedVariable
	app.use( express.static(__dirname ) );
	app.listen( port );
	console.log('Static server started at http://localhost:' + port);
}

/**
 * Compile templates from .soy files to .js files using Closure Tools utility.
 */
function compileTemplates( ){//noinspection JSUnresolvedFunction

	var fs = require( 'fs' ); //noinspection JSUnresolvedFunction
	var exec = require('child_process').exec;
	fs.readdir( './templates', function( err, files ){

		files.forEach( function( file ){

			var cmd =

				'java -jar ./libs/google-closure-templates/SoyToJsSrcCompiler.jar ' +

					'--shouldProvideRequireSoyNamespaces ' +
					'--codeStyle concat ' +
					'--cssHandlingScheme goog ' +
					'--shouldGenerateJsdoc ' +
					'--outputPathFormat ./sources/zz/_template/{INPUT_FILE_NAME_NO_EXT}.js ' +
					'--srcs ./templates/' + file;

			exec( cmd, function( err ){

				if( err ) console.log( err );
			} );
		} );
	} )
}

/**
 * Compile stylesheets from .gcl files to .css files using Closure Tools utility.
 */
function compileStylesheets( ){//noinspection JSUnresolvedFunction

	var exec = require('child_process').exec;
	var cmd =

		'java -jar ./libs/google-closure-stylesheets/index.jar ' +

			'--allowed-non-standard-function blur ' +
			'--allowed-unrecognized-property -webkit-overflow-scrolling ' +
			'--output-file ./stylesheets/_css/zz.css ' +
			'--output-renaming-map-format CLOSURE_COMPILED ' +
			'--rename CLOSURE ' +
			'--output-renaming-map ./sources/zz/_stylesheet/remap.dat ' +
			'./stylesheets/gss/*.gss';

	exec( cmd, function( err ){

		if( err ) console.log( err );
		cmd =

			'cat ./sources/zz/_stylesheet/remap.tpl ' +
				'./sources/zz/_stylesheet/remap.dat ' +
				'>./sources/zz/_stylesheet/remap.js';

		exec( cmd, function( err ){

			if( err ) console.log( err );
		} );
	} );
}

/**
 * Calculate application dependencies.
 */
function calcDependencies( ){//noinspection JSUnresolvedFunction

	var exec = require('child_process').exec;
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
 * Start watchers processes.
 */
function watchFrontendChanges( ){

	gulp.watch( './templates/*', ['compileTemplates'] );
	gulp.watch( './stylesheets/gss/*', ['compileStylesheets'] );
	gulp.watch( './sources/zz/base.js', ['calcDependencies'] );
	gulp.watch( './sources/zz/*/*.js', ['calcDependencies'] );
	gulp.watch( './sources/zz/*/*/*.js', ['calcDependencies'] );
	gulp.watch( './sources/zz/*/*/*/*.js', ['calcDependencies'] );

	//This watcher work with both ./sources/zz/* dir and all of it subdirs.
	//gulp.watch( './sources/zz/**/*.js', ['calcDependencies'] );
}

/**
 * Run compiler in check mode.
 */
function checkApplication( ){

	var exec = require('child_process').exec;
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
 */
function compileApplication( ){

	var exec = require('child_process').exec;
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
				'--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ' +
				'--compiler_flags="--language_in=ECMASCRIPT5" ' +
				'--compiler_flags="--language_out=ECMASCRIPT5" ' +

				// Output file
				'--compiler_flags="--js_output_file=./app/zz.js" ';

		exec( cmd, function( error, stdout, stderr ){

			console.log( stderr );
			if( err ) console.log( error );
			var cmd = 'cp ./stylesheets/_css/zz.css ./app/zz.css';
			exec( cmd, function( err ){

				if( err ) console.log( err );
			} );
		} );
	} );
}

/**********************************************************************************************************************
 * Gulp tasks declare section                                                                                         *
 **********************************************************************************************************************/

gulp.task( '__gcl-patch__', gclPatch );
gulp.task( 'startWebServer', startWebServer );
gulp.task( 'calcDependencies', calcDependencies );
gulp.task( 'checkApplication', checkApplication );
gulp.task( 'compileTemplates', compileTemplates );
gulp.task( 'compileStylesheets', compileStylesheets );
gulp.task( 'compileApplication', compileApplication );
gulp.task( 'watchFrontendChanges', watchFrontendChanges );
gulp.task( 'start-ws', startWebServer );
gulp.task( 'watch-fe', watchFrontendChanges );
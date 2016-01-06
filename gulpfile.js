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

var fs = require( 'fs' );
var exec = require( 'child_process' ).exec;
var gulp = require( 'gulp' );
var http = require( 'http' );
var sass = require( 'gulp-sass' );
var express = require( 'express' );
var compiler = require( './sources/node/compiler.js' );
var templates = require( './sources/node/templates.js' );
var stylesheets = require( './sources/node/stylesheets.js' );

/**********************************************************************************************************************
 * Functions declare section                                                                                          *
 **********************************************************************************************************************/

/**
 * Start web server on localhost:8080.
 */
function startWebServer( ){

	var app = express( );
	var port = 8080;
	app.use( express.static( __dirname ), function( ){ } );
	app.listen( port );
	console.log('Static server started at http://localhost:' + port);
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

/**********************************************************************************************************************
 * Gulp tasks declare section                                                                                         *
 **********************************************************************************************************************/

gulp.task( 'startWebServer', startWebServer );
gulp.task( 'calcDependencies', calcDependencies );
gulp.task( 'checkApplication', checkApplication );
gulp.task( 'compileApplication', compileApplication );
gulp.task( 'watchFrontendChanges', watchFrontendChanges );

gulp.task( 'copy:resources', copyResources );
gulp.task( 'compile:app', compileApplication );
gulp.task( 'start:ws', startWebServer );
gulp.task( 'start:fe', watchFrontendChanges );

gulp.task( 'compile:msg', templates.extractMessages );
gulp.task( 'compile:tpl', templates.compileTemplates );
gulp.task( 'compile:scss', stylesheets.scss2gss );
gulp.task( 'compile:gss', stylesheets.gss2css );
gulp.task( 'compile:dep', compiler.calculateDependencies );
gulp.task( 'compile:app', compiler.compileApplication );
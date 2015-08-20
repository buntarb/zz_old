var gulp = require( 'gulp' );
var http = require('http');
var express = require('express');
gulp.task( '__gcl-patch__', function( ){

	gulp.src( './libs/google-closure-patches/closure/goog/events/events.js' )

		.pipe( gulp.dest( './libs/google-closure-library/closure/goog/events' ) );
} );
gulp.task( 'startStaticServer', function( ){

	var app = express( );
	var port = 8080;
	app.use( express.static(__dirname ) );
	app.listen( port );
	console.log('Static server started at http://localhost:' + port);
} );
gulp.task( 'compileTemplates', function( ){

	var fs = require( 'fs' );
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
} );
gulp.task( 'compileStylesheets', function( ){

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
} );
gulp.task( 'calcDependencies', function( ){

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
} );
gulp.task( 'updateFrontend', ['compileTemplates', 'compileStylesheets', 'calcDependencies'], function( ){

} );
gulp.task( 'startStaticServer', ['updateFrontend'], function( ){

	var app = express( );
	var port = 8080;
	app.use( express.static(__dirname ) );
	app.listen( port );
	console.log('Static server started at http://localhost:' + port);
} );
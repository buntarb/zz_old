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
 * @fileoverview Tools for work with files.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

var fs = require( 'fs' );
var exec = require( 'child_process' ).execSync;
var CONST = require( './constants' );

/**********************************************************************************************************************
 * Functions declare section                                                                                          *
 **********************************************************************************************************************/

/**
 * Execute shell command.
 * @param {String} command
 * @type {Function}
 */
var execute = function( command ){

	try{

		exec( command );

	}catch( err ){

		console.log( err );
	}
};

/**
 * Determine is specified file exist or not.
 * @param {String} fileName
 * @returns {Boolean}
 */
var isFileExist = function( fileName ){

	var exist;
	try{

		exist = fs.statSync( fileName ).isFile( );

	}catch( err ){

		exist = false;

	}
	return exist;
};

/**
 * Determine is specified directory exist or not.
 * @param {String} dirName
 * @returns {Boolean}
 */
var isDirectoryExist = function( dirName ){

	var exist;
	try{

		exist = fs.statSync( dirName ).isDirectory( );

	}catch( err ){

		exist = false;

	}
	return exist;
};

/**
 * Return absolute path of specified related path based on project constants.
 * @param {String} relPath
 * @returns {String}
 */
var getAbsPath = function( relPath ){

	return CONST.PATH.ROOT + relPath;
};

/**
 * Return file name without ext.
 * TODO: Update this function.
 * @param {String} fullName
 * @returns {string}
 */
var getFileNameNoExt = function( fullName ){

	var tmp = fullName.split( '/' );
	tmp = tmp[ tmp.length - 1 ].split( '.' );
	tmp.pop( );
	return tmp.join( '.' );
};

/**
 * Recursive find all files in specified path.
 * @param {string} dir
 * @param {function} done
 */
var getFilesRecursively = function( dir, done ){

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

					getFilesRecursively( file, function( err, res ){

						results = results.concat( res );
						next( );
					} );
				}else{

					results.push( file );
					next( );
				}
			} );
		} )( );
	} );
};

/**
 * Open specified file and return its content.
 * @param {String} fileName
 * @returns {String}
 */
var openFile = function( fileName ){

	return fs.readFileSync( fileName, 'utf8' );
};

/**
 * Save specified data into specified file.
 * @param {String} fileName
 */
var saveFile = function( fileName, fileData ){

	fs.writeFileSync( fileName, fileData, 'utf8' );
};

/**********************************************************************************************************************
 * Exports                                                                                                            *
 **********************************************************************************************************************/

module.exports = {

	execute: execute,
	isDirExist: isDirectoryExist,
	isFileExist: isFileExist,
	getAbsPath: getAbsPath,
	getFileNameNoExt: getFileNameNoExt,
	getFilesRecursively: getFilesRecursively,
	openFile: openFile,
	saveFile: saveFile
};
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
 * @fileoverview Provide zz.model.Example1 class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Example1' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.model.Row' );
goog.require( 'zz.model.IRow' );
goog.require( 'zz.model.FieldTypes' );
goog.require( 'zz.model.Example2' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @implements {zz.model.IRow}
 * @extends {zz.model.Row}
 * @param {?Array.<boolean, number, string>} data
 */
zz.model.Example1 = function( data ){

	zz.model.Row.call( this, data );
};
goog.inherits( zz.model.Example1, zz.model.Row );

/**********************************************************************************************************************
 * Model properties description section                                                                               *
 **********************************************************************************************************************/

/**
 * @type {boolean}
 */
zz.model.Example1.prototype.booleanField;

/**
 * @type {number}
 */
zz.model.Example1.prototype.numberField;

/**
 * @type {string}
 */
zz.model.Example1.prototype.stringField;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return schema object.
 * @override
 * @returns {Object}
 */
zz.model.Example1.prototype.getSchema = function( ){

	return {

		booleanField: {

			order: 0,
			type: zz.model.FieldTypes.BOOLEAN,
			required:false
		},
		numberField: {

			order: 1,
			type: zz.model.FieldTypes.NUMBER,
			required: true
		},
		stringField: {

			order: 2,
			type: zz.model.FieldTypes.STRING,
			required: false
		},
		exampleField: {

			order: 3,
			type: zz.model.Example2,
			required: false
		}
	};
};
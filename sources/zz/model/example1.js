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
goog.provide( 'zz.model.Example1Set' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.model.Datarow' );
goog.require( 'zz.model.Dataset' );
goog.require( 'zz.model.IDatarow' );
goog.require( 'zz.model.FieldTypes' );
goog.require( 'zz.model.Example2' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @implements {zz.model.IDatarow}
 * @extends {zz.model.Datarow}
 * @param {!zz.model.Dataset} dataset
 * @param {?Array.<boolean, number, string>} opt_data
 */
zz.model.Example1 = function( dataset, opt_data ){

	zz.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.model.Example1, zz.model.Datarow );

/**********************************************************************************************************************
 * Model properties description section                                                                               *
 **********************************************************************************************************************/

/**
 * @type {boolean}
 */
zz.model.Example1.prototype.booleanField1;

/**
 * @type {number}
 */
zz.model.Example1.prototype.numberField1;

/**
 * @type {string}
 */
zz.model.Example1.prototype.stringField1;

/**
 * @type {zz.model.Example2Set}
 */
zz.model.Example1.prototype.exampleField1;

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

		booleanField1: {

			order: 0,
			type: zz.model.FieldTypes.BOOLEAN,
			required:false
		},
		numberField1: {

			order: 1,
			type: zz.model.FieldTypes.NUMBER,
			required: true
		},
		stringField1: {

			order: 2,
			type: zz.model.FieldTypes.STRING,
			required: false
		},
		exampleField1: {

			order: 3,
			type: zz.model.Example2Set,
			required: false
		}
	};
};

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {?goog.event.EventTarget} opt_parent
 * @param {?Array.<Array>} opt_data
 * @extends {zz.model.Dataset}
 */
zz.model.Example1Set = function( opt_parent, opt_data ){

	/**
	 * Current dataset row type.
	 * @overwrite
	 * @type {zz.model.Datarow}
	 */
	this.datarow = zz.model.Example1;
	zz.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.model.Example1Set, zz.model.Dataset );
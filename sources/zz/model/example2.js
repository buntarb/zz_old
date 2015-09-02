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
 * @fileoverview Provide zz.model.Example2 class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Example2' );
goog.provide( 'zz.model.Example2Set' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.model.Datarow' );
goog.require( 'zz.model.Dataset' );
goog.require( 'zz.model.IDatarow' );
goog.require( 'zz.model.FieldTypes' );

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
zz.model.Example2 = function( dataset, opt_data ){

	zz.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.model.Example2, zz.model.Datarow );

/**********************************************************************************************************************
 * Model properties description section                                                                               *
 **********************************************************************************************************************/

/**
 * @type {boolean}
 */
zz.model.Example2.prototype.booleanField2;

/**
 * @type {number}
 */
zz.model.Example2.prototype.numberField2;

/**
 * @type {string}
 */
zz.model.Example2.prototype.stringField2;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return zz.model.Example2 schema object.
 * @override
 * @returns {Object}
 */
zz.model.Example2.prototype.getSchema = function( ){

	return {

		booleanField2: {

			order: 0,
			type: zz.model.FieldTypes.BOOLEAN,
			required:false
		},
		numberField2: {

			order: 1,
			type: zz.model.FieldTypes.NUMBER,
			required: true
		},
		stringField2: {

			order: 2,
			type: zz.model.FieldTypes.STRING,
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
zz.model.Example2Set = function( opt_parent, opt_data ){

	/**
	 * Current dataset row type.
	 * @overwrite
	 * @type {zz.model.Datarow}
	 */
	this.datarow = zz.model.Example2;
	zz.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.model.Example2Set, zz.model.Dataset );
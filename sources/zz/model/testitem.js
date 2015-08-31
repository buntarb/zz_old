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
 * @fileoverview Provide zz.model.TestItem class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.TestItem' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.model.FieldTypes' );
goog.require( 'zz.model.IDataItem' );
goog.require( 'zz.model.DataItem' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @implements {zz.model.IDataItem}
 * @extends {zz.model.DataItem}
 * @param {?Array.<boolean, number, string>} data
 */
zz.model.TestItem = function( data ){

	zz.model.DataItem.call( this, data );
};
goog.inherits( zz.model.TestItem, zz.model.DataItem );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * @type {boolean}
 */
zz.model.TestItem.prototype.booleanField;

/**
 * @type {number}
 */
zz.model.TestItem.prototype.numberField;

/**
 * @type {string}
 */
zz.model.TestItem.prototype.stringField;

/**
 * Return zz.model.TestItem schema object.
 * @override
 * @returns {Object}
 */
zz.model.TestItem.prototype.getSchema = function( ){

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
		}
	};
};
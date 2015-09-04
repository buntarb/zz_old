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
 * @fileoverview Provide zz.model.ExampleUserPhone class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.ExampleUserPhone' );
goog.provide( 'zz.model.ExampleUserPhoneSet' );

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
zz.model.ExampleUserPhone = function( dataset, opt_data ){

	/**
	 * @type {string}
	 */
	this.phoneType = undefined;

	/**
	 * @type {string}
	 */
	this.phoneNumber = undefined;

	/**
	 * @type {boolean}
	 */
	this.phoneActiveFlag = undefined;

	/**
	 * Call parent constructor.
	 */
	zz.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.model.ExampleUserPhone, zz.model.Datarow );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return zz.model.Example2 schema object.
 * @override
 * @private
 * @returns {Object}
 */
zz.model.ExampleUserPhone.prototype.getSchema_ = function( ){

	return {

		phoneType: {

			order: 0,
			type: zz.model.FieldTypes.STRING,
			required:true
		},
		phoneNumber: {

			order: 1,
			type: zz.model.FieldTypes.STRING,
			required: true
		},
		phoneActiveFlag: {

			order: 2,
			type: zz.model.FieldTypes.BOOLEAN,
			required: true
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
zz.model.ExampleUserPhoneSet = function( opt_parent, opt_data ){

	zz.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.model.ExampleUserPhoneSet, zz.model.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @private
 * @type {zz.model.ExampleUserPhone}
 */
zz.model.ExampleUserPhoneSet.prototype.Datarow_ = zz.model.ExampleUserPhone;
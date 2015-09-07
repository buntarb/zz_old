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

goog.require( 'zz.mvc.model.Datarow' );
goog.require( 'zz.mvc.model.Dataset' );
goog.require( 'zz.mvc.model.IDatarow' );
goog.require( 'zz.mvc.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @implements {zz.mvc.model.IDatarow}
 * @extends {zz.mvc.model.Datarow}
 * @param {!zz.mvc.model.Dataset} dataset
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
	 * @type {number}
	 */
	this.phoneOrder = undefined;

	/**
	 * Call parent constructor.
	 */
	zz.mvc.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.model.ExampleUserPhone, zz.mvc.model.Datarow );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return zz.mvc.model.Example2 schema object.
 * @override
 * @private
 * @returns {Object}
 */
zz.model.ExampleUserPhone.prototype.getSchema_ = function( ){

	return {

		phoneType: {

			index: 0,
			type: zz.mvc.model.FieldTypes.STRING,
			required:true
		},
		phoneNumber: {

			index: 1,
			type: zz.mvc.model.FieldTypes.STRING,
			required: true
		},
		phoneActiveFlag: {

			index: 2,
			type: zz.mvc.model.FieldTypes.BOOLEAN,
			required: true
		},
		phoneOrder: {

			index: 3,
			type: zz.mvc.model.FieldTypes.NUMBER,
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
 * @extends {zz.mvc.model.Dataset}
 */
zz.model.ExampleUserPhoneSet = function( opt_parent, opt_data ){

	zz.mvc.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.model.ExampleUserPhoneSet, zz.mvc.model.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @private
 * @type {zz.model.ExampleUserPhone}
 */
zz.model.ExampleUserPhoneSet.prototype.Datarow_ = zz.model.ExampleUserPhone;
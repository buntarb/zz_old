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
 * @fileoverview Provide zz.module.user.model.UserPhone class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.model.UserPhone' );
goog.provide( 'zz.module.user.model.UserPhoneSet' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.mvc.model.Datarow' );
goog.require( 'zz.mvc.model.Dataset' );
goog.require( 'zz.mvc.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {?Array.<boolean, number, string>} opt_data
 * @extends {zz.mvc.model.Datarow}
 */
zz.module.user.model.UserPhone = function( dataset, opt_data ){

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
goog.inherits( zz.module.user.model.UserPhone, zz.mvc.model.Datarow );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {?goog.event.EventTarget} opt_parent
 * @param {?Array.<Array>} opt_data
 * @extends {zz.mvc.model.Dataset}
 */
zz.module.user.model.UserPhoneSet = function( opt_parent, opt_data ){

	zz.mvc.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.module.user.model.UserPhoneSet, zz.mvc.model.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.module.user.model.UserPhone}
 */
zz.module.user.model.UserPhoneSet.prototype.DatarowConstructor = zz.module.user.model.UserPhone;

/**
 * Return zz.mvc.model.UserPhone schema object.
 * @override
 * @returns {Object}
 */
zz.module.user.model.UserPhoneSet.prototype.getDatarowSchema = function( ){

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
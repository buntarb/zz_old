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
 * @fileoverview Provide zz.module.user.model.User class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.model.User' );
goog.provide( 'zz.module.user.model.UserSet' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.mvc.model.Datarow' );
goog.require( 'zz.mvc.model.Dataset' );
goog.require( 'zz.mvc.model.FieldTypes' );
goog.require( 'zz.module.user.model.UserPhoneSet' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @extends {zz.mvc.model.Datarow}
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {?Array.<boolean, number, string>} opt_data
 */
zz.module.user.model.User = function( dataset, opt_data ){

	/**
	 * @type {number}
	 */
	this.userId = undefined;

	/**
	 * @type {string}
	 */
	this.userFirstName = undefined;

	/**
	 * @type {string}
	 */
	this.userLastName = undefined;

	/**
	 * @type {string}
	 */
	this.userLogin = undefined;

	/**
	 * @type {string}
	 */
	this.userPassword = undefined;

	/**
	 * @type {boolean}
	 */
	this.userVerifiedFlag = undefined;

	/**
	 * @type {zz.module.user.model.UserPhoneSet}
	 */
	this.userPhones = undefined;

	/**
	 * Call parent constructor.
	 */
	zz.mvc.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.module.user.model.User, zz.mvc.model.Datarow );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.mvc.model.Dataset}
 */
zz.module.user.model.UserSet = function( opt_parent, opt_data ){

	zz.mvc.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.module.user.model.UserSet, zz.mvc.model.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.module.user.model.User}
 */
zz.module.user.model.UserSet.prototype.DatarowConstructor = zz.module.user.model.User;

/**
 * Return schema object.
 * @override
 * @returns {Object}
 */
zz.module.user.model.UserSet.prototype.getDatarowSchema = function( ){

	return {

		userId: {

			index: 0,
			type: zz.mvc.model.FieldTypes.NUMBER,
			required: true
		},
		userFirstName: {

			index: 1,
			type: zz.mvc.model.FieldTypes.STRING,
			required: false
		},
		userLastName: {

			index: 2,
			type: zz.mvc.model.FieldTypes.STRING,
			required: false
		},
		userLogin: {

			index: 3,
			type: zz.mvc.model.FieldTypes.STRING,
			required: true
		},
		userPassword: {

			index: 4,
			type: zz.mvc.model.FieldTypes.STRING,
			required: true
		},
		userVerifiedFlag: {

			index: 5,
			type: zz.mvc.model.FieldTypes.BOOLEAN,
			required: true
		},
		userPhones: {

			index: 6,
			type: zz.module.user.model.UserPhoneSet,
			required: false
		}
	};
};
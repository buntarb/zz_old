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
 * @fileoverview Provide zz.model.ExampleUser class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.ExampleUser' );
goog.provide( 'zz.model.ExampleUserSet' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.mvc.model.Datarow' );
goog.require( 'zz.mvc.model.Dataset' );
goog.require( 'zz.mvc.model.IDatarow' );
goog.require( 'zz.mvc.model.FieldTypes' );
goog.require( 'zz.model.ExampleUserPhoneSet' );

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
zz.model.ExampleUser = function( dataset, opt_data ){

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
	 * @type {zz.model.ExampleUserPhoneSet}
	 */
	this.userPhones = undefined;

	/**
	 * Call parent constructor.
	 */
	zz.mvc.model.Datarow.call( this, dataset, opt_data );
};
goog.inherits( zz.model.ExampleUser, zz.mvc.model.Datarow );

/**********************************************************************************************************************
 * Model properties description section                                                                               *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return schema object.
 * @override
 * @private
 * @returns {Object}
 */
zz.model.ExampleUser.prototype.getSchema_ = function( ){

	return {

		userFirstName: {

			index: 0,
			type: zz.mvc.model.FieldTypes.STRING,
			required: false
		},
		userLastName: {

			index: 1,
			type: zz.mvc.model.FieldTypes.STRING,
			required: false
		},
		userLogin: {

			index: 2,
			type: zz.mvc.model.FieldTypes.STRING,
			required: true
		},
		userPassword: {

			index: 3,
			type: zz.mvc.model.FieldTypes.STRING,
			required: true
		},
		userVerifiedFlag: {

			index: 4,
			type: zz.mvc.model.FieldTypes.BOOLEAN,
			required: true
		},
		userPhones: {

			index: 5,
			type: zz.model.ExampleUserPhoneSet,
			required: false
		}
	};
};

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.mvc.model.Dataset}
 */
zz.model.ExampleUserSet = function( opt_parent, opt_data ){

	zz.mvc.model.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.model.ExampleUserSet, zz.mvc.model.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @private
 * @type {zz.model.ExampleUser}
 */
zz.model.ExampleUserSet.prototype.Datarow_ = zz.model.ExampleUser;
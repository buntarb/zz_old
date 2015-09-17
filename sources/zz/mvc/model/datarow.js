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
 * @fileoverview Provide zz.mvc.model.Datarow class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.model.Datarow' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.object' );
goog.require( 'zz.mvc.model' );
goog.require( 'zz.mvc.model.Error' );
goog.require( 'zz.mvc.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {?Array} opt_data
 */
zz.mvc.model.Datarow = function( dataset, opt_data ){

	goog.getUid( this );
	goog.object.forEach( dataset.getDatarowSchema( ), function( meta, name ){

		var idx = /** @type {number} */ (meta.index);
		var typ = /** @type {zz.mvc.model.FieldTypes|Function} */ (meta.type);
		var req = /** @type {boolean} */ (meta.required);

		if( goog.isDef( opt_data ) && req && !goog.isDefAndNotNull( opt_data[idx] ) )

			throw new TypeError( zz.mvc.model.Error.FIELD_REQUIRED );

		if( typ === zz.mvc.model.FieldTypes.BOOLEAN )

			zz.mvc.model.setupBooleanField( dataset, this, name, req, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.mvc.model.FieldTypes.NUMBER )

			zz.mvc.model.setupNumberField( dataset, this, name, req, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.mvc.model.FieldTypes.STRING )

			zz.mvc.model.setupStringField( dataset, this, name, req, opt_data ? opt_data[idx] : undefined );

		if( goog.isFunction( typ ) )

			zz.mvc.model.setupDatasetField( dataset, this, name, typ, opt_data ? opt_data[idx] : undefined );

	}, this );
};

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
* Return current datarow unique ID.
* @returns {string}
*/
zz.mvc.model.Datarow.prototype.getUid = function( ){

	return goog.getUid( this );
};
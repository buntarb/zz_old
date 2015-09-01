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
 * @fileoverview Provide zz.model.Row class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Row' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.object' );
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );

goog.require( 'zz.model' );
goog.require( 'zz.model.Error' );
goog.require( 'zz.model.Set' );
goog.require( 'zz.model.IRow' );
goog.require( 'zz.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements zz.model.IRow
 * @param {Array} data
 */
zz.model.Row = function( data ){

	goog.events.EventTarget.call( this );

	goog.object.forEach( this.getSchema( ), function( meta, name ){

		var ord = /** @type {number} */ (meta.order);
		var typ = /** @type {zz.model.FieldTypes|Function} */ (meta.type);
		var req = /** @type {boolean} */ (meta.required);

		if( goog.isDef( data ) && req && !goog.isDefAndNotNull( data[ord] ) )

			throw new TypeError( zz.model.Error.MISSING_REQUIRED_FIELD );

		if( typ === zz.model.FieldTypes.BOOLEAN )

			zz.model.setupBooleanField( this, name, data ? data[ord] : undefined );

		if( typ === zz.model.FieldTypes.NUMBER )

			zz.model.setupNumberField( this, name, data ? data[ord] : undefined );

		if( typ === zz.model.FieldTypes.STRING )

			zz.model.setupStringField( this, name, data ? data[ord] : undefined );

		if( goog.isFunction( typ ) )

			zz.model.setupSetField( this, name, typ, data ? data[ord] : undefined );

	}, this );
};
goog.inherits( zz.model.Row, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return schema object.
 * @return {Object} Item Schema object.
 * @override
 */
zz.model.Row.prototype.getSchema = function( ){

	throw new TypeError( zz.model.Error.ROW_SCHEMA_NOT_IMPLEMENT );
};
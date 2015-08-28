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
 * @fileoverview Provide zz.model.BaseItem class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.BaseItem' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.object' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.model' );
goog.require( 'zz.model.IDataItem' );
goog.require( 'zz.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements zz.model.IDataItem
 * @param {Array} data
 */
zz.model.BaseItem = function( data ){

	goog.events.EventTarget.call( this );
	goog.object.forEach( this.getSchema( ), function( meta, name ){

		var ord = /** @type {number} */ (meta[0]);
		var typ = /** @type {zz.model.FieldTypes} */ meta[1];
		var req = /** @type {boolean} */ meta[2];

		if( goog.isDef( data ) && req && !goog.isDefAndNotNull( data[ord] ) )

			throw new TypeError( 'Missing required field' );

		if( typ === zz.model.FieldTypes.BOOLEAN )

			zz.model.setupBooleanField( this, name, data ? data[ord] : undefined );

		if( typ === zz.model.FieldTypes.NUMBER )

			zz.model.setupNumberField( this, name, data ? data[ord] : undefined );

		if( typ === zz.model.FieldTypes.STRING )

			zz.model.setupStringField( this, name, data ? data[ord] : undefined );

	}, this );
};
goog.inherits( zz.model.BaseItem, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * This method must to return DataItem schema object. But it doesn't return anything in zz.model.BaseItem class.
 * @return {Object} DataItem Schema object.
 * @override
 */
zz.model.BaseItem.prototype.getSchema = goog.nullFunction;
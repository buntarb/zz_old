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

goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.events.EventTarget' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {Array} data
 */
zz.model.BaseItem = function( data ){

	goog.events.EventTarget.call( this );
	this.data_ = goog.isArray( data ) ? data : [];
	this.parseData_( );
};
goog.inherits( zz.model.BaseItem, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * @type {boolean}
 * @protected
 */
zz.model.BaseItem.prototype._new_;

/**
* @type {Array}
* @protected
*/
zz.model.BaseItem.prototype._data_;

/**
* @type {Object}
* @protected
*/
zz.model.BaseItem.prototype._schema_;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
* @private
*/
zz.model.BaseItem.prototype.parseData_ = function( ){

	if( !this._new_ ){

		this._new_ = true;
		goog.object.forEach( this._schema_, function( metaData, metaName ){

			var order = metaData[0];
			var type = metaData[1];
			var require = metaData[2];

			// Metadata type checking
			if( metaData.length !== 3 ||
				!goog.isNumber( order ) ||
				!goog.isString( type ) ||
				!( type !== 'object' && goog.isBoolean( require ) ) ||
				!( type === 'object' && goog.isObject( require ) ) ){

				throw new TypeError( 'Incorrect metadata.' );
			}

			if( this.data_ ){

				// Type checking
				if( require && !goog.isDefAndNotNull( this.data_[order] ) ){

					throw new TypeError( 'Missing required field' );
				}
				if( type === 'boolean' && goog.isBoolean( this.data_[order] ) ){

					throw new TypeError( 'Type mismatch. Need to be boolean. Got ' + typeof this.data_[order] + '.' );
				}
				if( type === 'number' && !goog.isNumber( this.data_[order] ) ){

					throw new TypeError( 'Type mismatch. Need to be number. Got ' + typeof this.data_[order] + '.' );
				}
				if( type === 'string' && !goog.isString( this.data_[order] ) ){

					throw new TypeError( 'Type mismatch. Need to be string. Got ' + typeof this.data_[order] + '.' );
				}
				if( type === 'object' && !goog.isArray( this.data_[order] ) ){

					throw new TypeError( 'Type mismatch. Need to be array. Got ' + typeof this.data_[order] + '.' );
				}

				// Setup model
				if( type !== 'object' ){

					this[metaName] = this.data_[order] || null;

				}else{

					this[metaName] = [];

					if( goog.isDef( this.data_[order] ) && this.data_[order].length > 0 ){

						goog.array.forEach( this.data_[order], function( data ){

							this[metaName].push( new type( data ) );
						} );
					}
				}
			}else{

				this[metaName] = type === 'object' ? [] : null;
			}
		}, this );
	}
};
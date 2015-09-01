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
 * @fileoverview Provide zz.model.Set class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Set' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.model' );
goog.require( 'zz.model.Error' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {Function} type
 * @param {Array} data
 */
zz.model.Set = function( type, data ){

	/**
	 * Current set row constructor.
	 * @type {*}
	 * @private
	 */
	this.type_ = type;
	goog.events.EventTarget.call( this );
	goog.array.forEach( data, function( row ){

		this.createLast( row );

	}, this );
};
goog.inherits( zz.model.Set, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Create new row at the first position.
 * @param {Array} data
 * @returns {*}
 */
zz.model.Set.prototype.createFirst = function( data ){

	var row = new this.type_( data );
	Array.prototype.unshift.call( this, row );
	return row;
};

/**
 * Create new row at the first position.
 * @param {Array} data
 * @returns {*}
 */
zz.model.Set.prototype.createLast = function( data ){

	var row = new this.type_( data );
	Array.prototype.push.call( this, row );
	return row;
};
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
 * @fileoverview Provide zz.model.Dataset class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Dataset' );

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
 * @param {?goog.events.EventTarget} opt_parent
 * @param {?Array.<Array>} opt_data
 */
zz.model.Dataset = function( opt_parent, opt_data ){

	goog.events.EventTarget.call( this );

	if( opt_parent )

		this.setParentEventTarget( opt_parent );

	goog.array.forEach( opt_data, function( datarow ){

		this.createLast( datarow );

	}, this );
};
goog.inherits( zz.model.Dataset, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Current dataset row type.
 * @type {zz.model.Datarow}
 * @param {zz.model.Dataset} dataset
 * @param {Array} data
 */
zz.model.Dataset.prototype.datarow = function( dataset, data ){

	throw new TypeError( zz.model.Error.DATAROW_TYPE_UNDEFINED );
};

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Create new row at the first position.
 * @param {Array} data
 * @returns {*}
 */
zz.model.Dataset.prototype.createFirst = function( data ){

	var row = new this.datarow( this, data );
	Array.prototype.unshift.call( this, row );
	return row;
};

/**
 * Create new row at the first position.
 * @param {Array} data
 * @returns {*}
 */
zz.model.Dataset.prototype.createLast = function( data ){

	var row = new this.datarow( this, data );
	Array.prototype.push.call( this, row );
	return row;
};
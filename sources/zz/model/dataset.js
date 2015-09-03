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
	this.index_ = this.length > 0 ? 0 : undefined;
};
goog.inherits( zz.model.Dataset, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Dataset cursor current position.
 * @type {number}
 * @private
 */
zz.model.Dataset.prototype.index_ = undefined;

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
	this.index_ = 0;
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
	this.index_ = this.length - 1;
	return row;
};

/**
 * Delete first datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.model.Dataset.prototype.deleteFirst = function( ){

	if( this.length > 0 ){

		Array.prototype.shift.call( this );
		this.index_ = this.length > 0 ? 0 : undefined;
		return true;

	}else{

		return false;
	}
};

/**
 * Delete last datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.model.Dataset.prototype.deleteLast = function( ){

	if( this.length > 0 ){

		Array.prototype.pop.call( this );
		this.index_ = this.length > 0 ? ( this.length - 1 ) : undefined;
		return true;

	}else{

		return false;
	}
};

/**
 * Delete current datarow from dataset if exist.
 * @returns {boolean}
 */
zz.model.Dataset.prototype.deleteCurrent = function( ){

	if( goog.isDef( this.index_ ) && goog.isNumber( this.index_ ) ){

		Array.prototype.splice.call( this, this.index_, 1 );
		this.index_ = this.index_ < this.length ? this.index_ :

			this.length > 0 ? this.index_ - 1 : undefined;

		return true;

	}else{

		return false;
	}
};

/**
 * Return datarow index by specified unique id.
 * @param {string} id
 * @returns {number|undefined}
 */
zz.model.Dataset.prototype.getIndexByUniqueId = function( id ){

	var index = undefined;
	if( this.length > 0 ){

		goog.array.forEach( this, function( datarow, key ){

			if( datarow.getUniqueId( ) === id ){

				this.index_ = key;
				index = key;
			}
		}, this );
	}
	return index;
};

/**
 * Return first datarow from current dataset if it exists, false otherwise.
 * @returns {zz.model.Datarow|boolean}
 */
zz.model.Dataset.prototype.firstDatarow = function( ){

	this.index_ = this.length > 0 ? 0 : undefined;

	if( goog.isDef( this.index_ ) ){

		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return last datarow from current dataset if it exists, false otherwise.
 * @returns {zz.model.Datarow|boolean}
 */
zz.model.Dataset.prototype.lastDatarow = function( ){

	this.index_ = this.length > 0 ? this.length - 1 : undefined;

	if( goog.isDef( this.index_ ) ){

		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return next datarow from current dataset if it exists, false otherwise.
 * @returns {zz.model.Datarow|boolean}
 */
zz.model.Dataset.prototype.nextDatarow = function( ){

	if( this.length > 0 && this.index_ < ( this.length - 1 ) ){

		this.index_++;
		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return next datarow from current dataset if it exists, false otherwise.
 * @returns {zz.model.Datarow|boolean}
 */
zz.model.Dataset.prototype.previousDatarow = function( ){

	if( this.length > 0 && this.index_ > 0 ){

		this.index_--;
		return this[this.index_];

	}else{

		return false;
	}
};
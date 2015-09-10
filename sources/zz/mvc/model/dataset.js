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
 * @fileoverview Provide zz.mvc.model.Dataset class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.model.Dataset' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.events.EventHandler' );
goog.require( 'zz.mvc.model' );
goog.require( 'zz.mvc.model.DatarowCreateEvent' );
goog.require( 'zz.mvc.model.DatarowDeleteEvent' );
goog.require( 'zz.mvc.model.Error' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {?goog.events.EventTarget} opt_parent
 * @param {?Array.<Array>} opt_data
 */
zz.mvc.model.Dataset = function( opt_parent, opt_data ){

	goog.events.EventTarget.call( this );

	/**
	 * Dataset cursor current position.
	 * @type {number}
	 * @private
	 */
	this.index_ = undefined;

	if( opt_parent ){

		this.setParentEventTarget( opt_parent );

	}else{

		this.enableHandleDatarowEvents( true );
	}
	goog.array.forEach( opt_data || [], function( datarow ){

		this.createLast( datarow );

	}, this );

	this.index_ = this.length > 0 ? 0 : undefined;
};
goog.inherits( zz.mvc.model.Dataset, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Capture flag (default - false).
 * @type {boolean}
 */
zz.mvc.model.Dataset.prototype.bindCaptureFlag = false;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Current dataset row type.
 * @constructor
 * @private
 * @type {zz.mvc.model.Datarow}
 * @param {zz.mvc.model.Dataset} dataset
 * @param {Array} data
 */
zz.mvc.model.Dataset.prototype.Datarow_ = function( dataset, data ){

	throw new TypeError( zz.mvc.model.Error.DATAROW_TYPE_UNDEFINED );
};

/** @inheritDoc */
zz.mvc.model.Dataset.prototype.disposeInternal = function( ){

	zz.mvc.model.Dataset.superClass_.disposeInternal.call( this );
	if( this.handler_ ){

		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**
 * Returns the event handler for this dataset, lazily created the first time
 * this method is called.
 * @return {!goog.events.EventHandler} Event handler for this dataset.
 * @protected
 */
zz.mvc.model.Dataset.prototype.getHandler = function( ){

	if( !this.handler_ ){

		this.handler_ = new goog.events.EventHandler( this );
	}
	return this.handler_;
};

/**
 * Model datarow update event handler.
 * @param {zz.mvc.model.DatarowUpdateEvent} evt
 */
zz.mvc.model.Dataset.prototype.handleDatarowUpdateEvent = function( evt ){

	var ctrlArray = evt.target.getControlsByFieldName( goog.object.getKeys( evt.changes )[0] );
	goog.array.forEach( ctrlArray, /** @type {zz.ui.Control|undefined} */ function( ctrl ){

		if( ctrl ) ctrl.handleDatarowUpdateEvent( evt );
	} );
};

/**
 * Model datarow delete event handler.
 * @param {zz.mvc.model.DatarowDeleteEvent} evt
 * @private
 */
zz.mvc.model.Dataset.prototype.handleDatarowDeleteEvent = function( evt ){

	var ctrlArray = evt.getDeletedDatarow( ).getControls( );
	goog.array.forEach( ctrlArray, /** @type {zz.ui.Control|undefined} */ function( ctrl ){

		if( ctrl )

			ctrl.handleDatarowDeleteEvent( evt );
	} );
};

/**
 * Add model-control binding.
 */
zz.mvc.model.Dataset.prototype.enableHandleDatarowEvents = function( enable ){

	if( enable ){

		if( !this.handler_ ){

			this.getHandler( ).listenWithScope(

				this,
				zz.mvc.model.EventType.DATAROW_UPDATE,
				this.handleDatarowUpdateEvent,
				this.bindCaptureFlag,
				this
			);
			this.getHandler( ).listenWithScope(

				this,
				zz.mvc.model.EventType.DATAROW_DELETE,
				this.handleDatarowDeleteEvent,
				this.bindCaptureFlag,
				this
			);
		}
	}else{

		this.getHandler( ).unlisten(

			this,
			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.handleDatarowUpdateEvent,
			this.bindCaptureFlag,
			this
		);
		this.getHandler( ).unlisten(

			this,
			zz.mvc.model.EventType.DATAROW_DELETE,
			this.handleDatarowDeleteEvent,
			this.bindCaptureFlag,
			this
		);
		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**********************************************************************************************************************
 * Navigation                                                                                                         *
 **********************************************************************************************************************/

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {*}
 */
zz.mvc.model.Dataset.prototype.createFirst = function( opt_data ){

	var row = new this.Datarow_( this, opt_data );
	Array.prototype.unshift.call( this, row );
	this.index_ = 0;
	goog.async.run( function( ){

		row.dispatchEvent( new zz.mvc.model.DatarowCreateEvent( row ) );
	} );
	return row;
};

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {*}
 */
zz.mvc.model.Dataset.prototype.createLast = function( opt_data ){

	var row = new this.Datarow_( this, opt_data );
	Array.prototype.push.call( this, row );
	this.index_ = this.length - 1;
	goog.async.run( function( ){

		row.dispatchEvent( new zz.mvc.model.DatarowCreateEvent( row ) );
	} );
	return row;
};

/**
 * Delete first datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteFirst = function( ){

	if( this.length > 0 ){

		var datarow = Array.prototype.shift.call( this );
		this.index_ = this.length > 0 ? 0 : undefined;
		goog.async.run( function( ){

			datarow.dispose( );
			this.dispatchEvent( new zz.mvc.model.DatarowDeleteEvent( this, datarow ) );

		}, this );
		return true;

	}else{

		return false;
	}
};

/**
 * Delete last datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteLast = function( ){

	if( this.length > 0 ){

		var datarow = Array.prototype.pop.call( this );
		this.index_ = this.length > 0 ? ( this.length - 1 ) : undefined;
		goog.async.run( function( ){

			datarow.dispose( );
			this.dispatchEvent( new zz.mvc.model.DatarowDeleteEvent( this, datarow ) );

		}, this );
		return true;

	}else{

		return false;
	}
};

/**
 * Delete current datarow from dataset if exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteCurrent = function( ){

	if( goog.isDef( this.index_ ) && goog.isNumber( this.index_ ) ){

		var datarow = Array.prototype.splice.call( this, this.index_, 1 )[0];
		this.index_ = this.index_ < this.length ? this.index_ :

			this.length > 0 ? this.index_ - 1 : undefined;

		goog.async.run( function( ){

			datarow.dispose( );
			this.dispatchEvent( new zz.mvc.model.DatarowDeleteEvent( this, datarow ) );

		}, this );
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
zz.mvc.model.Dataset.prototype.getIndexById = function( id ){

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
 * @returns {zz.mvc.model.Datarow|boolean}
 */
zz.mvc.model.Dataset.prototype.firstDatarow = function( ){

	this.index_ = this.length > 0 ? 0 : undefined;

	if( goog.isDef( this.index_ ) ){

		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return last datarow from current dataset if it exists, false otherwise.
 * @returns {zz.mvc.model.Datarow|boolean}
 */
zz.mvc.model.Dataset.prototype.lastDatarow = function( ){

	this.index_ = this.length > 0 ? this.length - 1 : undefined;

	if( goog.isDef( this.index_ ) ){

		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return next datarow from current dataset if it exists, false otherwise.
 * @returns {zz.mvc.model.Datarow|boolean}
 */
zz.mvc.model.Dataset.prototype.nextDatarow = function( ){

	if( this.length > 0 && this.index_ < ( this.length - 1 ) ){

		this.index_++;
		return this[this.index_];

	}else{

		return false;
	}
};

/**
 * Return next datarow from current dataset if it exists, false otherwise.
 * @returns {zz.mvc.model.Datarow|boolean}
 */
zz.mvc.model.Dataset.prototype.previousDatarow = function( ){

	if( this.length > 0 && this.index_ > 0 ){

		this.index_--;
		return this[this.index_];

	}else{

		return false;
	}
};
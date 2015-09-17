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
 * @param {?zz.mvc.model.Dataset} opt_parent
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

	/**
	 * Datarow fields indexes array.
	 * TODO (buntarb): Did we need this property?
	 * @type {Array}
	 * @private
	 */
	this.fieldIndex_ = [];

	// Creating fields index.
	goog.object.forEach( this.getDatarowSchema( ), function( meta, name ){

		this.fieldIndex_[meta.index] = name;

	}, this );

	// Setting up parent event target...
	if( opt_parent ){

		this.setParentEventTarget( opt_parent );

	// ...or enable datarow events handling.
	}else{

		this.enableHandlingInternal( );
	}

	// De-serialize incoming array.
	goog.array.forEach( opt_data || [], function( datarow ){

		this.createLast( datarow );

	}, this );

	// Go to first datarow if exist.
	this.index_ = this.length > 0 ? 0 : undefined;
};
goog.inherits( zz.mvc.model.Dataset, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Capture flag (default - false).
 * @type {boolean}
 * @private
 */
zz.mvc.model.Dataset.prototype.capture_ = false;

/**********************************************************************************************************************
 * Data definition section                                                                                            *
 **********************************************************************************************************************/

/**
 * Current dataset row type.
 * @constructor
 * @type {zz.mvc.model.Datarow}
 * @param {zz.mvc.model.Dataset} dataset
 * @param {Array} data
 */
zz.mvc.model.Dataset.prototype.DatarowConstructor = function( dataset, data ){

	throw new TypeError( zz.mvc.model.Error.DATAROW_TYPE_UNDEFINED );
};

/**
 * Return schema object.
 * @return {Object} Item Schema object.
 * @override
 */
zz.mvc.model.Dataset.prototype.getDatarowSchema = function( ){

	throw new TypeError( zz.mvc.model.Error.DATAROW_SCHEMA_UNDEFINED );
};

/**********************************************************************************************************************
 * Event management section                                                                                           *
 **********************************************************************************************************************/

/** @inheritDoc */
zz.mvc.model.Dataset.prototype.disposeInternal = function( ){

	zz.mvc.model.Dataset.superClass_.disposeInternal.call( this );
	if( this.handler_ ){

		this.disableHandlingInternal( );
		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**
 * Returns the event handler for this dataset, lazily created the first time
 * this method is called.
 * @return {!goog.events.EventHandler} Event handler for this dataset.
 */
zz.mvc.model.Dataset.prototype.getEventHandler = function( ){

	if( !this.handler_ ){

		/**
		 * Dataset event handler.
		 * @type {goog.events.EventHandler}
		 * @private
		 */
		this.handler_ = new goog.events.EventHandler( this );
	}
	return this.handler_;
};

/**
 * Model datarow update event handler.
 * @param {zz.mvc.model.DatarowUpdateEvent} evt
 */
zz.mvc.model.Dataset.prototype.handleDatarowCreateEvent = function( evt ){

	console.log( evt );

//	var ctrlArray = evt.target.getControlsByFieldName( goog.object.getKeys( evt.changes )[0] );
//	goog.array.forEach( ctrlArray, /** @type {zz.ui.Control|undefined} */ function( ctrl ){
//
//		if( ctrl ) ctrl.handleDatarowUpdateEvent( evt );
//	} );
};

/**
 * Model datarow update event handler.
 * @param {zz.mvc.model.DatarowUpdateEvent} evt
 */
zz.mvc.model.Dataset.prototype.handleDatarowUpdateEvent = function( evt ){

	console.log( evt );

//	var ctrlArray = evt.target.getControlsByFieldName( goog.object.getKeys( evt.changes )[0] );
//	goog.array.forEach( ctrlArray, /** @type {zz.ui.Control|undefined} */ function( ctrl ){
//
//		if( ctrl ) ctrl.handleDatarowUpdateEvent( evt );
//	} );
};

/**
 * Model datarow delete event handler.
 * @param {zz.mvc.model.DatarowDeleteEvent} evt
 */
zz.mvc.model.Dataset.prototype.handleDatarowDeleteEvent = function( evt ){

	console.log( evt );

//	var ctrlArray = evt.getDeletedDatarow( ).getControls( );
//	goog.array.forEach( ctrlArray, /** @type {zz.ui.Control|undefined} */ function( ctrl ){
//
//		if( ctrl )
//
//			ctrl.handleDatarowDeleteEvent( evt );
//	} );
};

/**
 * Enable datarow events internal handling.
 * @protected
 */
zz.mvc.model.Dataset.prototype.enableHandlingInternal = function( ){

	if( !this.handler_ ){

		this.getEventHandler( ).listenWithScope(

			this,
			zz.mvc.model.EventType.DATAROW_CREATE,
			this.handleDatarowCreateEvent,
			this.capture_,
			this
		);
		this.getEventHandler( ).listenWithScope(

			this,
			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.handleDatarowUpdateEvent,
			this.capture_,
			this
		);
		this.getEventHandler( ).listenWithScope(

			this,
			zz.mvc.model.EventType.DATAROW_DELETE,
			this.handleDatarowDeleteEvent,
			this.capture_,
			this
		);
	}
};

/**
 * Disable datarow events internal handling.
 * @protected
 */
zz.mvc.model.Dataset.prototype.disableHandlingInternal = function( ){

	this.getEventHandler( ).unlisten(

		this,
		zz.mvc.model.EventType.DATAROW_CREATE,
		this.handleDatarowCreateEvent,
		this.capture_,
		this
	);
	this.getEventHandler( ).unlisten(

		this,
		zz.mvc.model.EventType.DATAROW_UPDATE,
		this.handleDatarowUpdateEvent,
		this.capture_,
		this
	);
	this.getEventHandler( ).unlisten(

		this,
		zz.mvc.model.EventType.DATAROW_DELETE,
		this.handleDatarowDeleteEvent,
		this.capture_,
		this
	);
};

/**********************************************************************************************************************
 * Data manipulation section                                                                                          *
 **********************************************************************************************************************/

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {*}
 */
zz.mvc.model.Dataset.prototype.createFirst = function( opt_data ){

	return this.createAt( 0, opt_data );
};

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {*}
 */
zz.mvc.model.Dataset.prototype.createLast = function( opt_data ){

	return this.createAt( this.length || 0, opt_data );
};

/**
 * Create new datarow with specified index.
 * @param {number} index
 * @param {Array=} opt_data
 * @returns {*}
 */
zz.mvc.model.Dataset.prototype.createAt = function( index, opt_data ){

	var datarow = /** @type {zz.mvc.model.Datarow} */ ( new this.DatarowConstructor( this, opt_data ) );
	this.index_ = index < 0 ? 0 : index > this.length ? this.length : index;
	Array.prototype.splice.call( this, this.index_, 0, datarow );
	goog.async.run( function( ){

		this.dispatchEvent( new zz.mvc.model.DatarowCreateEvent( this, datarow ) );

	}, this );
	return datarow;
};

/**
 * Delete first datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteFirst = function( ){

	return this.deleteAt( 0 );
};

/**
 * Delete last datarow from dataset if it exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteLast = function( ){

	return this.deleteAt( this.length - 1 );
};

/**
 * Delete current datarow from dataset if exist.
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteCurrent = function( ){

	return this.deleteAt( this.index_ );
};

/**
 * Delete datarow with specified index.
 * @param {number} index
 * @returns {boolean}
 */
zz.mvc.model.Dataset.prototype.deleteAt = function( index ){

	if( this.length > 0 && index >= 0 && index < this.length ){

		var datarow = Array.prototype.splice.call( this, index, 1 );
		this.index_ = this.length > index ? index : this.length > 0 ? this.length - 1 : undefined;
		goog.async.run( function( ){

			this.dispatchEvent( new zz.mvc.model.DatarowDeleteEvent( this, datarow ) );

		}, this );
		return true;

	}else{

		return false;
	}
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
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
goog.require( 'goog.pubsub.PubSub' );
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.events.EventHandler' );
goog.require( 'zz.mvc.model' );
goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.events.DatarowCreate' );
goog.require( 'zz.events.DatarowDelete' );
goog.require( 'zz.mvc.model.Error' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {?zz.mvc.model.Dataset} opt_parent
 * @param {?Array<Array>} opt_data
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
	 * Current dataset fields publisher topics.
	 * @type {{string:goog.pubsub.TopicId}}
	 */
	this.datafield = { };

	/**
	 * Dataset publish/subscribe channel.
	 * @type {goog.pubsub.PubSub}
	 * @private
	 */
	this.pubsub_ = new goog.pubsub.PubSub( );

	// Generating UID.
	goog.getUid( this );

	// Creating PubSub topics.
	goog.object.forEach( this.getDatarowSchema( ), function( meta, name ){

		this.datafield[ name ] = name;

	}, this );

	// Setting up parent event target.
	if( opt_parent ){

		this.setParentEventTarget( opt_parent );
	}

	// De-serialize incoming array.
	goog.array.forEach( opt_data || [ ], function( datarow ){

		this.createLast( datarow );

	}, this );

	// Go to first datarow if exist.
	this.index_ = this.length > 0 ? 0 : undefined;
};
goog.inherits( zz.mvc.model.Dataset, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Data definition section                                                                                            *
 **********************************************************************************************************************/

/**
 * Return current dataset unique ID.
 * @returns {number}
 */
zz.mvc.model.Dataset.prototype.getUid = function( ){

	return goog.getUid( this );
};

//noinspection JSUnusedLocalSymbols
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

/**
 * Serialize specified datarow.
 * @param {number} index
 * @param {boolean=} opt_object
 * @returns {Object|Array}
 */
zz.mvc.model.Dataset.prototype.serializeDatarow = function( index, opt_object ){

	var res = opt_object ? { } : [ ];
	goog.object.forEach( this.getDatarowSchema( ), function( meta, name ){

		var indx = /** @type {number} */ (meta.index);
		var type = /** @type {zz.mvc.model.FieldTypes|Function} */ (meta.type);

		res[ opt_object ? name : indx ] = !goog.isFunction( type ) ?

			this[ index ][ name ] :
			this[ index ][ name ].serializeDataset( opt_object );

	}, this );
	return res;
};

/**
 * Serialize current dataset.
 * @param {boolean=} opt_object
 * @returns {Array}
 */
zz.mvc.model.Dataset.prototype.serializeDataset = function( opt_object ){

	var res = [ ];
	for( var i = 0; i < this.length; i++ ){

		res.push( this.serializeDatarow( i, opt_object ) );
	}
	return res;
};

/**********************************************************************************************************************
 * Event management section                                                                                           *
 **********************************************************************************************************************/

/** @inheritDoc */
zz.mvc.model.Dataset.prototype.disposeInternal = function( ){

	zz.mvc.model.Dataset.superClass_.disposeInternal.call( this );
	this.pubsub_.dispose( );
	delete this.pubsub_;
	if( this.handler_ ){

		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**
 * Returns the event handler for this dataset, lazily created the first time this method is called.
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
 * PubSub listener.
 * TODO (buntarb): Do something with this type notice.
 * @param {!zz.mvc.model.Message} message
 * @this {zz.mvc.view.BaseView|zz.ui.LabelInput}
 * @private
 */
zz.mvc.model.Dataset.prototype.notifyFieldSubscribers_ = function( message ){

	this.modelChanged( message );
};

/**
 * Subscribe view to model changes.
 * @param {!zz.mvc.view.BaseView|!zz.ui.LabelInput} subscriber
 */
zz.mvc.model.Dataset.prototype.subscribe = function( subscriber ){

	var model = subscriber.getModel( );
	if( goog.isDef( model.datafield ) ){

		this.pubsub_.subscribe(

			'DS#' + this.getUid( ) + 'DR#' + model.datarow.getUid( ) + 'DF#' + this.datafield[ model.datafield ],
			this.notifyFieldSubscribers_,
			subscriber
		);
	}
	if( goog.isDef( model.datarow ) && !goog.isDef( model.datafield ) ){

		this.pubsub_.subscribe(

			'DR#' + model.datarow.getUid( ),
			this.notifyFieldSubscribers_,
			subscriber );
	}
	if( !goog.isDef( model.datarow ) && !goog.isDef( model.datafield ) ){

		this.pubsub_.subscribe(

			'DS#' + this.getUid( ),
			this.notifyFieldSubscribers_,
			subscriber );
	}
};

/**
 * Unsubscribe view from model changes.
 * @param {!zz.mvc.view.BaseView|!zz.ui.LabelInput} subscriber
 */
zz.mvc.model.Dataset.prototype.unsubscribe = function( subscriber ){

	var model = subscriber.getModel( );
	if( goog.isDef( model.datafield ) ){

		this.pubsub_.unsubscribe(

			'DS#' + this.getUid( ) + 'DR#' + model.datarow.getUid( ) + 'DF#' + this.datafield[ model.datafield ],
			this.notifyFieldSubscribers_,
			subscriber );
	}
	if( goog.isDef( model.datarow ) && !goog.isDef( model.datafield ) ){

		this.pubsub_.unsubscribe(

			'DR#' + model.datarow.getUid( ),
			this.notifyFieldSubscribers_,
			subscriber );
	}
	if( !goog.isDef( model.datarow ) && !goog.isDef( model.datafield ) ){

		this.pubsub_.unsubscribe(

			'DS#' + this.getUid( ),
			this.notifyFieldSubscribers_,
			subscriber );
	}
};

/**
 * Publish datafield changes.
 * @param {zz.mvc.model.Message} message
 */
zz.mvc.model.Dataset.prototype.publish = function( message ){

	if( goog.isDef( message.datafield ) ){

		this.pubsub_.publish(

			'DS#' + this.getUid( ) + 'DR#' + message.datarow.getUid( ) + 'DF#' + this.datafield[ message.datafield ],
			message
		);
	}
	this.pubsub_.publish( 'DR#' + message.datarow.getUid( ), message );
	this.pubsub_.publish( 'DS#' + this.getUid( ), message );
	if( this.getParentEventTarget( ) ){

		message.setParentDataset( /** @type {zz.mvc.model.Dataset} */( this.getParentEventTarget( ) ) );
		this.getParentEventTarget( ).publish( message );
	}
};

/**********************************************************************************************************************
 * Data manipulation section                                                                                          *
 **********************************************************************************************************************/

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {zz.mvc.model.Datarow}
 */
zz.mvc.model.Dataset.prototype.createFirst = function( opt_data ){

	return this.createAt( 0, opt_data );
};

/**
 * Create new row at the first position.
 * @param {Array=} opt_data
 * @returns {zz.mvc.model.Datarow}
 */
zz.mvc.model.Dataset.prototype.createLast = function( opt_data ){

	return this.createAt( this.length || 0, opt_data );
};

/**
 * Create new datarow with specified index.
 * @param {number} index
 * @param {Array=} opt_data
 * @returns {zz.mvc.model.Datarow}
 */
zz.mvc.model.Dataset.prototype.createAt = function( index, opt_data ){

	var datarow = /** @type {zz.mvc.model.Datarow} */ ( new this.DatarowConstructor( this, opt_data ) );
	var message = new zz.mvc.model.Message(

		zz.mvc.model.EventType.DATAROW_CREATE,
		this,
		datarow
	);
	this.index_ = index < 0 ? 0 : index > this.length ? this.length : index;
	Array.prototype.splice.call( this, this.index_, 0, datarow );
	this.publish( message );
	goog.async.run( function( ){

		this.dispatchEvent( new zz.events.DatarowCreate( message ) );

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
		var message = new zz.mvc.model.Message(

			zz.mvc.model.EventType.DATAROW_CREATE,
			this,
			datarow
		);
		this.index_ = this.length > index ? index : this.length > 0 ? this.length - 1 : undefined;
		this.publish( message );
		goog.async.run( function( ){

			this.dispatchEvent( new zz.events.DatarowDelete( message ) );

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
 * Return current datarow from dataset if it exists, false otherwise.
 * @returns {zz.mvc.model.Datarow|boolean}
 */
zz.mvc.model.Dataset.prototype.currentDatarow = function( ){

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
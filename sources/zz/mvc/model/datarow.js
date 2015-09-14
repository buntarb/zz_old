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
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.mvc.model' );
goog.require( 'zz.mvc.model.Error' );
goog.require( 'zz.mvc.model.IDatarow' );
goog.require( 'zz.mvc.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements zz.mvc.model.IDatarow
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {?Array} opt_data
 */
zz.mvc.model.Datarow = function( dataset, opt_data ){

	goog.events.EventTarget.call( this );
	this.setParentEventTarget( dataset );

	/**
	 * Current datarow unique ID.
	 * @type {string}
	 * @private
	 */
	this.datarowId_ = zz.mvc.model.getUniqueDatarowId( );

	goog.object.forEach( this.getSchema_( ), function( meta, name ){

		var idx = /** @type {number} */ (meta.index);
		var typ = /** @type {zz.mvc.model.FieldTypes|Function} */ (meta.type);
		var req = /** @type {boolean} */ (meta.required);

		if( goog.isDef( opt_data ) && req && !goog.isDefAndNotNull( opt_data[idx] ) )

			throw new TypeError( zz.mvc.model.Error.FIELD_REQUIRED );

		if( typ === zz.mvc.model.FieldTypes.BOOLEAN )

			zz.mvc.model.setupBooleanField( this, name, req, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.mvc.model.FieldTypes.NUMBER )

			zz.mvc.model.setupNumberField( this, name, req, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.mvc.model.FieldTypes.STRING )

			zz.mvc.model.setupStringField( this, name, req, opt_data ? opt_data[idx] : undefined );

		if( goog.isFunction( typ ) )

			zz.mvc.model.setupDatasetField( this, name, typ, opt_data ? opt_data[idx] : undefined );

		this.fieldToIndex_[idx] = name;

	}, this );
};
goog.inherits( zz.mvc.model.Datarow, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * @type {Array}
 * @private
 */
zz.mvc.model.Datarow.prototype.fieldToIndex_ = [];

/**
 * @type {Object}
 * @private
 */
zz.mvc.model.Datarow.prototype.fieldController_ = {};

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Returns the event handler for this datarow, lazily created the first time this method is called.
 * @return {!goog.events.EventHandler} Event handler for this datarow.
 */
zz.mvc.model.Datarow.prototype.getHandler = function( ){

	if( !this.handler_ ){

		this.handler_ = new goog.events.EventHandler( this );
	}
	return this.handler_;
};

/** @inheritDoc */
zz.mvc.model.Datarow.prototype.disposeInternal = function( ){

	zz.mvc.model.Datarow.superClass_.disposeInternal.call( this );
	if( this.handler_ ){

		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**
 * Return schema object.
 * @return {Object} Item Schema object.
 * @private
 * @override
 */
zz.mvc.model.Datarow.prototype.getSchema_ = function( ){

	throw new TypeError( zz.mvc.model.Error.DATAROW_SCHEMA_UNDEFINED );
};

/**
 * Return current datarow unique ID.
 * @returns {string}
 */
zz.mvc.model.Datarow.prototype.getId = function( ){

	return this.datarowId_;
};

/**
 * Set specified id to current datarow. Note: id must to be globally unique.
 * @param {string} id
 */
zz.mvc.model.Datarow.prototype.setId = function( id ){

	this.datarowId_ = id;
};

/**
 * Return field name by specified index, false otherwise.
 * @param {number} index
 * @return {string}
 */
zz.mvc.model.Datarow.prototype.getFieldNameByIndex = function( index ){

	return this.fieldToIndex_[index];
};

/**
 * Return field type by specified field index.
 * @param {number} index
 * @returns {string}
 */
zz.mvc.model.Datarow.prototype.getFieldTypeByIndex = function( index ){

	return this.getSchema_( )[this.getFieldNameByIndex( index )].type;
};

/**
 * Return field required flag by specified field index.
 * @param {number} index
 * @returns {boolean}
 */
zz.mvc.model.Datarow.prototype.getFieldRequiredFlagByIndex = function( index ){

	return this.getSchema_( )[this.getFieldNameByIndex( index )].required;
};

/**
 * Add new control to model field.
 * @param {number} index
 * @param {zz.ui.Control} control
 * @return {number} Index of controller.
 */
zz.mvc.model.Datarow.prototype.addFieldControl = function( index, control ){

	if( !goog.isDef( this.fieldController_[ this.getFieldNameByIndex( index ) ] ) ){

		this.fieldController_[ this.getFieldNameByIndex( index ) ] = [ ];
	}
	return this.fieldController_[ this.getFieldNameByIndex( index ) ].push( control ) - 1;
};

/**
 * Return all controls binding with current field.
 * @param {string} fieldName
 * @returns {Array}
 */
zz.mvc.model.Datarow.prototype.getControlsByFieldName = function( fieldName ){

	return this.fieldController_[ fieldName ];
};

/**
 * Return all controls binding with current datarow.
 * @returns {Array}
 */
zz.mvc.model.Datarow.prototype.getControls = function( ){

	var controls = [];
	goog.object.forEach( this.fieldController_, function( ctrlSet ){

		controls = controls.concat( ctrlSet );
	} );
	return controls;
};

/**
 * Set specified by index control to undefined.
 * @param {number} fieldIndex
 * @param {number} controlIndex
 */
zz.mvc.model.Datarow.prototype.removeFieldControl = function( fieldIndex, controlIndex ){

	if( goog.isDef( this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ] ) &&
		goog.isDef( this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ] ) ){

		this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ] = undefined;
		delete this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ];
	}
};
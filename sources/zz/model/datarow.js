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
 * @fileoverview Provide zz.model.Datarow class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Datarow' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.object' );
goog.require( 'goog.async.run' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.model' );
goog.require( 'zz.model.Error' );
goog.require( 'zz.model.IDatarow' );
goog.require( 'zz.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

//noinspection JSClosureCompilerSyntax
/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements zz.model.IDatarow
 * @param {!zz.model.Dataset} dataset
 * @param {?Array} opt_data
 */
zz.model.Datarow = function( dataset, opt_data ){

	goog.events.EventTarget.call( this );
	this.setParentEventTarget( dataset );

	/**
	 * Current datarow unique ID.
	 * @type {string}
	 * @private
	 */
	this.datarowId_ = zz.model.getUniqueDatarowId( );

	goog.object.forEach( this.getSchema_( ), function( meta, name ){

		var idx = /** @type {number} */ (meta.index);
		var typ = /** @type {zz.model.FieldTypes|Function} */ (meta.type);
		var req = /** @type {boolean} */ (meta.required);

		if( goog.isDef( opt_data ) && req && !goog.isDefAndNotNull( opt_data[idx] ) )

			throw new TypeError( zz.model.Error.FIELD_REQUIRED );

		if( typ === zz.model.FieldTypes.BOOLEAN )

			zz.model.setupBooleanField( this, name, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.model.FieldTypes.NUMBER )

			zz.model.setupNumberField( this, name, opt_data ? opt_data[idx] : undefined );

		if( typ === zz.model.FieldTypes.STRING )

			zz.model.setupStringField( this, name, opt_data ? opt_data[idx] : undefined );

		if( goog.isFunction( typ ) )

			zz.model.setupDatasetField( this, name, typ, opt_data ? opt_data[idx] : undefined );

		this.fieldToIndex_[idx] = name;

	}, this );
};
goog.inherits( zz.model.Datarow, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * @type {Array}
 * @private
 */
zz.model.Datarow.prototype.fieldToIndex_ = [];

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return schema object.
 * @return {Object} Item Schema object.
 * @private
 * @override
 */
zz.model.Datarow.prototype.getSchema_ = function( ){

	throw new TypeError( zz.model.Error.DATAROW_SCHEMA_UNDEFINED );
};

/**
 * Return current datarow unique ID.
 * @returns {string}
 */
zz.model.Datarow.prototype.getId = function( ){

	return this.datarowId_;
};

/**
 * Set specified id to current datarow. Note: id must to be globally unique.
 * @param {string} id
 */
zz.model.Datarow.prototype.setId = function( id ){

	this.datarowId_ = id;
};

/**
 * Return field name by specified index, false otherwise.
 * @param {number} index
 * @return {string}
 */
zz.model.Datarow.prototype.getFieldNameByIndex = function( index ){

	return this.fieldToIndex_[index];
};

/**
 * Return field type by specified field index.
 * @param {number} index
 * @returns {string}
 */
zz.model.Datarow.prototype.getFieldTypeByIndex = function( index ){

	return this.getSchema_( )[this.getFieldNameByIndex( index )].type;
};

/**
 * Return field required flag by specified field index.
 * @param {number} index
 * @returns {boolean}
 */
zz.model.Datarow.prototype.getFieldRequiredFlagByIndex = function( index ){

	return this.getSchema_( )[this.getFieldNameByIndex( index )].required;
};
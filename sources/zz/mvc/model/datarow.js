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
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {?Array} opt_data
 */
zz.mvc.model.Datarow = function( dataset, opt_data ){

	/**
	 * Current datarow dataset object.
	 * @type {zz.mvc.model.Dataset}
	 * @private
	 */
	this.dataset_ = dataset;

	/**
	 * Current datarow unique ID.
	 * @type {string}
	 * @private
	 */
	this.id_ = zz.mvc.model.getUniqueDatarowId( );

//	/**
//	 * @type {Object}
//	 * @private
//	 */
//	this.fieldController_ = {};

	// Construct datarow object.
	goog.object.forEach( this.dataset_.getDatarowSchema( ), function( meta, name ){

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

	}, this );
};

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return current datarow dataset.
 * @returns {zz.mvc.model.Dataset}
 */
zz.mvc.model.Datarow.prototype.getDataset = function( ){

	return this.dataset_;
};

/**
* Return current datarow unique ID.
* @returns {string}
*/
zz.mvc.model.Datarow.prototype.getId = function( ){

	return this.id_;
};

///**
//* Return field name by specified index, false otherwise.
//* @param {number} index
//* @return {string}
//*/
//zz.mvc.model.Datarow.prototype.getFieldNameByIndex = function( index ){
//
//	return this.fieldToIndex_[index];
//};
//
///**
//* Return field type by specified field index.
//* @param {number} index
//* @returns {string}
//*/
//zz.mvc.model.Datarow.prototype.getFieldTypeByIndex = function( index ){
//
//	return this.getSchema( )[this.getFieldNameByIndex( index )].type;
//};
//
///**
//* Return field required flag by specified field index.
//* @param {number} index
//* @returns {boolean}
//*/
//zz.mvc.model.Datarow.prototype.getFieldRequiredFlagByIndex = function( index ){
//
//	return this.getSchema( )[this.getFieldNameByIndex( index )].required;
//};
//
///**
//* Add new control to model field.
//* @param {number} index
//* @param {zz.ui.Control} control
//* @return {number} Index of controller.
//*/
//zz.mvc.model.Datarow.prototype.addFieldControl = function( index, control ){
//
//	if( !goog.isDef( this.fieldController_[ this.getFieldNameByIndex( index ) ] ) ){
//
//		this.fieldController_[ this.getFieldNameByIndex( index ) ] = [ ];
//	}
//	return this.fieldController_[ this.getFieldNameByIndex( index ) ].push( control ) - 1;
//};
//
///**
//* Return all controls binding with current field.
//* @param {string} fieldName
//* @returns {Array}
//*/
//zz.mvc.model.Datarow.prototype.getControlsByFieldName = function( fieldName ){
//
//	return this.fieldController_[ fieldName ];
//};
//
///**
//* Return all controls binding with current datarow.
//* @returns {Array}
//*/
//zz.mvc.model.Datarow.prototype.getControls = function( ){
//
//	var controls = [];
//	goog.object.forEach( this.fieldController_, function( ctrlSet ){
//
//		controls = controls.concat( ctrlSet );
//	} );
//	return controls;
//};
//
///**
//* Set specified by index control to undefined.
//* @param {number} fieldIndex
//* @param {number} controlIndex
//*/
//zz.mvc.model.Datarow.prototype.removeFieldControl = function( fieldIndex, controlIndex ){
//
//	if( goog.isDef( this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ] ) &&
//		goog.isDef( this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ] ) ){
//
//		this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ] = undefined;
//		delete this.fieldController_[ this.getFieldNameByIndex( fieldIndex ) ][ controlIndex ];
//	}
//};
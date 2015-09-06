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
 * @fileoverview Provide zz.ui.BidiControl class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.controller.FieldController' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.object' );
goog.require( 'goog.ui.Control' );
goog.require( 'zz.model.FieldTypes' );
goog.require( 'zz.controller' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @param {goog.ui.ControlRenderer} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @extends {goog.ui.Control}
 */
zz.controller.FieldController = function( opt_renderer, opt_domHelper ){

	goog.ui.Control.call( this, undefined, opt_renderer, opt_domHelper );
};
goog.inherits( zz.controller.FieldController, goog.ui.Control );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Value for view layer.
 * @type {string}
 * @private
 */
zz.controller.FieldController.prototype.viewValue_ = '';

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Setting up model to current field controller.
 * @param {!zz.model.Datarow} datarow
 * @param {!number} index
 */
zz.controller.FieldController.prototype.setModel = function( datarow, index ){

	goog.base(this, 'setModel', {

		modelFieldTopEventTarget: zz.controller.getTopEventTarget( datarow ),
		modelFieldDataset: datarow.getParentEventTarget( ),
		modelFieldDatarow: datarow,
		modelFieldType: datarow.getFieldTypeByIndex( index ),
		modelFieldName: datarow.getFieldNameByIndex( index ),
		modelFieldRequired: datarow.getFieldRequiredFlagByIndex( index )
	} );
	this.setViewValue( this.model_.modelFieldDatarow[this.model_.modelFieldName] );
};

/**
 * Internal method for setting view value. Generally need to be overriding.
 * @protected
 * @param {*} value
 */
zz.controller.FieldController.prototype.setViewValueInternal = function( value ){

	this.viewValue_ = zz.controller.transformModelToViewField(

		this.model_.modelFieldType,
		value
	);
	this.setContent( this.viewValue_ );
};

/**
 * Set value to view layer.
 * @param {*} value
 */
zz.controller.FieldController.prototype.setViewValue = function( value ){

	this.setViewValueInternal( value );
};

/**
 * Return current view value.
 * @returns {string}
 */
zz.controller.FieldController.prototype.getViewValue = function( ){

	return this.viewValue_;
};
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
 * @fileoverview Provide zz.mvc.controller.BaseController class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.controller.BaseController' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.i18n.NumberFormat' );
goog.require( 'goog.i18n.NumberFormat.Format' );
goog.require( 'zz.mvc.model.FieldTypes' );
goog.require( 'zz.mvc.controller.Error' );
goog.require( 'zz.mvc.controller.OperationTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base class for controller.
 * @constructor
 */
zz.mvc.controller.BaseController = function( ){ };

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Default number formatter.
 * @type {goog.i18n.NumberFormat}
 */
zz.mvc.controller.BaseController.defaultNumberFormatter =

	new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL );

/**********************************************************************************************************************
 * Static methods section                                                                                             *
 **********************************************************************************************************************/

/**
 * Convert data from model to view state.
 * @param {zz.mvc.model.FieldTypes} type
 * @param {*} value
 * @returns {string}
 */
zz.mvc.controller.BaseController.convertModelToView = function( type, value ){

	if( goog.isDefAndNotNull( value ) ){

		if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

			return value;

		}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

			return zz.mvc.controller.BaseController.defaultNumberFormatter.format( value );

		}else if( type === zz.mvc.model.FieldTypes.STRING ){

			return value;

		}else{

			return value;
		}
	}else{

		return '';
	}
};

/**
 * Convert data from view to model state.
 * @param {zz.mvc.model.FieldTypes} type
 * @param {goog.ui.ControlContent} value
 * @returns {*}
 */
zz.mvc.controller.BaseController.convertViewToModel = function( type, value ){

	if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

		return value;

	}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

		return value ? zz.mvc.controller.defaultNumberFormatter.parse( value ) : null;

	}else if( type === zz.mvc.model.FieldTypes.STRING ){

		return value ? value : null;
	}
};

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Execute specified operation under specified dataset.
 * @param {!zz.mvc.controller.OperationTypes} operation
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {number=} opt_index
 */
zz.mvc.controller.BaseController.prototype.execute = function( operation, dataset, opt_index ){

	if( !goog.isDefAndNotNull( operation ) ){

		throw new Error( zz.mvc.controller.Error.OPERATION_REQUIRED );
	}
	if( !goog.isDefAndNotNull( dataset ) ){

		throw new Error( zz.mvc.controller.Error.DATASET_REQUIRED );
	}
	switch( operation ){

		case zz.mvc.controller.OperationTypes.CREATE_FIRST:

			dataset.createFirst( );
			break;

		case zz.mvc.controller.OperationTypes.CREATE_LAST:

			dataset.createLast( );
			break;

		case zz.mvc.controller.OperationTypes.CREATE_AT:

			dataset.createAt( opt_index );
			break;

		case zz.mvc.controller.OperationTypes.DELETE_FIRST:

			dataset.deleteFirst( );
			break;

		case zz.mvc.controller.OperationTypes.DELETE_LAST:

			dataset.deleteLast( );
			break;

		case zz.mvc.controller.OperationTypes.DELETE_CURRENT:

			dataset.deleteCurrent( );
			break;

		case zz.mvc.controller.OperationTypes.DELETE_AT:

			dataset.deleteAt( opt_index );
			break;

		default:

			throw new Error( zz.mvc.controller.Error.ILLEGAL_OPERATION );
	}
};

//noinspection JSUnusedLocalSymbols
/**
 * Initialize view.
 * @param {zz.mvc.view.BaseView} view
 */
zz.mvc.controller.BaseController.prototype.initialize = function( view ){ };
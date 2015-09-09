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
 * @fileoverview Controller common function.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.controller' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.mvc.model.FieldTypes' );
goog.require( 'goog.i18n.NumberFormat' );
goog.require( 'goog.i18n.NumberFormat.Format' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Default number formatter.
 * @type {goog.i18n.NumberFormat}
 */
var defaultNumberFormatter = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL );

/**
 * Return top ElementTarget in hierarchy.
 * @param {goog.events.EventTarget} eventTarget
 * @returns {goog.events.EventTarget}
 */
zz.mvc.controller.getTopEventTarget = function( eventTarget ){

	var result = eventTarget;
	while( result.getParentEventTarget( ) ){

		result = result.getParentEventTarget( );
	}
	return result;
};

/**
 * Return an array with datarows tree ids.
 * @param {goog.events.EventTarget} datarow
 * @returns {Array}
 */
zz.mvc.controller.getDatarowTreeIds = function( datarow ){

	var ids = [];
	while( datarow.getParentEventTarget( ) ){

		if( goog.isDef( datarow.getId ) ){

			ids.unshift( datarow.getId( ) );
		}
		datarow = datarow.getParentEventTarget( );
	}
	return ids;
};

/**
 * Convert data from model to view state.
 * @param {string} type
 * @param {*} value
 * @returns {string}
 */
zz.mvc.controller.convertModelToView = function( type, value ){

	if( goog.isDefAndNotNull( value ) ){

		if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

			return value;

		}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

			return defaultNumberFormatter.format( value );

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
 * @param {string} type
 * @param {goog.ui.ControlContent} value
 * @returns {*}
 */
zz.mvc.controller.convertViewToModel = function( type, value ){

	if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

		return value;

	}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

		return value ? defaultNumberFormatter.parse( value ) : null;

	}else if( type === zz.mvc.model.FieldTypes.STRING ){

		return value ? value : null;
	}
};
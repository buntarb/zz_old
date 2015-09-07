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

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/
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
 * Convert data from model to view state.
 * @param {*} modelValue
 * @returns {goog.ui.ControlContent}
 */
zz.mvc.controller.convertModelToView = function( modelValue ){

	if( goog.isDefAndNotNull( modelValue ) ){

		return  modelValue.toString( );

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

		return value === 'true';

	}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

		// TODO (buntarb): This need to be done with goog.i18n.NumberFormat
		return parseFloat( value );

	}else if( type === zz.mvc.model.FieldTypes.STRING ){

		return value;
	}
};
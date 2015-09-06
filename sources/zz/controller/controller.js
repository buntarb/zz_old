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

goog.provide( 'zz.controller' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/
/**
 * Return top ElementTarget in model hierarchy.
 * @param {goog.events.EventTarget} eventTarget
 * @returns {goog.events.EventTarget}
 */
zz.controller.getTopEventTarget = function( eventTarget ){

	var result = eventTarget;
	while( result.getParentEventTarget( ) ){

		result = result.getParentEventTarget( );
	}
	return result;
};

/**
 * Convert model data to view state.
 * @param {string} modelType
 * @param {*} modelData
 * @returns {*}
 */
zz.controller.transformModelToViewField = function( modelType, modelData ){

	if( modelData === null ){

		return '';

	}else if( modelType === zz.model.FieldTypes.BOOLEAN ){

		return modelData.toString( );

	}else if( modelType === zz.model.FieldTypes.NUMBER ){

		return modelData;

	}else if( modelType === zz.model.FieldTypes.STRING ){

		return modelData;

	}else{

		return modelData;
	}
};
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

goog.provide( 'zz.mvc.controller.filter' );

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
zz.mvc.controller.filter.defaultNumberFormatter = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL );

/**
 * Convert data from model to view state.
 * @param {string} type
 * @param {*} value
 * @returns {string}
 */
zz.mvc.controller.filter.convertModelToView = function( type, value ){

	if( goog.isDefAndNotNull( value ) ){

		if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

			return value;

		}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

			return zz.mvc.controller.defaultNumberFormatter.format( value );

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
zz.mvc.controller.filter.convertViewToModel = function( type, value ){

	if( type === zz.mvc.model.FieldTypes.BOOLEAN ){

		return value;

	}else if( type === zz.mvc.model.FieldTypes.NUMBER ){

		return value ? zz.mvc.controller.defaultNumberFormatter.parse( value ) : null;

	}else if( type === zz.mvc.model.FieldTypes.STRING ){

		return value ? value : null;
	}
};
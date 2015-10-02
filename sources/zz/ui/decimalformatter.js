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
 * @fileoverview Provide zz.ui.DecimalFormatter class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.DecimalFormatter' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.i18n.NumberFormat' );
goog.require( 'goog.i18n.NumberFormat.Format' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base formatter class.
 * @constructor
 */
zz.ui.DecimalFormatter = function( ){

	this.num_ = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL );
};
goog.addSingletonGetter( zz.ui.DecimalFormatter );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Formatting model value to view form.
 * @param {number} modelValue
 * @returns {string}
 */
zz.ui.DecimalFormatter.prototype.format = function( modelValue ){

	return goog.isDefAndNotNull( modelValue ) ? this.num_.format( modelValue ) : '';
};

/**
 * Parse model value from view form.
 * @param {string} viewValue
 * @returns {number}
 */
zz.ui.DecimalFormatter.prototype.parse = function( viewValue ){

	return goog.isDefAndNotNull( viewValue ) && viewValue !== '' && viewValue === viewValue ?

		this.num_.parse( viewValue ) :
		null;
};
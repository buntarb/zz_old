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
 * @fileoverview Service for math calculation
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.service.Math' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.math' );
goog.require( 'goog.array' );
goog.require( 'zz.template.module.post' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Service for GoldenRatio calculation.
 * @constructor
 */
zz.service.Math = function( ){ };
goog.addSingletonGetter( zz.service.Math );

/**********************************************************************************************************************
 * Public interface                                                                                                   *
 **********************************************************************************************************************/

/**
 * @type {number}
 */
zz.service.Math.BIG_PART = .62;

/**
 * @type {number}
 */
zz.service.Math.SMALL_PART = .38;

/**
 * @param {number} length
 * @param {boolean=} return_smaller
 * @returns {number}
 */
zz.service.Math.prototype.getGoldenInner = function( length, return_smaller ){

	if( return_smaller )

		return parseInt( zz.service.Math.SMALL_PART * length );

	return parseInt( zz.service.Math.BIG_PART * length );
};

/**
 * @param {number} length
 * @param {boolean=} return_smaller
 * @returns {number}
 */
zz.service.Math.prototype.getGoldenOuter = function( length, return_smaller ){

	if( return_smaller )

		return parseInt( zz.service.Math.SMALL_PART / zz.service.Math.BIG_PART * length );

	return parseInt( zz.service.Math.BIG_PART / zz.service.Math.SMALL_PART * length );
};

/**
 *
 * @param width
 * @param height
 * @returns {goog.math.Size}
 */
zz.service.Math.prototype.getGoldenSize = function( width, height ){

	if( width / height > zz.service.Math.BIG_PART / zz.service.Math.SMALL_PART ){

		width = this.getGoldenOuter( height );
	}
	height = this.getGoldenInner( width );
	return new goog.math.Size( width, height );
};
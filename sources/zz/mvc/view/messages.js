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
 * @fileoverview Provide zz.mvc.view.Messages class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.view.Messages' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'soy' );
goog.require( 'goog.dom' );
goog.require( 'goog.array' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 */
zz.mvc.view.Messages = function( tpl ){

	this.msg_ = {};
	this.msgElement_ = soy.renderAsElement( tpl );
	this.extractMessages_( );
};

/**
 * @returns {string}
 * @private
 */
zz.mvc.view.Messages.prototype.extractMessages_ = function( ){

	goog.array.forEach(

		goog.dom.getElementsByTagNameAndClass( goog.dom.TagName.SPAN, undefined, this.msgElement_ ),
		function( span ){

			this.msg_[ span.id ] = goog.dom.getTextContent( span );

		}, this );
	this.msgElement_ = undefined;
	delete this.msgElement_;
};

/**
 * @param {string} id
 * @returns {string}
 */
zz.mvc.view.Messages.prototype.getMessage = function( id ){

	return this.msg_[ id ];
};
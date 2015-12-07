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
 * @fileoverview Provide zz.mvc.Router class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.Router' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.events');
goog.require( 'goog.History' );
goog.require( 'goog.history.Html5History' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Router class.
 * @param {boolean=} opt_noFragment set to true to hide fragment when using HTML5 history.
 * @param {string=} opt_blankPage url to a blank page - needed if HTML5 is not available and you don't want to show the
 * fragment.
 * @param {HTMLInputElement=} opt_input The hidden input element to be used to store the history token.  If not
 * provided, a hidden input element will be created using document.write.
 * @param {HTMLIFrameElement=} opt_iframe The hidden iframe that will be used by IE for pushing history state changes,
 * or by all browsers if opt_noFragment is true. If not provided, a hidden iframe element will be created using
 * document.write.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.mvc.Router = function( opt_noFragment, opt_blankPage, opt_input, opt_iframe ){

	goog.base( this );

	/**
	 * 
	 * @type {Array}
	 * @private
	 */
	this.routes_ = [ ];

	/**
	 *
	 * @type {string}
	 * @private
	 */
	this.currentFragment_ = "";

	/**
	 * History event target object.
	 * @type {goog.history.Html5History|goog.History}
	 * @private
	 */
	this.history_ = goog.history.Html5History.isSupported( ) ?

		new goog.history.Html5History( ) :
		new goog.History( !!( opt_blankPage && opt_noFragment ), opt_blankPage, opt_input, opt_iframe );

	// Setting up history object.
	if( this.history_.setUseFragment ){

		this.history_.setUseFragment( !opt_noFragment );
	}
	this.history_.setEnabled( true );

	// Setting up listener.
	goog.events.listen(

		this.history_,
		goog.history.EventType.NAVIGATE,
		this.onChange_,
		false,
		this
	);
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.Router, goog.events.EventTarget );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Static methods section                                                                                             *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/
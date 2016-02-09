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
 * @fileoverview Application routed event.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.events.ApplicationRouted' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.events.BaseEvent' );
goog.require( 'zz.app.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Routed event class.
 * @param {String} prev
 * @param {String} curr
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.events.ApplicationRouted = function( prev, curr ){

	zz.events.BaseEvent.call( this, zz.app.EventType.APPLICATION_ROUTED );

	/**
	 * Previous fragment.
	 * @type {String}
	 * @private
	 */
	this.prev_ = prev;

	/**
	 * Current fragment.
	 * @type {String}
	 * @private
	 */
	this.curr_ = curr;
};
goog.inherits( zz.events.ApplicationRouted, zz.events.BaseEvent );

/**********************************************************************************************************************
 * Public properties                                                                                                  *
 **********************************************************************************************************************/

/**
 * Return previous fragment.
 * @returns {String}
 */
zz.events.ApplicationRouted.prototype.getPrevFragment = function( ){

	return this.prev_;
};

/**
 * Return current fragment.
 * @returns {String}
 */
zz.events.ApplicationRouted.prototype.getCurrFragment = function( ){

	return this.curr_;
};
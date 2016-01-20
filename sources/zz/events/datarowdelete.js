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
 * @fileoverview Provide zz.events.DatarowDelete class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.events.DatarowDelete' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.events.BaseEvent' );
goog.require( 'zz.mvc.model.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {zz.events.BaseEvent}
 * @param {!zz.mvc.model.Message} message
 */
zz.events.DatarowDelete = function( message ){

	/**
	 * Model message.
	 * @type {!zz.mvc.model.Datarow}
	 */
	this.message = message;
	zz.events.BaseEvent.call( this, zz.mvc.model.EventType.DATAROW_DELETE, message.dataset );
};
goog.inherits( zz.events.DatarowDelete, zz.events.BaseEvent );
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
 * @fileoverview Provide zz.model.DatarowDeleteEvent class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.DatarowDeleteEvent' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.Event' );
goog.require( 'zz.model.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {!zz.model.Dataset} dataset
 * @param {!zz.model.Datarow} datarow
 */
zz.model.DatarowDeleteEvent = function( dataset, datarow ){

	goog.events.Event.call( this, zz.model.EventType.DATAROW_DELETE, dataset );
	this.deletedDatarow_ = datarow;
};
goog.inherits( zz.model.DatarowDeleteEvent, goog.events.Event );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return deleted datarow object.
 * TODO(buntarb): Check memory leaks here.
 * @returns {zz.model.Datarow}
 */
zz.model.DatarowDeleteEvent.prototype.getDeletedDatarow = function( ){

	return this.deletedDatarow_;
};
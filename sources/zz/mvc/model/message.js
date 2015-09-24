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
 * @fileoverview Provide zz.mvc.model.Message class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.model.Message' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * zz.mvc.model.Message class .
 * @param {!string} eventtype
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {!zz.mvc.model.Datarow} datarow
 * @param {string=} opt_datafield
 * @param {*=} opt_old
 * @param {*=} opt_new
 * @constructor
 */
zz.mvc.model.Message = function( eventtype, dataset, datarow, opt_datafield, opt_old, opt_new ){

	/**
	 * Current message event type.
	 * @type {string}
	 */
	this.eventtype = eventtype;

	/**
	 * Message dataset.
	 * @type {zz.mvc.model.Dataset}
	 */
	this.dataset = dataset;

	/**
	 * Message datarow.
	 * @type {zz.mvc.model.Datarow}
	 */
	this.datarow = datarow;

	/**
	 * Message datafield.
	 * @type {string}
	 */
	this.datafield = opt_datafield;

	/**
	 * Message datafield old value.
	 * @type {*}
	 */
	this.old_value = opt_old;

	/**
	 * Message datafield new value.
	 * @type {*}
	 */
	this.new_value = opt_new;
};
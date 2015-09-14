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
 * @fileoverview Provide zz.mvc.controller.BindingDispatcher class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.controller.BindingDispatcher' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.events.EventHandler' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.mvc.controller.BindingDispatcher = function( ){

	goog.events.EventTarget.call( this );
	this.handler_ = new goog.events.EventHandler( this );
};
goog.inherits( zz.mvc.controller.BindingDispatcher, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Binding dispatcher event handler.
 * @type {goog.events.EventHandler}
 * @private
 */
zz.mvc.controller.BindingDispatcher.prototype.handler_ = undefined;

/**
 * Binding dispatcher control map.
 * @type {Object}
 * @private
 */
zz.mvc.controller.BindingDispatcher.prototype.control_ = undefined;

/**
 * Binding dispatcher datarow map.
 * @type {Object}
 * @private
 */
zz.mvc.controller.BindingDispatcher.prototype.datarow_ = undefined;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/** @inheritDoc */
zz.mvc.controller.BindingDispatcher.prototype.disposeInternal = function( ){

	zz.mvc.controller.BindingDispatcher.superClass_.disposeInternal.call( this );
	if( this.handler_ ){

		this.handler_.dispose( );
		delete this.handler_;
	}
};

/**
 * Add new control to dispatcher.
 * @param {zz.ui.Control} control
 * @param {zz.model.Datarow} datarow
 * @param {number} index
 */
zz.mvc.controller.BindingDispatcher.prototype.addControl = function( control, datarow, index ){

	if( !this.control_ ){

		this.control_ = {};
	}
	if( !goog.isDef( this.control_[ control.getId( ) ] ) ){

		this.control_[ control.getId( ) ] = {};
		this.control_[ control.getId( ) ].control = control;
		this.control_[ control.getId( ) ].datarow = datarow;
		this.control_[ control.getId( ) ].index = index;

	}else{

		// TODO: Trow Error.
	}
};
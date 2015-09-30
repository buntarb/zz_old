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
 * @fileoverview Provide zz.ui.LabelInput class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.LabelInput' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.Control' );
goog.require( 'zz.ui.LabelInputRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * This creates the label input object.
 *
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
zz.ui.LabelInput = function( opt_label, opt_renderer, opt_domHelper ){

	goog.ui.Control.call( this, opt_renderer, opt_domHelper );

	this.setAllowTextSelection( true );
	this.setHandleMouseEvents( true );

	/**
	 * The text to show as the label.
	 * @type {string}
	 * @private
	 */
	this.label_ = opt_label || '';
};
goog.inherits( zz.ui.LabelInput, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.LabelInput );
goog.ui.registry.setDefaultRenderer( zz.ui.LabelInput, zz.ui.LabelInputRenderer );
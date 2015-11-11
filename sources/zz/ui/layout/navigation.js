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
 * @fileoverview Provide zz.ui.layout.Navigation class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.layout.Navigation' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.Control' );
goog.require( 'goog.events.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation layout class.
 * @param {goog.ui.ControlContent=} opt_title Text caption or DOM structure to display as the title of the layout.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the layout.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.layout.Navigation = function( opt_title, opt_domHelper, opt_renderer ){

	goog.ui.Control.call( this, opt_title, opt_renderer, opt_domHelper );
};
goog.inherits( zz.ui.layout.Navigation, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.layout.Navigation );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Modes.
 * @enum {number}
 */
zz.ui.layout.Navigation.Mode = {

	STANDARD: 0,
	SEAMED: 1,
	WATERFALL: 2,
	SCROLL: 3
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.layout.Navigation.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
	//
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.layout.Navigation.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );
	//
};

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Return layout drawer element.
 * @returns {Element}
 */
zz.ui.layout.Navigation.prototype.getDrawerElement = function( ){

	return this.drawer_;
};

/**
 * Return layout drawer element.
 * @returns {Element}
 */
zz.ui.layout.Navigation.prototype.getObfuscatorElement = function( ){

	return this.obfuscator_;
};

/**
 * Return layout header element.
 * @returns {Element}
 */
zz.ui.layout.Navigation.prototype.getHeaderElement = function( ){

	return this.header_;
};

/**
 * Return layout content element.
 * @returns {Element}
 */
zz.ui.layout.Navigation.prototype.getContentElement = function( ){

	return this.content_;
};
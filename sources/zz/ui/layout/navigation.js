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
goog.require( 'zz.ui.layout.NavigationRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation layout class.
 * @param {goog.ui.ControlContent=} opt_title Text caption or DOM structure to display as the title of the layout.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the layout.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.layout.Navigation = function( opt_title, opt_renderer, opt_domHelper ){

	goog.ui.Control.call(

		this,
		opt_title,
		opt_renderer || zz.ui.layout.NavigationRenderer.getInstance( ),
		opt_domHelper );
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
 * Return navigation list.
 * @returns {Array.<Object>}
 */
zz.ui.layout.Navigation.prototype.getNavigationList = function( ){

	return [ {

		name: 'Link1',
		href: '/#/link1'
	},{
		name: 'Link2',
		href: '/#/link2'
	},{
		name: 'Link3',
		href: '/#/link3'
	},{
		name: 'Link4',
		href: '/#/link4'
	} ];
};

/**
 * Set layout navigation list DOM array.
 * @param {Array} elements
 */
zz.ui.layout.Navigation.prototype.setNavigationListElements = function( elements ){

	/**
	 * Navigation list DOM array.
	 * @type {Array}
	 * @private
	 */
	this.navigationListElements_ = elements;
};

/**
 * Return layout navigation list DOM array.
 * @returns {Array} element
 */
zz.ui.layout.Navigation.prototype.getNavigationListElements = function( ){

	/**
	 * Navigation list DOM array.
	 * @type {Array}
	 * @private
	 */
	return this.navigationListElements_;
};

/**
 * Return layout header element.
 * @returns {HTMLElement}
 */
zz.ui.layout.Navigation.prototype.getHeaderElement = function( ){

	return this.headerElement_;
};

/**
 * Set layout header element.
 * @param {HTMLElement} element
 */
zz.ui.layout.Navigation.prototype.setHeaderElement = function( element ){

	/**
	 * Layout header element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.headerElement_ = element;
};

/**
 * Return layout header element.
 * @returns {HTMLElement}
 */
zz.ui.layout.Navigation.prototype.getHeaderElement = function( ){

	return this.headerElement_;
};

/**
 * Set layout drawer element.
 * @param {HTMLElement} element
 */
zz.ui.layout.Navigation.prototype.setDrawerElement = function( element ){

	/**
	 * Layout drawer element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.drawerElement_ = element;
};

/**
 * Return layout drawer element.
 * @returns {HTMLElement}
 */
zz.ui.layout.Navigation.prototype.getDrawerElement = function( ){

	return this.drawerElement_;
};

/**
 * Set layout obfuscator element.
 * @param {HTMLElement} element
 */
zz.ui.layout.Navigation.prototype.setObfuscatorElement = function( element ){

	/**
	 * Layout obfuscator element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.obfuscatorElement_ = element;
};

/**
 * Return layout obfuscator element.
 * @returns {HTMLElement}
 */
zz.ui.layout.Navigation.prototype.getObfuscatorElement = function( ){

	return this.obfuscatorElement_;
};

/**
 * Set layout body element.
 * @param {HTMLElement} element
 */
zz.ui.layout.Navigation.prototype.setBodyElement = function( element ){

	/**
	 * Layout body element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.bodyElement_ = element;
};

/**
 * Return layout body element.
 * @returns {HTMLElement}
 */
zz.ui.layout.Navigation.prototype.getBodyElement = function( ){

	return this.bodyElement_;
};
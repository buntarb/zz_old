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
 * @fileoverview Provide zz.ui.mdl.Menu class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Menu' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.service.Popup' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.MenuRenderer' );
goog.require( 'zz.ui.mdl.Ripple' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the button.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @extends {zz.ui.mdl.Control}
 * @constructor
 */
zz.ui.mdl.Menu = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call( this, opt_content, opt_renderer || zz.ui.mdl.MenuRenderer.getInstance( ), opt_domHelper );
	zz.service.Popup.getInstance( ).addClosable( this );
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.OPENED, true );
};
goog.inherits( zz.ui.mdl.Menu, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Menu );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Menu.CONST = {

	// Total duration of the menu animation.
	TRANSITION_DURATION_SECONDS: 0.3,
	// The fraction of the total duration we want to use for menu item animations.
	TRANSITION_DURATION_FRACTION: 0.8,
	// How long the menu stays open after choosing an option (so the user can see
	// the ripple).
	CLOSE_TIMEOUT: 150
};

/**
 * Store keycodes, for code readability.
 * @enum {string | number}
 */
zz.ui.mdl.Menu.Keycodes = {

	ENTER: 13,
	ESCAPE: 27,
	SPACE: 32,
	UP_ARROW: 38,
	DOWN_ARROW: 40
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Menu.CSS = {

	CONTAINER: goog.getCssName( 'mdl-menu__container' ),
	OUTLINE: goog.getCssName( 'mdl-menu__outline' ),
	ITEM: goog.getCssName( 'mdl-menu__item' ),
	ITEM_RIPPLE_CONTAINER: goog.getCssName( 'mdl-menu__item-ripple-container' ),
	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),

	// Statuses
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	IS_VISIBLE: goog.getCssName( 'is-visible' ),
	IS_ANIMATING: goog.getCssName( 'is-animating' ),

	// Alignment options
	BOTTOM_LEFT: goog.getCssName( 'mdl-menu--bottom-left' ),  // This is the default.
	BOTTOM_RIGHT: goog.getCssName( 'mdl-menu--bottom-right' ),
	TOP_LEFT: goog.getCssName( 'mdl-menu--top-left' ),
	TOP_RIGHT: goog.getCssName( 'mdl-menu--top-right' ),
	UNALIGNED: goog.getCssName( 'mdl-menu--unaligned' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Menu.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
	this.getHandler( ).listenWithScope(

		this.listElement_,
		goog.events.EventType.TRANSITIONEND,
		this.animationEndListener_,
		false,
		this
	);
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Menu.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );
	this.getHandler( ).dispose( );
	zz.service.Popup.getInstance( ).removeClosable( this );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for animation end event.
 * @this {zz.ui.mdl.Menu}
 * @private
 */
zz.ui.mdl.Menu.prototype.animationEndListener_ = function( ){

	this.getRenderer( ).removeAnimatingClass( this );
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Setting up menu container element.
 * @param {Element} element
 */
zz.ui.mdl.Menu.prototype.setContainerElement = function( element ){

	this.containerElement_ = element;
};

/**
 * Return menu container element.
 * @returns {Element}
 */
zz.ui.mdl.Menu.prototype.getContainerElement = function( ){

	return this.containerElement_;
};

/**
 * Setting up menu outline element.
 * @param {Element} element
 */
zz.ui.mdl.Menu.prototype.setOutlineElement = function( element ){

	this.outlineElement_ = element;
};

/**
 * Return menu outline element.
 * @returns {Element}
 */
zz.ui.mdl.Menu.prototype.getOutlineElement = function( ){

	return this.outlineElement_;
};


/**
 * Setting up menu list element.
 * @param {Element} element
 */
zz.ui.mdl.Menu.prototype.setListElement = function( element ){

	this.listElement_ = element;
};

/**
 * Return menu list element.
 * @returns {Element}
 */
zz.ui.mdl.Menu.prototype.getListElement = function( ){

	return this.listElement_;
};

/**
 * Setting up menu item elements.
 * @param {Array} items
 */
zz.ui.mdl.Menu.prototype.setItemsElements = function( items ){

	this.itemsElements_ = items;
};

/**
 * Return menu item elements.
 * @returns {Array}
 */
zz.ui.mdl.Menu.prototype.getItemsElements = function( ){

	return this.itemsElements_;
};

/**********************************************************************************************************************
 * Public manager methods                                                                                             *
 **********************************************************************************************************************/

/**
 * Open menu.
 * @param {Element=} opt_element
 */
zz.ui.mdl.Menu.prototype.open = function( opt_element ){

	this.getRenderer( ).open( this, opt_element );
	goog.async.nextTick( function( ){

		this.setOpen( true );

	}, this )
};

/**
 * Close menu.
 * @param {Element=} opt_element
 */
zz.ui.mdl.Menu.prototype.close = function( opt_element ){

	this.getRenderer( ).close( this, opt_element );
	goog.async.nextTick( function( ){

		this.setOpen( false );

	}, this )
};

/**
 * Toggle menu state.
 * @param {Element=} opt_element
 */
zz.ui.mdl.Menu.prototype.toggle = function( opt_element ){

	if( this.isOpen( ) ){

		this.close( opt_element );

	}else{

		this.open( opt_element );
	}
};
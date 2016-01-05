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
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
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
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
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

		this.getForElement( ),
		goog.events.EventType.CLICK,
		this.handleForClick_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getForElement( ),
		goog.events.EventType.KEYDOWN,
		this.handleForKeyboardEvent_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getItems( ),
		goog.events.EventType.CLICK,
		this.boundItemClick_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getItems( ),
		goog.events.EventType.KEYDOWN,
		this.boundItemKeydown_,
		false,
		this
	);

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Menu.CSS.RIPPLE_EFFECT ) ){

		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate(

			goog.dom.getElementByClass(

				zz.ui.mdl.Menu.CSS.RIPPLE_CONTAINER,
				this.getElement( ) ) );

	}else{

		this.getHandler( ).listenWithScope(

			this.getInputElement( ),
			goog.events.EventType.FOCUS,
			this.focusMenuListener_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.getInputElement( ),
			goog.events.EventType.BLUR,
			this.blurMenuListener_,
			false,
			this
		);
	}
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
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for forElement click event.
 * @this {zz.ui.mdl.Menu}
 * @private
 */
zz.ui.mdl.Menu.prototype.handleForClick_ = function( event ){

	if (this.element_ && this.forElement_) {
		var rect = this.forElement_.getBoundingClientRect();
		var forRect = this.forElement_.parentElement.getBoundingClientRect();

		if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
			// Do not position the menu automatically. Requires the developer to
			// manually specify position.
		} else if (this.element_.classList.contains(
				this.CssClasses_.BOTTOM_RIGHT)) {
			// Position below the "for" element, aligned to its right.
			this.container_.style.right = (forRect.right - rect.right) + 'px';
			this.container_.style.top =
				this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
		} else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
			// Position above the "for" element, aligned to its left.
			this.container_.style.left = this.forElement_.offsetLeft + 'px';
			this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
		} else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
			// Position above the "for" element, aligned to its right.
			this.container_.style.right = (forRect.right - rect.right) + 'px';
			this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
		} else {
			// Default: position below the "for" element, aligned to its left.
			this.container_.style.left = this.forElement_.offsetLeft + 'px';
			this.container_.style.top =
				this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
		}
	}

	this.toggle(evt);

};

///**
// * Listener for Menu element focus event.
// * @private
// */
//zz.ui.mdl.Menu.prototype.focusMenuListener_ = function( ){
//
//	goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.Menu.CSS.IS_FOCUSED );
//};
//
///**
// * Listener for Menu element blur event.
// * @private
// */
//zz.ui.mdl.Menu.prototype.blurMenuListener_ = function( ){
//
//	goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.Menu.CSS.IS_FOCUSED );
//};
//
///**********************************************************************************************************************
// * Helpers methods                                                                                                    *
// **********************************************************************************************************************/
//
///**
// * Enable/disable Menu.
// * @param {boolean} enable
// */
//zz.ui.mdl.Menu.prototype.setEnabled = function( enable ){
//
//	zz.ui.mdl.Menu.superClass_.setEnabled.call( this, enable );
//	this.getInputElement( ).disabled = !enable;
//	this.getRenderer( ).updateClasses( this );
//};
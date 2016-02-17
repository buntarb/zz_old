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
 * @fileoverview Provide zz.ui.mdl.Switch class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Switch' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.SwitchRenderer' );
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
zz.ui.mdl.Switch = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call(

		this, opt_content,
		opt_renderer || zz.ui.mdl.SwitchRenderer.getInstance( ),
		opt_domHelper );

	this.setAutoStates( goog.ui.Component.State.ALL, false );

	this.setAutoStates( goog.ui.Component.State.ACTIVE, true );
	this.setAutoStates( goog.ui.Component.State.FOCUSED, true );
	this.setAutoStates( goog.ui.Component.State.CHECKED, true );
	this.setAutoStates( goog.ui.Component.State.DISABLED, true );

	this.setSupportedState( goog.ui.Component.State.ACTIVE, true );
	this.setSupportedState( goog.ui.Component.State.FOCUSED, true );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );

	this.setDispatchTransitionEvents( goog.ui.Component.State.ACTIVE, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.FOCUSED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.CHECKED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.Switch, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Switch );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Switch.CSS = {

	INPUT: goog.getCssName( 'mdl-switch__input' ),
	TRACK: goog.getCssName( 'mdl-switch__track' ),
	THUMB: goog.getCssName( 'mdl-switch__thumb' ),
	FOCUS_HELPER: goog.getCssName( 'mdl-switch__focus-helper' ),
	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-switch__ripple-container' ),
	RIPPLE_CENTER: goog.getCssName( 'mdl-ripple--center' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	IS_FOCUSED: goog.getCssName( 'is-focused' ),
	IS_DISABLED: goog.getCssName( 'is-disabled' ),
	IS_CHECKED: goog.getCssName( 'is-checked' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	IS_ANIMATING: goog.getCssName( 'is-animating' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Returns the DOM element on which the control is listening for keyboard events (null if none).
 * @override
 * @returns {Element}
 */
zz.ui.mdl.Switch.prototype.getKeyEventTarget = function( ){

	return this.getInputElement( );
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Switch.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.CHANGE,
		this.changeListener_,
		false,
		this );

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Switch.CSS.RIPPLE_EFFECT ) ){

		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate(

			goog.dom.getElementByClass(

				zz.ui.mdl.Switch.CSS.RIPPLE_CONTAINER,
				this.getElement( ) ) );

	}
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Switch.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element change event.
 * @private
 */
zz.ui.mdl.Switch.prototype.changeListener_ = function( ){

	this.dispatchEvent( goog.ui.Component.EventType.CHANGE );
};

/**
 * Attempts to handle a keyboard event; returns true if the event was handled, false otherwise.  Considered protected;
 * should only be used within this package and by subclasses.
 * @param {goog.events.KeyEvent} e Key event to handle.
 * @return {boolean} Whether the key event was handled.
 * @protected
 * @override
 */
zz.ui.mdl.Switch.prototype.handleKeyEventInternal = function( e ){

	if( e.keyCode === goog.events.KeyCodes.ENTER ){

		this.setInputValue( !this.getInputValue( ) );
		this.changeListener_( );
		return true;
	}
	return false;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Enable/disable switch.
 * @param {boolean} enable
 */
zz.ui.mdl.Switch.prototype.setEnabled = function( enable ){

	zz.ui.mdl.Switch.superClass_.setEnabled.call( this, enable );
	this.getInputElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};
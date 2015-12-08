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

	zz.ui.mdl.Control.call( this, opt_content, opt_renderer || zz.ui.mdl.SwitchRenderer.getInstance( ), opt_domHelper );
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.Switch, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Switch );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Switch.CONST = {

	TINY_TIMEOUT: 10
};

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
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Switch.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.MOUSEUP,
		this.blurListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getSwitchElement( ),
		goog.events.EventType.FOCUS,
		this.focusCheckboxListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getSwitchElement( ),
		goog.events.EventType.BLUR,
		this.blurSwitchListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getSwitchElement( ),
		goog.events.EventType.CHANGE,
		this.changeSwitchListener_,
		false,
		this
	);

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Switch.CSS.RIPPLE_EFFECT ) ){

		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate( goog.dom.getElementByClass( zz.ui.mdl.Switch.CSS.RIPPLE_CONTAINER, this.getElement( ) ) );
	}

	this.changeSwitchListener_( );
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

	this.switchElement_ = null;
	delete this.switchElement_;
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element blur event.
 * @this {zz.ui.mdl.Switch}
 * @private
 */
zz.ui.mdl.Switch.prototype.blurListener_ = function( ){

	goog.Timer.callOnce( /** @this {zz.ui.mdl.Switch} */ function( ){

		//noinspection JSPotentiallyInvalidUsageOfThis
		this.getSwitchElement( ).blur( );

	}, zz.ui.mdl.Switch.CONST.TINY_TIMEOUT, this );
};

/**
 * Listener for Switch element focus event.
 * @private
 */
zz.ui.mdl.Switch.prototype.focusSwitchListener_ = function( ){

	goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.Switch.CSS.IS_FOCUSED );
};

/**
 * Listener for Switch element blur event.
 * @private
 */
zz.ui.mdl.Switch.prototype.blurSwitchListener_ = function( ){

	goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.Switch.CSS.IS_FOCUSED );
};

/**
 * Listener for Switch element change event.
 * @private
 */
zz.ui.mdl.Switch.prototype.changeSwitchListener_ = function( ){

	this.setChecked( this.getSwitchElement( ).checked );
	this.getRenderer( ).updateClasses( this );
};

/**********************************************************************************************************************
 * Dom helpers section                                                                                                *
 **********************************************************************************************************************/

/**
 * Switch input element setter (for renderer).
 * @param {Element} element
 */
zz.ui.mdl.Switch.prototype.setSwitchElement = function( element ){

	/**
	 * Switch input element.
	 * @type {Element}
	 * @private
	 */
	this.SwitchElement_ = element;
};

/**
 * Switch input element getter (for renderer).
 * @returns {Element}
 */
zz.ui.mdl.Switch.prototype.getSwitchElement = function( ){

	return /** @type {Element} */ ( this.SwitchElement_ );
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
	this.getSwitchElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};

/**
 * Check/uncheck switch.
 * @param {boolean} check
 */
zz.ui.mdl.Switch.prototype.setChecked = function( check ){

	zz.ui.mdl.Switch.superClass_.setChecked.call( this, check );
	this.getSwitchElement( ).checked = check;
};
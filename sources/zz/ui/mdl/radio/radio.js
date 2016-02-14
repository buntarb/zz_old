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
 * @fileoverview Provide zz.ui.mdl.Radio and zz.ui.mdl.RadioRegister class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Radio' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.RadioRenderer' );
goog.require( 'zz.ui.mdl.Ripple' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the button.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @param {zz.ui.formatter.Default=} opt_formatter Formatter object.
 * @extends {zz.ui.mdl.Control}
 * @constructor
 */
zz.ui.mdl.Radio = function( opt_content, opt_renderer, opt_domHelper, opt_formatter ){

	zz.ui.mdl.Control.call(

		this,
		opt_content,
		opt_renderer || zz.ui.mdl.RadioRenderer.getInstance( ),
		opt_domHelper,
		opt_formatter );

	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.FOCUSED, true );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.FOCUSED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.CHECKED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.Radio, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Radio );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Radio.CONST = {

	TINY_TIMEOUT: 10
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Radio.CSS = {

	IS_FOCUSED: goog.getCssName( 'is-focused' ),
	IS_DISABLED: goog.getCssName( 'is-disabled' ),
	IS_CHECKED: goog.getCssName( 'is-checked' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	JS_RADIO: goog.getCssName( 'mdl-js-radio' ),
	RADIO_BTN: goog.getCssName( 'mdl-radio__button' ),
	RADIO_OUTER_CIRCLE: goog.getCssName( 'mdl-radio__outer-circle' ),
	RADIO_INNER_CIRCLE: goog.getCssName( 'mdl-radio__inner-circle' ),
	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-radio__ripple-container' ),
	RIPPLE_CENTER: goog.getCssName( 'mdl-ripple--center' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	IS_ANIMATING: goog.getCssName( 'is-animating' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.Radio.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.FOCUS,
		this.focusRadioListener_,
		false,
		this );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.BLUR,
		this.blurRadioListener_,
		false,
		this );

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.MOUSEUP,
		this.blurListener_,
		false,
		this );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.CHANGE,
		this.changeListener_,
		false,
		this );

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Radio.CSS.RIPPLE_EFFECT ) ){

		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate(

			goog.dom.getElementByClass(

				zz.ui.mdl.Radio.CSS.RIPPLE_CONTAINER,
				this.getElement( ) ) );

	}
};

/**
 * @override
 **/
zz.ui.mdl.Radio.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for Radio element focus event.
 * @private
 */
zz.ui.mdl.Radio.prototype.focusRadioListener_ = function( ){

	if( !goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Radio.CSS.RIPPLE_EFFECT ) )

		goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.Radio.CSS.IS_FOCUSED );

	this.dispatchEvent( goog.ui.Component.getStateTransitionEvent( goog.ui.Component.State.FOCUSED, true ) );
};

/**
 * Listener for element blur event.
 * @this {zz.ui.mdl.Radio}
 * @private
 */
zz.ui.mdl.Radio.prototype.blurListener_ = function( ){

	goog.Timer.callOnce( /** @this {zz.ui.mdl.Radio} */ function( ){

		this.getInputElement( ).blur( );

	}, zz.ui.mdl.Radio.CONST.TINY_TIMEOUT, this );
};

/**
 * Listener for Radio element blur event.
 * @private
 */
zz.ui.mdl.Radio.prototype.blurRadioListener_ = function( ){

	if( !goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Radio.CSS.RIPPLE_EFFECT ) )

		goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.Radio.CSS.IS_FOCUSED );

	this.dispatchEvent( goog.ui.Component.getStateTransitionEvent( goog.ui.Component.State.FOCUSED, false ) );
};

/**
 * Listener for element change event.
 * @private
 */
zz.ui.mdl.Radio.prototype.changeListener_ = function( ){

	this.dispatchEvent( goog.ui.Component.EventType.CHANGE );
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Enable/disable radio.
 * @param {boolean} enable
 */
zz.ui.mdl.Radio.prototype.setEnabled = function( enable ){

	zz.ui.mdl.Radio.superClass_.setEnabled.call( this, enable );
	this.getInputElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};
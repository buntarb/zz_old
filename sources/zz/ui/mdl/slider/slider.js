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
 * @fileoverview Provide zz.ui.mdl.Slider class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Slider' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.SliderRenderer' );
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
zz.ui.mdl.Slider = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call( this, opt_content, opt_renderer || zz.ui.mdl.SliderRenderer.getInstance( ), opt_domHelper );
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.Slider, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Slider );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Slider.CONST = {

};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Slider.CSS = {

	IE_CONTAINER: goog.getCssName( 'mdl-slider__ie-container' ),
	SLIDER_CONTAINER: goog.getCssName( 'mdl-slider__container' ),
	BACKGROUND_FLEX: goog.getCssName( 'mdl-slider__background-flex' ),
	BACKGROUND_LOWER: goog.getCssName( 'mdl-slider__background-lower' ),
	BACKGROUND_UPPER: goog.getCssName( 'mdl-slider__background-upper' ),
	IS_LOWEST_VALUE: goog.getCssName( 'is-lowest-value' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Slider.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.INPUT,
		this.getRenderer( ).updateClasses( this ),
		false,
		this
	);

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.CHANGE,
		this.getRenderer( ).updateClasses( this ),
		false,
		this
	);

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.MOUSEUP,
		this.blurSliderListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getContainerElement( ),
		goog.events.EventType.MOUSEDOWN,
		this.onContainerMouseDown_,
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
zz.ui.mdl.Slider.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element blur event.
 * @this {zz.ui.mdl.Slider}
 * @private
 */
zz.ui.mdl.Slider.prototype.blurSliderListener_ = function( ){

	this.getElement( ).blur( );
};

/**
 * Listener for Slider container element mousedown event.
 * @private
 */
zz.ui.mdl.Slider.prototype.onContainerMouseDown_ = function( ){

	// If this click is not on the parent element (but rather some child)
	// ignore. It may still bubble up.
	if ( event.target !== this.getElement( ).parentElement ) { //why not getParentElement( this.getElement( ) )
		return;
	}

	// Discard the original event and create a new event that
	// is on the slider element.
	event.preventDefault( );
	var newEvent = new MouseEvent( 'mousedown', {
		target: event.target,
		buttons: event.buttons,
		clientX: event.clientX,
		clientY: this.getElement( ).getBoundingClientRect( ).y
	} );
	this.getElement( ).dispatchEvent( newEvent );
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Setting up slider container element.
 * @param {Element} element
 */
zz.ui.mdl.Slider.prototype.setContainerElement = function( element ){

	this.containerElement_ = element;
};

/**
 * Return slider container element.
 * @returns {Element}
 */
zz.ui.mdl.Slider.prototype.getContainerElement = function( ){

	return this.containerElement_;
};


/**
 * Setting up browser feature detection for slider.
 * @param {string} isIE
 */
zz.ui.mdl.Slider.prototype.setisIE = function( ){

	this.isIE_ = window.navigator.msPointerEnabled;
};

/**
 * Return browser feature detection for slider.
 * @returns {string}
 */
zz.ui.mdl.Slider.prototype.getisIE = function( ){

	return this.isIE_;
};
/**
 * Return getbackgroundLower for slider. //TODO: alex: think about description
 * @returns {string}
 */
zz.ui.mdl.Slider.prototype.getBackgroundLower = function( ){

	return this.backgroundLower_;
};

/**
 * Setting up getbackgroundLower for slider. //TODO: alex: think about description
 * @param {string} isIE
 */
zz.ui.mdl.Slider.prototype.setBackgroundLower = function( backgroundLower ){

	this.backgroundLower_ = backgroundLower;
};

/**
 * Return getbackgroundUpper for slider. //TODO: alex: think about description
 * @returns {string}
 */
zz.ui.mdl.Slider.prototype.getBackgroundUpper = function( ){

	return this.backgroundUpper_;
};

/**
 * Setting up getbackgroundUpper for slider. //TODO: alex: think about description
 * @param {string} isIE
 */
zz.ui.mdl.Slider.prototype.setBackgroundUpper = function( backgroundUpper ){

	this.backgroundUpper_ = backgroundUpper;
};
/**
 * Enable/disable slider.
 * @param {boolean} enable
 */
zz.ui.mdl.Slider.prototype.setEnabled = function( enable ){

	zz.ui.mdl.Slider.superClass_.setEnabled.call( this, enable );
	this.getElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};
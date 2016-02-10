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
goog.require( 'zz.ui.formatter.Decimal' );

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

	zz.ui.mdl.Control.call( this,
		opt_content, opt_renderer || zz.ui.mdl.SliderRenderer.getInstance( ),
		opt_domHelper,
		zz.ui.formatter.Decimal.getInstance( )
	);
	this.setAutoStates( goog.ui.Component.State.ALL, false );
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
zz.ui.mdl.Slider.CONST = {};

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

		this.getInputElement( ),
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

	this.getInputElement( ).blur( );
};

/**
 * Listener for Slider container element mousedown event.
 * @param {goog.events.BrowserEvent} event.
 * @private
 */
zz.ui.mdl.Slider.prototype.onContainerMouseDown_ = function( event ){

	var originalEvent = event.getBrowserEvent( );

	// Discard the original event and create a new event that
	// is on the slider element.
	event.preventDefault( );

	var syntheticEvent;
	if( goog.isDef( goog.global[ 'MouseEvent' ] ) ){

		syntheticEvent = new MouseEvent( goog.events.EventType.MOUSEDOWN, {

			'target': originalEvent[ 'target' ],
			'screenX': originalEvent[ 'screenX' ],
			'screenY': originalEvent[ 'screenY' ],
			'clientX': originalEvent[ 'clientX' ],
			'clientY': this.getInputElement( ).getBoundingClientRect( ).y,
			'ctrlKey': originalEvent[ 'ctrlKey' ],
			'altKey': originalEvent[ 'altKey' ],
			'shiftKey': originalEvent[ 'shiftKey' ],
			'metaKey': originalEvent[ 'metaKey' ],
			'button': originalEvent[ 'button' ],
			'buttons': originalEvent[ 'buttons' ],
			'relatedTarget': null,
			'region': null
		} );

	}else{

		syntheticEvent = this.getDomHelper( ).getDocument( ).createEvent( 'MouseEvents' );
		syntheticEvent.initMouseEvent(

			goog.events.EventType.MOUSEDOWN,
			true,
			true,
			goog.global,
			1,
			originalEvent[ 'screenX' ],
			originalEvent[ 'screenY' ],
			originalEvent[ 'clientX' ],
			this.getInputElement( ).getBoundingClientRect( ).y,
			originalEvent[ 'ctrlKey' ],
			originalEvent[ 'altKey' ],
			originalEvent[ 'shiftKey' ],
			originalEvent[ 'metaKey' ],
			originalEvent[ 'button' ],
			null
		);
	}
	this.getInputElement( ).dispatchEvent( syntheticEvent );
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
 * Return {@code backgroundLower} element of slider.
 * @returns {Element}
 */
zz.ui.mdl.Slider.prototype.getBackgroundLower = function( ){

	return this.backgroundLower_;
};

/**
 * Setting up {@code backgroundLower} element of slider.
 * @param {Element} backgroundLower
 */
zz.ui.mdl.Slider.prototype.setBackgroundLower = function( backgroundLower ){

	this.backgroundLower_ = backgroundLower;
};

/**
 * Return {@code backgroundUpper} element of slider.
 * @returns {Element}
 */
zz.ui.mdl.Slider.prototype.getBackgroundUpper = function( ){

	return this.backgroundUpper_;
};

/**
 * Setting up {@code backgroundUpper} element of slider.
 * @param {Element} backgroundUpper
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
	this.getInputElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};
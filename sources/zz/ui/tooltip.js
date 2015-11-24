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
 * @fileoverview Provide zz.ui.Tooltip class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Tooltip' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Material ripple fx class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.Tooltip = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.Tooltip, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.Tooltip );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.Tooltip.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.Tooltip.CSS = {

	IS_ACTIVE: goog.getCssName( 'is-active' )
};

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.Tooltip.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.Tooltip.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );

	if ( element ) {
		var forElId = element.getAttribute( 'for' );
		if ( forElId ) {
			this.forElement = goog.dom.getElement( forElId );
		}
		if ( this.forElement ) {
			// Tabindex needs to be set for `blur` events to be emitted
			if ( !this.forElement.hasAttribute( 'tabindex' ) ) {
				this.forElement.setAttribute( 'tabindex', '0' );
			}
		}
	}
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.Tooltip.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getElement( ), [

			goog.events.EventType.MOUSEENTER,
			goog.events.EventType.CLICK,
			goog.events.EventType.TOUCHSTART
		],
		this.handleMouseEnter_,
		false,
		this
	);

	this.getHandler( ).listenWithScope(

		this.getElement( ), [

			goog.events.EventType.MOUSELEAVE,
			goog.events.EventType.BLUR
		],
		this.handleMouseLeave_,
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
zz.ui.Tooltip.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**
 * Downgrade the component.
 * @private
 */
zz.ui.Tooltip.prototype.mdlDowngrade = function( ){

	this.dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/
/**
 * Handle mouseenter for tooltip.
 *
 * @param {Event} event The event that fired.
 * @private
 */
zz.ui.Tooltip.prototype.handleMouseEnter_ = function( event ) {

	var props;
	var left;
	var marginLeft;

	event.stopPropagation( );
	props = event.target.getBoundingClientRect( );
	left = props.left + ( props.width / 2 );
	marginLeft = -1 * ( this.getElement( ).offsetWidth / 2 );

	if ( left + marginLeft < 0 ) {
		this.getElement( ).style.left = 0;
		this.getElement( ).style.marginLeft = 0;
	} else {
		this.getElement( ).style.left = left + 'px';
		this.getElement( ).style.marginLeft = marginLeft + 'px';
	}

	this.getElement( ).style.top = props.top + props.height + 10 + 'px';
	this.getElement( ).classList.add( zz.ui.Tooltip.CSS.IS_ACTIVE );
	window.addEventListener( 'scroll', this.boundMouseLeaveHandler, false );
	window.addEventListener( 'touchmove', this.boundMouseLeaveHandler, false );
};

/**
 * Handle mouseleave for tooltip.
 *
 * @param {Event} event The event that fired.
 * @private
 */
zz.ui.Tooltip.prototype.handleMouseLeave_ = function( event ) {
	event.stopPropagation( );
	this.getElement( ).classList.remove( zz.ui.Tooltip.CSS.IS_ACTIVE );
	window.removeEventListener( 'scroll', this.boundMouseLeaveHandler );
	window.removeEventListener( 'touchmove', this.boundMouseLeaveHandler, false );
};
/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */

zz.ui.Tooltip.prototype.getCssClass = function( ){

	return zz.ui.Tooltip.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/
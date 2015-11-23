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
 * @fileoverview Provide zz.ui.Button class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Button' );

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
zz.ui.Button = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.Button, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.Button );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.Button.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.Button.CSS = {

	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-button__ripple-container' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' )
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
zz.ui.Button.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.Button.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );

	if( goog.dom.classlist.contains( element, zz.ui.Button.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, this.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.Button.CSS.RIPPLE_CONTAINER

		}, this.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.Button.CSS.RIPPLE
		} ) ) );
	}
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.Button.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getElement( ), [

			goog.events.EventType.MOUSEUP,
			goog.events.EventType.MOUSELEAVE
		],
		this.blurListener_,
		false,
		this
	);
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.Button.CSS.RIPPLE_EFFECT ) ){

		this.getHandler( ).listenWithScope(

			goog.dom.getElementByClass( zz.ui.Button.CSS.RIPPLE, this.getElement( ) ),
			goog.events.EventType.MOUSEUP,
			this.blurListener_,
			false,
			this
		);
		var  ripple = new zz.ui.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate( goog.dom.getElementByClass( zz.ui.Button.CSS.RIPPLE_CONTAINER, this.getElement( ) ) );
	}
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.Button.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element blur event.
 * @param {goog.events.BrowserEvent} event
 * @this {zz.ui.Button}
 * @private
 */
zz.ui.Button.prototype.blurListener_ = function( event ){

	if( event ){

		this.getElement( ).blur( );
	}
};

/**
 * Downgrade the component.
 * @private
 */
zz.ui.Button.prototype.mdlDowngrade = function( ){

	this.dispose( );
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
zz.ui.Button.prototype.getCssClass = function( ){

	return zz.ui.Button.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Disable button.
 * @public
 */
zz.ui.Button.prototype.disable = function( ){

	this.getElement( ).disabled = true;
};

/**
 * Enable button.
 * @public
 */
zz.ui.Button.prototype.enable = function( ){

	this.getElement( ).disabled = false;
};
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
 * @fileoverview Provide zz.ui.mdl.MenuItem class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.MenuItem' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.MenuItemRenderer' );
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
zz.ui.mdl.MenuItem = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call(

		this, opt_content,
		opt_renderer || zz.ui.mdl.MenuItemRenderer.getInstance( ),
		opt_domHelper );

	this.setAutoStates( goog.ui.Component.State.ALL, false );
};
goog.inherits( zz.ui.mdl.MenuItem, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.MenuItem );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.MenuItem.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.MenuItem.CSS = {

	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-button__ripple-container' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.MenuItem.prototype.enterDocument = function( ){

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
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.MenuItem.CSS.RIPPLE_EFFECT ) ){

		this.getHandler( ).listenWithScope(

			goog.dom.getElementByClass( zz.ui.mdl.MenuItem.CSS.RIPPLE, this.getElement( ) ),
			goog.events.EventType.MOUSEUP,
			this.blurListener_,
			false,
			this
		);
		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate( goog.dom.getElementByClass( zz.ui.mdl.MenuItem.CSS.RIPPLE_CONTAINER, this.getElement( ) ) );
	}
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.MenuItem.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element blur event.
 * @param {goog.events.BrowserEvent} event
 * @this {zz.ui.mdl.MenuItem}
 * @private
 */
zz.ui.mdl.MenuItem.prototype.blurListener_ = function( event ){

	if( event ){

		this.getElement( ).blur( );
	}
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Enable/disable button.
 * @param {boolean} enable
 */
zz.ui.mdl.MenuItem.prototype.setEnabled = function( enable ){

	zz.ui.mdl.MenuItem.superClass_.setEnabled.call( this, enable );
	this.getElement( ).disabled = !enable;
};
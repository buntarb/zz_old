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
 * @fileoverview Provide zz.ui.mdl.ButtonRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.ButtonRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Button}s. Extends the superclass to support buttons states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.ButtonRenderer = function( ){

	zz.ui.mdl.ButtonRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.ButtonRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.ButtonRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.ButtonRenderer.CSS_CLASS = goog.getCssName( 'mdl-button' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.ButtonRenderer.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.ButtonRenderer.prototype.canDecorate = function( element ){

	return element.tagName == goog.dom.TagName.BUTTON || ( element.tagName == goog.dom.TagName.INPUT && (

		element.type == goog.dom.InputType.BUTTON ||
		element.type == goog.dom.InputType.SUBMIT ||
		element.type == goog.dom.InputType.RESET ) );
};

/**
 * @override
 */
zz.ui.mdl.ButtonRenderer.prototype.decorate = function( control, element ){

	if( goog.dom.classlist.contains( element, zz.ui.mdl.Button.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Button.CSS.RIPPLE_CONTAINER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Button.CSS.RIPPLE
		} ) ) );
	}
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.ButtonRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.ButtonRenderer.CSS_CLASS;
};

/**
 * Returns the element within the component's DOM that should receive keyboard focus (null if none).  The default
 * implementation returns the control's root element.
 * @param {zz.ui.mdl.Control} control Control whose key event target is to be returned.
 * @return {Element} The key event target.
 * @override
 */
zz.ui.mdl.ButtonRenderer.prototype.getKeyEventTarget = function( control ){

	return control.getElement( );
};

/**********************************************************************************************************************
 * Register a decorator factory function for goog.ui.Buttons.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.ButtonRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Button( );
} );
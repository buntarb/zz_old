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
 * @fileoverview Provide zz.ui.mdl.MenuItemRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.MenuItemRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.MenuItem}s. Extends the superclass to support buttons states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.MenuItemRenderer = function( ){

	zz.ui.mdl.MenuItemRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.MenuItemRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.MenuItemRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.MenuItemRenderer.CSS_CLASS = goog.getCssName( 'mdl-menu__item' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.MenuItemRenderer.prototype.createDom = function( control ){

	var element= control.getDomHelper( ).createDom( goog.dom.TagName.LI, { }, control.getContent( ) );
	goog.dom.classlist.add( element, zz.ui.mdl.MenuItemRenderer.CSS_CLASS );
	goog.dom.classlist.add( element, zz.ui.mdl.MenuItem.CSS.RIPPLE_EFFECT );
	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.MenuItem.CSS.RIPPLE_CONTAINER

	}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.MenuItem.CSS.RIPPLE
	} ) ) );
	return element;
};

/**
 * @override
 */
zz.ui.mdl.MenuItemRenderer.prototype.canDecorate = function( element ){

	return element.tagName == goog.dom.TagName.LI;
};

zz.ui.mdl.MenuItemRenderer.prototype.render = function(){};

/**
 * @override
 */
zz.ui.mdl.MenuItemRenderer.prototype.decorate = function( control, element ){

	if( goog.dom.classlist.contains( element, zz.ui.mdl.MenuItem.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.MenuItem.CSS.RIPPLE_CONTAINER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.MenuItem.CSS.RIPPLE
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
zz.ui.mdl.MenuItemRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.MenuItemRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Register a decorator factory function for goog.ui.Buttons.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.MenuItemRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.MenuItem( );
} );
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
 * @fileoverview Provide zz.ui.mdl.CheckboxRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.CheckboxRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );
goog.require( 'zz.ui.mdl.Checkbox' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Checkbox}s. Extends the superclass to support buttons states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.CheckboxRenderer = function( ){

	zz.ui.mdl.CheckboxRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.CheckboxRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.CheckboxRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.CheckboxRenderer.CSS_CLASS = goog.getCssName( 'mdl-checkbox' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.CheckboxRenderer.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.CheckboxRenderer.prototype.canDecorate = function( element ){

	return true;
	//TODO: add check of the element
};

/**
 * @override
 */
zz.ui.mdl.CheckboxRenderer.prototype.decorate = function( control, element ){

	if( goog.dom.classlist.contains( element, zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE_CONTAINER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE
		} ) ) );
	}

	//TODO: add code for create DOM


	//<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
	//	<input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" checked>
	//	<span class="mdl-checkbox__label">Checkbox</span>
	//</label>
	//
    //
	//goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.INPUT, {
    //
	//	'class': zz.ui.mdl.Checkbox.CSS.INPUT,
	//	'id': 'checkbox-1',
	//	'type': 'checkbox'
    //
	//}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {
    //
	//	'class': zz.ui.mdl.Checkbox.CSS.RIPPLE
	//} ) ) );


	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.CheckboxRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.CheckboxRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Register a decorator factory function for goog.ui.Buttons.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.CheckboxRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Checkbox( );
} );
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
 * @fileoverview Provide zz.ui.mdl.SwitchRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.SwitchRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );
goog.require( 'zz.ui.mdl.Switch' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Switch}s. Extends the superclass to support buttons states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.SwitchRenderer = function( ){

	zz.ui.mdl.SwitchRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.SwitchRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.SwitchRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.SwitchRenderer.CSS_CLASS = goog.getCssName( 'mdl-switch' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.SwitchRenderer.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.SwitchRenderer.prototype.canDecorate = function( ){

	//TODO: add check of the element
	return true;
};

/**
 * @param {zz.ui.mdl.Switch} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.SwitchRenderer.prototype.decorate = function( control, element ){

	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.FOCUS_HELPER
	} ) );
	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.BOX_OUTLINE

	}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.TICK_OUTLINE

	} ) ) );
	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE_CONTAINER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE
		} ) ) );
	}
	// Input element.
	control.setCheckboxElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.Checkbox.CSS.INPUT,
		element )[ 0 ]
	);
	goog.dom.classlist.add( element, zz.ui.mdl.Switch.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.SwitchRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.SwitchRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.Switch} control
 */
zz.ui.mdl.SwitchRenderer.prototype.updateClasses = function( control ){

	//noinspection JSUnresolvedFunction
	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Switch.CSS.IS_DISABLED );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Switch.CSS.IS_DISABLED );
	}
	//noinspection JSUnresolvedFunction
	if( control.isChecked( ) ){

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Switch.CSS.IS_CHECKED );

	}else{

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Switch.CSS.IS_CHECKED );
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Switches.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.SwitchRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Switch( );
} );
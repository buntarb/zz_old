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
 * @fileoverview Provide zz.ui.mdl.TextFieldRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.TextFieldRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.TextField}s. Extends the superclass to support switches states.
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
 * @param {zz.ui.mdl.Switch} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.SwitchRenderer.prototype.decorate = function( control, element ){

	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Switch.CSS.TRACK
	} ) );
	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Switch.CSS.THUMB

	}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Switch.CSS.FOCUS_HELPER

	} ) ) );
	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Switch.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.Switch.CSS.RIPPLE_CONTAINER + ' ' +
				zz.ui.mdl.Switch.CSS.RIPPLE_EFFECT + ' ' +
				zz.ui.mdl.Switch.CSS.RIPPLE_CENTER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.Switch.CSS.RIPPLE + ' ' +
				zz.ui.mdl.Switch.CSS.IS_ANIMATING
		} ) ) );
	}
	// Input element.
	control.setInputElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.Switch.CSS.INPUT,
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
 * Set control input element value.
 * @param {zz.ui.mdl.Switch} control
 * @param {*} value
 */
zz.ui.mdl.SwitchRenderer.prototype.setValue = function( control, value ){

	control.setChecked( value );
	control.getInputElement( ).checked = value;
	this.updateClasses( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.Switch} control
 * @returns {*} value
 */
zz.ui.mdl.SwitchRenderer.prototype.getValue = function( control ){

	return control.getInputElement( ).checked;
};

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
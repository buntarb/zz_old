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
zz.ui.mdl.TextFieldRenderer = function( ){

	zz.ui.mdl.TextFieldRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.TextFieldRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.TextFieldRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.TextFieldRenderer.CSS_CLASS = goog.getCssName( 'mdl-textfield' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.TextField} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.TextFieldRenderer.prototype.decorate = function( control, element ){

	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.TextField.CSS.ERROR
	} ) );

	zz.ui.mdl.TextField.label = control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.LABEL,
		zz.ui.mdl.TextField.CSS.LABEL
	);
	zz.ui.mdl.TextField.input = control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.TextField.CSS.INPUT
	);  //PROBLEM: maybe I have to use control.getInputElement?
	zz.ui.mdl.TextField.maxRows = zz.ui.mdl.TextField.CONST.NO_MAX_ROWS;

	if (zz.ui.mdl.TextField.input) {
		if (zz.ui.mdl.TextField.input.hasAttribute(  //PROBLEM: here is error in console
				/** @type {string} */ (zz.ui.mdl.TextField.CONST.MAX_ROWS_ATTRIBUTE))) {
			this.maxRows = parseInt(zz.ui.mdl.TextField.input.getAttribute(
				/** @type {string} */ (zz.ui.mdl.TextField.CONST.MAX_ROWS_ATTRIBUTE)), 10);
			if (isNaN(zz.ui.mdl.TextField.maxRows)) {
				zz.ui.mdl.TextField.maxRows = zz.ui.mdl.TextField.CONST.NO_MAX_ROWS;
			}
		}
	}


	// Input element.
	control.setInputElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.TextField.CSS.INPUT,
		element )[ 0 ]
	);
	goog.dom.classlist.add( element, zz.ui.mdl.TextField.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.TextFieldRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.TextFieldRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Set control input element value.
 * @param {zz.ui.mdl.TextField} control
 * @param {*} value
 */
zz.ui.mdl.TextFieldRenderer.prototype.setValue = function( control, value ){

	this.updateClasses( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.TextField} control
 * @returns {*} value
 */
zz.ui.mdl.TextFieldRenderer.prototype.getValue = function( control ){

	//return control.getInputElement( ).checked; //PROBLEM: I dont understand what I have to write in this function
};

/**
 * @param {zz.ui.mdl.TextField} control
 */
zz.ui.mdl.TextFieldRenderer.prototype.updateClasses = function( control ){

	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DISABLED );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DISABLED );
	}

	if (control.validity) {
		if (control.validity.valid) {
			goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_INVALID );
		} else {
			goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_INVALID );
		}
	}

	if( control.value && control.value.length > 0 ) {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DIRTY );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DIRTY );
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.TextFields.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.TextFieldRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.TextField( );
} );
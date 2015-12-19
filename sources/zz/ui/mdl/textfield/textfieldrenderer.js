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

	// Label element
	control.setLabelElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.LABEL,
		zz.ui.mdl.TextField.CSS.LABEL
	) );

	// Input element
	control.setInputElement( control.getDomHelper( ).getElementByClass(

		zz.ui.mdl.TextField.CSS.INPUT
	) );

	// Text aria element attributes
	if( control.getInputElement( ).hasAttribute( zz.ui.mdl.TextField.CONST.MAX_ROWS_ATTRIBUTE ) ){

		control.setMaxRows(

			parseInt(

				control.getInputElement( ).getAttribute( zz.ui.mdl.TextField.CONST.MAX_ROWS_ATTRIBUTE ),
				10 ) );

		if( isNaN( control.getMaxRows( ) ) ){

			control.setMaxRows( zz.ui.mdl.TextField.CONST.NO_MAX_ROWS );
		}
	}
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
 * @param {zz.ui.mdl.TextField} control
 */
zz.ui.mdl.TextFieldRenderer.prototype.updateClasses = function( control ){

	//noinspection JSUnresolvedFunction
	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DISABLED );

	}else{

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DISABLED );
	}
	if( control.getInputElement( ).validity ){

		if( control.getInputElement( ).validity.valid ){

			goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_INVALID );

		}else{

			goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_INVALID );
		}
	}
	if( control.getInputValue( ).length > 0 ){

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DIRTY );

	}else{

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.TextField.CSS.IS_DIRTY );
	}
};

/**
 * Set control input element value.
 * @param {zz.ui.mdl.TextField} control
 * @param {*} value
 * @override
 */
zz.ui.mdl.TextFieldRenderer.prototype.setValue = function( control, value ){

	control.getInputElement( ).value = value;
	this.updateClasses( control );
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.TextFields.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.TextFieldRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.TextField( );
} );
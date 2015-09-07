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
 * @fileoverview Provide zz.ui.InputRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.InputRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.ui.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base input control.
 * @constructor
 * @extends {goog.ui.InputRenderer}
 */
zz.ui.InputRenderer = function( ){

	goog.ui.ControlRenderer.call( this );
};
goog.inherits( zz.ui.InputRenderer, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.ui.InputRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
zz.ui.InputRenderer.CSS_CLASS = goog.getCssName( 'zz-control-input' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Overrides by returning true only if the element is an HTML input.
 * @override
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
zz.ui.InputRenderer.prototype.canDecorate = function( element ){

	return element.tagName == goog.dom.TagName.INPUT;
};

/**
 * @override
 * @param {zz.ui.Input} input
 * @returns {Element}
 */
zz.ui.InputRenderer.prototype.createDom = function( input ){

	return input.getDomHelper( ).createDom( 'input', {

		'id': input.getId( ),
		'type': 'text',
		'value': input.getViewValue( )
	} );
};

/**
 * @override
 * @param {zz.ui.Input} input
 * @param {Element} element
 * @returns {Element}
 */
zz.ui.InputRenderer.prototype.decorate = function( input, element ){

	element = zz.ui.InputRenderer.superClass_.decorate.call( this, input, element );
	//noinspection JSUnresolvedVariable
	input.setContent( element.value );
	return element;
};

/**
 * @override
 */
zz.ui.InputRenderer.prototype.setContent = function( element, value ){

	if( element ){

		element.value = value;
	}
};

/**
 * @override
 */
zz.ui.InputRenderer.prototype.getCssClass = function( ){

	return zz.ui.InputRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * View elements and elements properties access methods                                                               *
 **********************************************************************************************************************/

/**
 * Return input element.
 * @param {zz.ui.Input} input
 * @returns {Element}
 */
zz.ui.InputRenderer.prototype.getInputElement = function( input ){

	return input.getElement( );
};

/**
 * Return input element.
 * @param {zz.ui.Input} input
 * @returns {string}
 */
zz.ui.InputRenderer.prototype.getInputElementValue = function( input ){

	return input.getElement( ).value;
};
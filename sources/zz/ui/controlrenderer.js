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
 * @fileoverview Provide zz.ui.ControlRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.ControlRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.ui.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base input control.
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
zz.ui.ControlRenderer = function( ){

	goog.ui.ControlRenderer.call( this );
};
goog.inherits( zz.ui.ControlRenderer, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.ui.ControlRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
zz.ui.ControlRenderer.CSS_CLASS = goog.getCssName( 'zz-control' );

/**
 * Default CSS class for error state.
 * @type {string}
 */
zz.ui.ControlRenderer.CSS_ERROR_CLASS = goog.getCssName( 'zz-control-error' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.ControlRenderer.prototype.getCssClass = function( ){

	return zz.ui.ControlRenderer.CSS_CLASS;
};

/**
 * Overrides by returning true only if the element is an HTML input.
 * @override
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
zz.ui.ControlRenderer.prototype.canDecorate = function( element ){

	return element.tagName == goog.dom.TagName.INPUT;
};

/**
 * @override
 * @param {goog.ui.Control} input
 * @returns {Element}
 */
zz.ui.ControlRenderer.prototype.createDom = function( input ){

	return input.getDomHelper( ).createDom( 'input', {

		'id': input.getId( ),
		'type': 'text'
	} );
};

/**
 * @override
 * @param {zz.ui.Control} input
 * @param {Element} element
 * @returns {Element}
 */
zz.ui.ControlRenderer.prototype.decorate = function( input, element ){

	element = zz.ui.ControlRenderer.superClass_.decorate.call( this, input, element );
	//noinspection JSUnresolvedVariable
	input.setContent( element.value );
	return element;
};

/**
 * @override
 */
zz.ui.ControlRenderer.prototype.setContent = function( element, value ){

	if( element ){

		element.value = value;
	}
};

/**********************************************************************************************************************
 * View elements and elements properties access methods                                                               *
 **********************************************************************************************************************/

/**
 * Add error state to control.
 * @param {zz.ui.Control} input
 * @param {string} error
 */
zz.ui.ControlRenderer.prototype.addErrorState = function( input, error ){

	var el = input.getElement( );
	if( error ){

		if( !goog.dom.classlist.contains( el, zz.ui.ControlRenderer.CSS_ERROR_CLASS ) ){

			goog.dom.classlist.add( el, zz.ui.ControlRenderer.CSS_ERROR_CLASS );
		}
	}
};

/**
 * Remove error state from control.
 * @param {zz.ui.Control} input
 */
zz.ui.ControlRenderer.prototype.removeErrorState = function( input ){

	var el = input.getElement( );
	if( goog.dom.classlist.contains( el, zz.ui.ControlRenderer.CSS_ERROR_CLASS ) ){

		goog.dom.classlist.remove( el, zz.ui.ControlRenderer.CSS_ERROR_CLASS );
	}
};

/**
 * Return input element.
 * @param {zz.ui.Control} input
 * @returns {Element}
 */
zz.ui.ControlRenderer.prototype.getChangeableElement = function( input ){

	return input.getElement( );
};

/**
 * Return input element.
 * @param {zz.ui.Control} input
 * @returns {string}
 */
zz.ui.ControlRenderer.prototype.getChangeableElementValue = function( input ){

	return input.getElement( ).value;
};
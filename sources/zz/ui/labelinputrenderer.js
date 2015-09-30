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
 * @fileoverview Provide zz.ui.LabelInputRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.LabelInputRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'goog.ui.LabelInput' );
goog.require( 'goog.ui.Button' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base input control.
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
zz.ui.LabelInputRenderer = function( ){

	goog.ui.ControlRenderer.call( this );
};
goog.inherits( zz.ui.LabelInputRenderer, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.ui.LabelInputRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
zz.ui.LabelInputRenderer.CSS_CLASS = goog.getCssName( 'zz-label-input' );

/**
 * Default CSS class for error state.
 * @type {string}
 */
zz.ui.LabelInputRenderer.CSS_ERROR_CLASS = goog.getCssName( 'zz-label-input-error' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.LabelInputRenderer.prototype.getCssClass = function( ){

	return zz.ui.LabelInputRenderer.CSS_CLASS;
};

/**
 * Overrides by returning true only if the element is an HTML input.
 * @override
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
zz.ui.LabelInputRenderer.prototype.canDecorate = function( element ){

	return element.tagName == goog.dom.TagName.INPUT;
};

/**
 * @override
 * @param {zz.ui.LabelInput} control
 * @returns {Element}
 */
zz.ui.LabelInputRenderer.prototype.createDom = function( control ){

	var element = goog.base( this, 'createDom', control );
	var helper = control.getDomHelper( );
	var input = new goog.ui.LabelInput( '', helper );
	var button = new goog.ui.Button( '', undefined, helper );
	var inputWrapper = helper.createDom( 'div', { 'class': goog.getCssName( 'input' ) } );
	var buttonWrapper = helper.createDom( 'div', { 'class': goog.getCssName( 'button' ) } );

	goog.dom.appendChild( element, inputWrapper );
	goog.dom.appendChild( element, buttonWrapper );

	control.setElementInternal( inputWrapper );
	control.addChild( input, true );

	control.setElementInternal( buttonWrapper );
	control.addChild( button, true );

	return element;
};

/**
 * @override
 * @param {zz.ui.LabelInput} control
 * @param {Element} element
 * @returns {Element}
 */
zz.ui.LabelInputRenderer.prototype.decorate = function( control, element ){

	element = zz.ui.LabelInputRenderer.superClass_.decorate.call( this, control, element );
	control.setContent( element.value );
	return element;
};

/**
 * @override
 */
zz.ui.LabelInputRenderer.prototype.setContent = function( element, value ){

	if( element ){

		if( goog.isDef( element.textContent ) ){

			element.textContent = value;

		}else{

			element.innerText = value;
		}
	}
};
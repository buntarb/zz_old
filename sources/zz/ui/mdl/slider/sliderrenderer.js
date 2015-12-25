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
 * @fileoverview Provide zz.ui.mdl.SliderRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.SliderRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Slider}s. Extends the superclass to support sliders states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.SliderRenderer = function( ){

	zz.ui.mdl.SliderRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.SliderRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.SliderRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.SliderRenderer.CSS_CLASS = goog.getCssName( 'mdl-slider' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.Slider} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.SliderRenderer.prototype.decorate = function( control, element ){
	if( this.isIE_ ){

		var containerIE = goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.IE_CONTAINER
		} );

		// Container element
		control.setContainerElement( containerIE );

		goog.dom.insertSiblingBefore( containerIE, element );
		goog.dom.appendChild( containerIE, element );
		return goog.base( this, 'decorate', control, containerIE );

	}else{

		var container = goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.SLIDER_CONTAINER
		} );

		// Container element
		control.setContainerElement( container );

		goog.dom.insertSiblingBefore( container, element );
		goog.dom.appendChild( container, element );

		goog.dom.appendChild( container, goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX
		} ) );
		control.setBackgroundLower( goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.BACKGROUND_LOWER
		} ) );
		goog.dom.appendChild( goog.dom.getElementByClass( zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX ),

			control.getBackgroundLower( ) );

		control.setBackgroundUpper( goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.BACKGROUND_UPPER
		} ) );
		goog.dom.appendChild( goog.dom.getElementByClass( zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX ),

			control.getBackgroundUpper( ) );

		goog.dom.classlist.add( element, zz.ui.mdl.Slider.CSS.IS_UPGRADED );
		return goog.base( this, 'decorate', control, container );
	}
};


/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.SliderRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.SliderRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/
/**
 * Set control input element value.
 * @param {zz.ui.mdl.Slider} control
 * @param {*} value
 */
zz.ui.mdl.SliderRenderer.prototype.setValue = function( control, value ){

	control.getInputElement( ).value = value;
	this.updateClasses( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.Slider} control
 * @returns {*} value
 */
zz.ui.mdl.SliderRenderer.prototype.getValue = function( control ){

	return control.getInputElement( ).value;
};

/**
 * @param {zz.ui.mdl.Slider} control
 */
zz.ui.mdl.SliderRenderer.prototype.updateClasses = function( control ){

	// Calculate and apply percentages to div structure behind slider.
	var fraction = (
		control.getInputElement( ).value - control.getInputElement( ).min ) /
		( control.getInputElement( ).max - control.getInputElement( ).min );

	if( fraction === 0 ) {

		goog.dom.classlist.add( control.getInputElement( ), zz.ui.mdl.Slider.CSS.IS_LOWEST_VALUE );

	}else{

		goog.dom.classlist.remove( control.getInputElement( ), zz.ui.mdl.Slider.CSS.IS_LOWEST_VALUE );

	}
	if( !control.getisIE_ ) {

		goog.style.setStyle( control.getBackgroundLower( ), {

			flex : fraction,
			webkitFlex : fraction,
		} );
		goog.style.setStyle( control.getBackgroundUpper( ), {

			flex : 1 - fraction,
			webkitFlex : 1 - fraction,
		} );
	}
};
/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Sliders.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.SliderRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Slider( );
} );
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

	zz.ui.mdl.SwitchRenderer.base( this, 'constructor' );
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
	if ( this.isIE_ ) {

		var containerIE = goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.IE_CONTAINER
		} );

		// Container element
		control.setcontainerElement( containerIE );

		goog.dom.insertSiblingBefore( containerIE, element );
		goog.dom.appendChild( containerIE, element );
	} else {


		var container = goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.SLIDER_CONTAINER
		} );

		// Container element
		control.setcontainerElement( container );

		goog.dom.insertSiblingBefore( container, element );
		goog.dom.appendChild( container, element );

		goog.dom.appendChild( container, goog.dom.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX
		} ) );

		goog.dom.appendChild( goog.dom.getElementByClass( zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX ),

			goog.dom.createDom( goog.dom.TagName.DIV, {

				'class': zz.ui.mdl.Slider.CSS.BACKGROUND_LOWER

			} ) );

		goog.dom.appendChild( goog.dom.getElementByClass( zz.ui.mdl.Slider.CSS.BACKGROUND_FLEX ),

			goog.dom.createDom( goog.dom.TagName.DIV, {

				'class': zz.ui.mdl.Slider.CSS.BACKGROUND_UPPER

			} ) );

		goog.dom.classlist.add( element, zz.ui.mdl.Slider.CSS.IS_UPGRADED );
		zz.ui.mdl.Slider.prototype.updateValueStyles_( control );
		return goog.base( this, 'decorate', control, element );
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
 * @param {zz.ui.mdl.Swlider} control
 * @param {*} value
 */
zz.ui.mdl.SwitchRenderer.prototype.setValue = function( control, value ){

	control.getElement( ).value = value;
	zz.ui.mdl.SwitchRenderer.updateValueStyles_( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.Slider} control
 * @returns {*} value
 */
zz.ui.mdl.SwitchRenderer.prototype.getValue = function( control ){

	return control.getElement( ).value;
};
/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Switches.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.SliderRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Slider( );
} );
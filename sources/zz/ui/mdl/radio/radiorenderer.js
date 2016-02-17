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
 * @fileoverview Provide zz.ui.mdl.RadioRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.RadioRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Radio}s. Extends the superclass to support radios states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.RadioRenderer = function( ){

	zz.ui.mdl.RadioRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.RadioRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.RadioRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.RadioRenderer.CSS_CLASS = goog.getCssName( 'mdl-radio' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.Radio} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.RadioRenderer.prototype.decorate = function( control, element ){

	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Radio.CSS.RADIO_OUTER_CIRCLE
	} ) );
	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Radio.CSS.RADIO_INNER_CIRCLE

	} ) );
	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Radio.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.Radio.CSS.RIPPLE_CONTAINER + ' ' +
				zz.ui.mdl.Radio.CSS.RIPPLE_EFFECT + ' ' +
				zz.ui.mdl.Radio.CSS.RIPPLE_CENTER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class':

				zz.ui.mdl.Radio.CSS.RIPPLE + ' ' +
				zz.ui.mdl.Radio.CSS.IS_ANIMATING
		} ) ) );
	}
	// Input element.
	control.setInputElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.Radio.CSS.RADIO_BTN,
		element )[ 0 ]
	);
	goog.dom.classlist.add( element, zz.ui.mdl.Radio.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.RadioRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.RadioRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Updates the appearance of the control in response to a state change.
 * @param {zz.ui.mdl.Control} control Control instance to update.
 * @param {goog.ui.Component.State} state State to enable or disable.
 * @param {boolean} enable Whether the control is entering or exiting the state.
 * @override
 */
zz.ui.mdl.RadioRenderer.prototype.setState = function( control, state, enable ){

	var element = control.getElement( );
	if( element ){

		if( state === goog.ui.Component.State.FOCUSED ){

			if( !goog.dom.classlist.contains( element, zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

				this.enableClassName( control, zz.ui.mdl.Checkbox.CSS.IS_FOCUSED, enable );
			}
		}
		this.updateAriaState(element, state, enable);
	}
};

/**
 * Set control input element value.
 * @param {zz.ui.mdl.Radio} control
 * @param {*} value
 */
zz.ui.mdl.RadioRenderer.prototype.setValue = function( control, value ){

	control.getInputElement( ).checked = value === control.getInputElement( ).value;
	control.setChecked( control.getInputElement( ).checked );
	this.updateClasses( control );
};

/**
 * @param {zz.ui.mdl.Radio} control
 */
zz.ui.mdl.RadioRenderer.prototype.updateClasses = function( control ){

	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Radio.CSS.IS_DISABLED );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Radio.CSS.IS_DISABLED );
	}
	if( control.isChecked( ) ){

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Radio.CSS.IS_CHECKED );

	}else{

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Radio.CSS.IS_CHECKED );
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Radios.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.RadioRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Radio( );
} );
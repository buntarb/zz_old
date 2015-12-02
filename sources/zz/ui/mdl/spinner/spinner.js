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
 * @fileoverview Provide zz.ui.mdl.Spinner class.
 * @author aleksander.popkov@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Spinner' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Material ripple fx class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.mdl.Spinner = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.mdl.Spinner, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.mdl.Spinner );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Spinner.CONST = {

	MDL_SPINNER_LAYER_COUNT: 4
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Spinner.CSS = {

	MDL_SPINNER_LAYER: goog.getCssName( 'mdl-spinner__layer' ),
	MDL_SPINNER_LAYER_1: goog.getCssName( 'mdl-spinner__layer-1' ),
	MDL_SPINNER_LAYER_2: goog.getCssName( 'mdl-spinner__layer-2' ),
	MDL_SPINNER_LAYER_3: goog.getCssName( 'mdl-spinner__layer-3' ),
	MDL_SPINNER_LAYER_4: goog.getCssName( 'mdl-spinner__layer-4' ),
	MDL_SPINNER_CIRCLE_CLIPPER: goog.getCssName( 'mdl-spinner__circle-clipper' ),
	MDL_SPINNER_CIRCLE: goog.getCssName( 'mdl-spinner__circle' ),
	MDL_SPINNER_GAP_PATCH: goog.getCssName( 'mdl-spinner__gap-patch' ),
	MDL_SPINNER_LEFT: goog.getCssName( 'mdl-spinner__left' ),
	MDL_SPINNER_RIGHT: goog.getCssName( 'mdl-spinner__right' ),
	MDL_SPINNER_IS_ACTIVE: goog.getCssName( 'is-active' ),
	MDL_SPINNER_IS_UPGRADED: goog.getCssName( 'is-upgraded' )
};

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.Spinner.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.Spinner.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );

	var i;
	var j;
	var layer;
	var leftClipper;
	var gapPatch;
	var rightClipper;
	var circleOwners;
	var circle;

	if( element ){

		for( i = 1; i <= zz.ui.mdl.Spinner.CONST.MDL_SPINNER_LAYER_COUNT; i++ ){

			layer =  this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
			layer.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LAYER );
			switch ( i ){

				case 1:

					layer.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LAYER_1 );
					break;

				case 2:

					layer.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LAYER_2 );
					break;

				case 3:

					layer.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LAYER_3 );
					break;

				case 4:

					layer.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LAYER_4 );
					break;

				default:

					break;
			}
			goog.dom.appendChild( element, layer );

			leftClipper = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
			leftClipper.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_CIRCLE_CLIPPER );
			leftClipper.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_LEFT );

			gapPatch = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
			gapPatch.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_GAP_PATCH );

			rightClipper = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
			rightClipper.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_CIRCLE_CLIPPER );
			rightClipper.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_RIGHT );

			goog.dom.appendChild( layer, leftClipper );
			goog.dom.appendChild( layer, gapPatch );
			goog.dom.appendChild( layer, rightClipper );

			circleOwners = [ leftClipper, gapPatch, rightClipper ];
			for( j = 0; j < circleOwners.length; j++ ){

				circle = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
				circle.classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_CIRCLE );
				goog.dom.appendChild( circleOwners[ j ], circle );
			}
		}
		goog.dom.classlist.add( element, zz.ui.mdl.Spinner.CSS.MDL_SPINNER_IS_UPGRADED );
	}
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Spinner.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Spinner.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.mdl.Spinner.prototype.getCssClass = function( ){

	return zz.ui.mdl.Spinner.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Stops the spinner animation.
 * Public method for users who need to stop the spinner for any reason.
 * @public
 */
zz.ui.mdl.Spinner.prototype.stop = function( ){

	this.getElement( ).classList.remove( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_IS_ACTIVE );
};

/**
 * Starts the spinner animation.
 * Public method for users who need to manually start the spinner for any reason
 * (instead of just adding the 'is-active' class to their markup).
 * @public
 */
zz.ui.mdl.Spinner.prototype.start = function( ){

	this.getElement( ).classList.add( zz.ui.mdl.Spinner.CSS.MDL_SPINNER_IS_ACTIVE );
};
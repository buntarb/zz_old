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
 * @fileoverview Provide zz.mvc.View class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.View' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.mvc.View = function( ){

	goog.ui.ControlRenderer.call( this );
};
goog.inherits( zz.mvc.View, goog.ui.ControlRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of view.
 * @type {string}
 */
zz.mvc.View.CSS_CLASS = goog.getCssName( 'zz-view' );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.mvc.View.prototype.getCssClass = function( ){

	return zz.mvc.View.CSS_CLASS;
};

/**********************************************************************************************************************
 * Methods to override                                                                                                *
 **********************************************************************************************************************/

/**
 * Takes the controller's root element and returns the parent element of the controller's contents. Since by default
 * controllers are rendered as a single DIV, the default implementation returns the element itself. Subclasses with
 * more complex DOM structures must override this method as needed.
 * @override
 */
zz.mvc.View.prototype.getContentElement = function( element ){

	return zz.mvc.View.superClass_.getContentElement.call( this, element );
};

/**
 * Returns true if this view can decorate the element, false otherwise. The default implementation returns true if
 * elements tag name is DIV.
 * @override
 */
zz.mvc.View.prototype.canDecorate = function( element ){

	return zz.mvc.View.superClass_.canDecorate.call( this, element );
};

/**
 * Returns the controller's contents wrapped in a DIV, with the view's own CSS class and additional state-specific
 * classes applied to it.
 * @override
 */
zz.mvc.View.prototype.createDom = function( controller ){

	return zz.mvc.View.superClass_.createDom.call( this, controller );
};

/**
 * Default implementation of {@code decorate}. Initializes the controller's ID, content, and state based on the ID of
 * the element, its child nodes, and its CSS classes, respectively. Returns the element.
 * @override
 */
zz.mvc.View.prototype.decorate = function( controller, element ){

	return zz.mvc.View.superClass_.decorate.call( this, controller, element );
};

/**
 * Takes a controller's root element, and sets its content to the given text caption or DOM structure. The default
 * implementation replaces the children of the given element. Views that create more complex DOM structures must
 * override this method accordingly.
 * @override
 */
zz.mvc.View.prototype.setContent = function( element, value ){

	zz.mvc.View.superClass_.setContent.call( this, element, value );
};
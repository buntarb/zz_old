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
 * @fileoverview Provide zz.ui.Container class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Container' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.Container' );
goog.require( 'zz.ui.Control' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base container.
 * @param {?goog.ui.Container.Orientation=} opt_orientation Container orientation; defaults to {@code VERTICAL}.
 * @param {goog.ui.ContainerRenderer=} opt_renderer Renderer used to render or decorate the container..
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Container}
 */
zz.ui.Container = function( opt_orientation, opt_renderer, opt_domHelper ){

	goog.ui.Container.call( this, opt_orientation, opt_renderer, opt_domHelper );
	this.setFocusable( true );
};
goog.inherits( zz.ui.Container, goog.ui.Container );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Adds the control as a child of this container at the given 0-based index.
 * @param {zz.ui.Control} control
 * @param {number} index
 * @override
 */
zz.ui.Container.prototype.addChildAt = function( control, index ){

	goog.asserts.assertInstanceof( control, zz.ui.Control );
	control.enableHandleViewChangeEvent( false );
	zz.ui.Container.superClass_.addChildAt.call( this, control, index, true );
};

/**
 * Removes a child control.
 * @param {zz.ui.Control} control The ID of the child to remove, or the control itself.
 * from the document (defaults to false).
 * @override
 */
zz.ui.Container.prototype.removeChild = function( control ){

	var ctrl = zz.ui.Container.superClass_.removeChild.call( this, control, true );
	ctrl.resetModel( );
	ctrl.disposeInternal( );
};
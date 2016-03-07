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
 * @fileoverview Provide zz.module.layout.view.Navigation class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.layout.view.Navigation' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'zz.ui.mdl.Navigation' );
goog.require( 'zz.template.module.layout' );

goog.require( 'zz.mvc.view.BaseView' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.layout.view.Navigation = function( opt_domHelper ){

	goog.base( this, 'Navigation layout', opt_domHelper );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.module.layout.view.Navigation, zz.ui.mdl.Navigation );

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.layout.view.Navigation.prototype.createDom = function( ){

	this.decorateInternal( soy.renderAsElement( zz.template.module.layout.default ) );
};

/**
 * @override
 */
zz.module.layout.view.Navigation.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
};
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
 * @fileoverview Provide zz.module.user.controller.Users class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.controller.Users' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.mvc.controller.BaseController' );
goog.require( 'zz.module.user.model.Users' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.module.user.view.Users} view
 * @extends {zz.mvc.controller.BaseController}
 * @constructor
 */
zz.module.user.controller.Users = function( view ){

	zz.mvc.controller.BaseController.call( this );

	// Initialize view with data.
	if( view instanceof zz.module.user.view.Users ){

		var users = goog.global.users = new zz.module.user.model.Users( );
		view.setModel( users );
	}
};

/**
 * Base inheritance.
 */
goog.inherits( zz.module.user.controller.Users, zz.mvc.controller.BaseController );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * @this {zz.module.user.view.Users}
 */
zz.module.user.controller.Users.prototype.addUser = function( ){

	this.getModel( ).dataset.createFirst( );
};

/**
 * @this {zz.module.user.view.User}
 */
zz.module.user.controller.Users.prototype.addPhone = function( ){

	this.getModel( ).dataset.createFirst( );
};
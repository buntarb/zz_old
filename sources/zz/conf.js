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
 * @fileoverview Provide zz.demos.App class.
 * @author buntarb@gmail.com (Artem Lytvynov aka buntarb)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.conf' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.app.Router' );
goog.require( 'zz.module.layout.view.DefaultNavigation' );
goog.require( 'zz.module.layout.view.LandingNavigation' );
goog.require( 'zz.module.post.view.GoldenRatioList' );
goog.require( 'zz.module.post.view.Post' );

goog.require( 'zz.module.user.view.Users' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.conf = function( ){

	zz.app.Router.getInstance( )

		.when( '', undefined, undefined, function( ){

			zz.app.Router.getInstance().setFragment( '/' );
		} )
		.when( '/', zz.module.layout.view.DefaultNavigation, zz.module.post.view.GoldenRatioList )
		.when( '/post', zz.module.layout.view.DefaultNavigation, zz.module.post.view.Post )
		.when( '/landing', zz.module.layout.view.LandingNavigation, zz.module.user.view.Users )
		.otherwise( '/error' );
};
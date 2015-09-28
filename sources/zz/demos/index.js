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

goog.provide( 'zz.demos.app' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'zz.module.user.view.User' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){

	var userView = new zz.module.user.view.User( );
	userView.render( goog.dom.getElement( 'root' ) );

	/******************************************************************************************************************
	 * Fast click testing                                                                                             *
	 ******************************************************************************************************************/

//	var customClickEvent = zz.events.getMouseEvent( goog.events.EventType.CLICK, 1, 10, 10, 10, 10 );
//	button_reset.getElement( ).dispatchEvent( customClickEvent );
};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
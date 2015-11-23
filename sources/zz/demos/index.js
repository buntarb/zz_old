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

goog.require( 'zz.module.user.view.Users' );
goog.require( 'zz.ui.Button' );
goog.require( 'zz.ui.Spinner' );

goog.require( 'zz.ui.Navigation' );

goog.require( 'soy' );
goog.require( 'zz.template.ui.button' );
goog.require( 'zz.template.ui.spinner' );
goog.require( 'zz.template.ui.navigation' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){



	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.spinner.default );

	var spn1 = new zz.ui.Spinner( );
		spn1.decorate( goog.dom.getElement( '1' ) );
	var spn2 = new zz.ui.Spinner( );
		spn2.decorate( goog.dom.getElement( '2' ) );

	/******************************************************************************************************************
	 * Fast click testing                                                                                             *
	 ******************************************************************************************************************/

};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
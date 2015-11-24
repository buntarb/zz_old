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

goog.require( 'soy' );
goog.require( 'goog.events' );
goog.require( 'goog.ui.Component' );

goog.require( 'soy' );

goog.require( 'zz.ui.Navigation' );
goog.require( 'zz.ui.Button' );
goog.require( 'zz.ui.Spinner' );
goog.require( 'zz.ui.Progress' );

goog.require( 'zz.template.ui.button' );
goog.require( 'zz.template.ui.spinner' );
goog.require( 'zz.template.ui.navigation' );
goog.require( 'zz.template.ui.progress' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){

//	Navigation
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.navigation.fixedHeadersAndTabs );
//
//	var layout = new zz.ui.Navigation( );
//		layout.decorate( goog.dom.getElementByClass( goog.getCssName( 'mdl-js-layout' ) ) );

//	Progress
	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.progress.default );

	var prg1 = new zz.ui.Progress( );
		prg1.decorate( goog.dom.getElement( '1' ) );
		prg1.setProgress( 10 );
	var prg2 = new zz.ui.Progress( );
		prg2.decorate( goog.dom.getElement( '2' ) );
	var prg3 = new zz.ui.Progress( );
		prg3.decorate( goog.dom.getElement( '3' ) );

//	Spinner
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.spinner.default );
//
//	var spn1 = new zz.ui.Spinner( );
//		spn1.decorate( goog.dom.getElement( '1' ) );
//	var spn2 = new zz.ui.Spinner( );
//		spn2.decorate( goog.dom.getElement( '2' ) );

//	var usersView = goog.global.userView =  new zz.module.user.view.Users( );
//		usersView.render( goog.dom.getElement( 'root' ) );

//	Buttons
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.button.default );
//	var btn1 = new zz.ui.Button( );
//		btn1.decorate( goog.dom.getElement( '1' ) );
//	var btn2 = new zz.ui.Button( );
//		btn2.decorate( goog.dom.getElement( '2' ) );
//	var btn3 = new zz.ui.Button( );
//		btn3.decorate( goog.dom.getElement( '3' ) );
//	var btn4 = new zz.ui.Button( );
//		btn4.decorate( goog.dom.getElement( '4' ) );
//	var btn5 = new zz.ui.Button( );
//		btn5.decorate( goog.dom.getElement( '5' ) );
//	var btn6 = new zz.ui.Button( );
//		btn6.decorate( goog.dom.getElement( '6' ) );
//	var btn7 = new zz.ui.Button( );
//		btn7.decorate( goog.dom.getElement( '7' ) );
//	var btn8 = new zz.ui.Button( );
//		btn8.decorate( goog.dom.getElement( '8' ) );
//	var btn9 = new zz.ui.Button( );
//		btn9.decorate( goog.dom.getElement( '9' ) );
//	var btn10 = new zz.ui.Button( );
//		btn10.decorate( goog.dom.getElement( '10' ) );
//	var btn11 = new zz.ui.Button( );
//		btn11.decorate( goog.dom.getElement( '11' ) );
//	var btn12 = new zz.ui.Button( );
//		btn12.decorate( goog.dom.getElement( '12' ) );
//	var btn13 = new zz.ui.Button( );
//		btn13.decorate( goog.dom.getElement( '13' ) );
//	var btn14 = new zz.ui.Button( );
//		btn14.decorate( goog.dom.getElement( '14' ) );
//	var btn15 = new zz.ui.Button( );
//		btn15.decorate( goog.dom.getElement( '15' ) );
//	var btn16 = new zz.ui.Button( );
//		btn16.decorate( goog.dom.getElement( '16' ) );
//	var btn17 = new zz.ui.Button( );
//		btn17.decorate( goog.dom.getElement( '17' ) );
//	var btn18 = new zz.ui.Button( );
//		btn18.decorate( goog.dom.getElement( '18' ) );
//	var btn19 = new zz.ui.Button( );
//		btn19.decorate( goog.dom.getElement( '19' ) );
//	var btn20 = new zz.ui.Button( );
//		btn20.decorate( goog.dom.getElement( '20' ) );

	/******************************************************************************************************************
	 * Fast click testing                                                                                             *
	 ******************************************************************************************************************/

};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
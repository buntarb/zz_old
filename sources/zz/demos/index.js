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

goog.require( 'goog.dom' );
goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'goog.ui.BidiInput' );
goog.require( 'goog.ui.Checkbox' );
goog.require( 'goog.ui.Button' );
goog.require( 'zz.events' );
goog.require( 'zz.template' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.model.ExampleUserSet' );
goog.require( 'zz.ui.Container' );
goog.require( 'zz.ui.Control' );
goog.require( 'zz.ui.CheckboxRenderer' );
goog.require( 'zz.ui.InputRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){

	/******************************************************************************************************************
	 * Data manipulation examples                                                                                     *
	 ******************************************************************************************************************/

	/**
	 * @type {zz.model.ExampleUserSet}
	 */
	var users = goog.global.users = new zz.model.ExampleUserSet( );

	/**
	 * @type {zz.model.ExampleUser}
	 */
	var user = users.createLast( );
		user.userFirstName = 'Vasily';
		user.userLastName = 'Pupkin';
		user.userLogin = 'vasily pupkin';
		user.userPassword = 'pupkin pass';
		user.userVerifiedFlag = true;
		user.userPhones.createLast( ['home', '+380991234567', true, 0] );
		user.userPhones.createLast( ['work', '+380991234567', true, 1] );

//	var firstNameCtrl = goog.global.ctrl = new zz.ui.Control( user, 0 );
//		firstNameCtrl.render( goog.dom.getElement( 'root' ) );
//
//	var lastNameCtrl = new zz.ui.Control( user, 1 );
//		lastNameCtrl.render( goog.dom.getElement( 'root' ) );
//
//	var userLoginCtrl = new zz.ui.Control( user, 2 );
//		userLoginCtrl.render( goog.dom.getElement( 'root' ) );
//
//	var userPasswordCtrl = new zz.ui.Control( user, 3, new zz.ui.InputRenderer( ) );
//		userPasswordCtrl.render( goog.dom.getElement( 'root' ) );
//
//	var userVerifiedFlagCtrl = new zz.ui.Control( user, 4, new zz.ui.CheckboxRenderer( ) );
//		userVerifiedFlagCtrl.render( goog.dom.getElement( 'root' ) );
//	var userContainer = goog.global.userContainer = new zz.ui.Container( );
//		userContainer.addChild( firstNameCtrl );
//		userContainer.addChild( lastNameCtrl );
//		userContainer.addChild( userLoginCtrl );
//		userContainer.addChild( userPasswordCtrl );
//		userContainer.addChild( userVerifiedFlagCtrl );
//		userContainer.render( goog.dom.getElement( 'root' ) );

	/**
	 * @type {zz.model.ExampleUserPhone}
	 */
	//var phone = goog.global.phone = user.userPhones.createLast( );
	//	phone.phoneType = 'mobile';
	//	phone.phoneNumber = '+380991234567';
	//	phone.phoneActiveFlag = true;
	//	phone.phoneOrder = 0;

	//var ctrl = goog.global.ctrl = new zz.ui.Control( phone, 2, new zz.ui.CheckboxRenderer( ) );
	//	ctrl.render( goog.dom.getElement( 'root' ) );

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
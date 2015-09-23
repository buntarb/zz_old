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

goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.model.ExampleUserSet' );
goog.require( 'zz.mvc.Controller' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){

	/******************************************************************************************************************
	 * Data manipulation examples                                                                                     *
	 ******************************************************************************************************************/

	var users = goog.global.users = /** @type {zz.model.ExampleUserSet} */ ( new zz.model.ExampleUserSet( ) );
	var user = /** @type {zz.model.ExampleUser} */ ( users.createLast( ) );
	user.userFirstName = 'Vasily';
	user.userLastName = 'Pupkin';
	user.userLogin = 'vasily pupkin';
	user.userPassword = 'pupkin pass';
	user.userVerifiedFlag = true;
	user.userPhones.createLast( [ 'home', '+380991234567', true, 0 ] );
	user.userPhones.createLast( [ 'work', '+380991234567', true, 1 ] );

	users.subscribe(

		new zz.mvc.Controller( ),
		zz.mvc.model.EventType.DATAROW_UPDATE,
		user,
		users.datafield.userFirstName
	);
	users.getEventHandler( ).listen( users, zz.mvc.model.EventType.DATAROW_UPDATE, function( evt ){

		console.log( evt )
	} );

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
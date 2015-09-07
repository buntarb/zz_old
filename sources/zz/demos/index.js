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
goog.require( 'zz.ui.Input' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = { };
zz.demos.app.run = function( ){

	/******************************************************************************************************************
	 * Data manipulation examples                                                                                     *
	 ******************************************************************************************************************/

	/**
	 * @type {zz.model.ExampleUserSet}
	 */
	var userSet = goog.global.userSet = new zz.model.ExampleUserSet( undefined, [[

		'Ivan',
		'Dorn',
		'ivandorn',
		'ivandornpass',
		true,
		[[
			'mobile',
			'+380991234567',
			true
		],[
			'home',
			'+380991234567',
			true
		]]
	],[
		'Lev',
		'Tolstoy',
		'levtolstoy',
		'levtolstoypass',
		true,
		[[
			'mobile',
			'+380991234567',
			true
		],[
			'home',
			'+380991234567',
			true
		]]
	]] );
	userSet.createLast( [

		'Fedor',
		'Dostoyevsky',
		'dostoevsky',
		'dostoevskypass',
		true,
		[[
			'mobile',
			'+380991234567',
			true
		],[
			'home',
			'+380991234567',
			true
		]]
	] );

	/**
	 * @type {zz.model.ExampleUserSet}
	 */
	var users = goog.global.users = new zz.model.ExampleUserSet( );

	/**
	 *  @type {zz.model.ExampleUser}
	 */
	var user = users.createLast( );

	user.userFirstName = 'Vasily';
	user.userLastName = 'Pupkin';
	user.userLogin = 'vasilypupkin';
	user.userPassword = 'pupkinpass';
	user.userVerifiedFlag = true;

	/**
	 * @type {zz.model.ExampleUserPhone}
	 */
	var phone = goog.global.phone = user.userPhones.createLast( );

	phone.phoneActiveFlag = true;
	phone.phoneType = 'mobile';
	phone.phoneNumber = '+380991234567';

	//user.userPhones.deleteCurrent( );

	var EVENTS = goog.object.getValues( zz.mvc.model.EventType );
	var CAPTURE = false;

	var el = new zz.ui.Input( undefined, goog.dom.getDomHelper( ) );
	el.setModel( phone, 0 );
	el.render( goog.dom.getElement( 'root' ) );
	el.enableDataBinding( );
	console.log( el );

//	goog.events.listen( users, EVENTS, function( evt ){
//
//		if( evt.type === zz.mvc.model.EventType.DATAROW_UPDATE &&
//			evt.target instanceof zz.mvc.model.ExampleUserPhone &&
//			evt.changes.phoneType ){
//
//			console.log( '' );
//			console.log( '------------------------------- UPDATE START ---------------------------------------------' );
//			console.log( 'Old user phone type value: ' + evt.changes.phoneType.from );
//			console.log( 'New user phone type value: ' + evt.changes.phoneType.to );
//			//console.log( evt );
//			console.log( '------------------------------- UPDATE END -----------------------------------------------' );
//			console.log( '' );
//
//		}else if( evt.type === zz.mvc.model.EventType.DATAROW_DELETE ){
//
//			console.log( '' );
//			console.log( '------------------------------- DELETE START ---------------------------------------------' );
//			console.log( 'Deleted row Id: ' + evt.getDeletedDatarow( ).getId( ) );
//			//console.log( evt );
//			console.log( '------------------------------- DELETE END -----------------------------------------------' );
//			console.log( '' );
//
//		}else{
//
//			console.log( '' );
//			console.log( '------------------------------- OTHER EVENT START ----------------------------------------' );
//			console.log( 'User Set Level: ' + evt.type );
//			console.log( '------------------------------- OTHER EVENT END ------------------------------------------' );
//			console.log( '' );
//		}
//	}, CAPTURE );

//	goog.events.listen( user, EVENTS, function( evt ){
//
//		console.log( 'User Row Level: ' + evt.type );
//
//	}, CAPTURE );
//
//	goog.events.listen( user.userPhones, EVENTS, function( evt ){
//
//		console.log( 'User Phone Set Level: ' + evt.type );
//
//	}, CAPTURE );
//
//	goog.events.listen( phone, EVENTS, function( evt ){
//
//		console.log( 'User Phone Row Level: ' + evt.type );
//
//	}, CAPTURE );

	/******************************************************************************************************************
	 * Testing section                                                                                                *
	 ******************************************************************************************************************/

//	var dom = goog.dom.getDomHelper( );
//	var input_phone_type = new goog.ui.BidiInput( dom );
//	var input_phone_number = new goog.ui.BidiInput( dom );
//	var button_save = new goog.ui.Button( 'Save', undefined, dom );
//	var button_reset = new goog.ui.Button( 'Reset', undefined, dom );
//	var component = new goog.ui.Component( dom );
//
//	component.addChild( input_phone_type );
//	component.addChild( input_phone_number );
//	component.addChild( button_save );
//	component.addChild( button_reset );
//	component.render( goog.dom.getElement( 'root' ) );
//
//	input_phone_type.render( component.getElement( ) );
//	input_phone_number.render( component.getElement( ) );
//
//	button_save.setTooltip( 'Click to save' );
//	button_save.render( component.getElement( ) );
//
//	button_reset.setTooltip( 'Click to reset' );
//	button_reset.render( component.getElement( ) );
//
//	goog.events.listen( input_phone_type.getElement( ), goog.events.EventType.INPUT, function( evt ){
//
//		console.log( 'Phone type pre-checking phase' );
//
//	} );
//	goog.events.listen( input_phone_type.getElement( ), goog.events.EventType.CHANGE, function( evt ){
//
//		console.log( 'Update phone type model' );
//
//	} );
//	goog.events.listen( input_phone_number.getElement( ), goog.events.EventType.INPUT, function( evt ){
//
//		console.log( 'Phone number pre-checking phase' );
//
//	} );
//	goog.events.listen( input_phone_number.getElement( ), goog.events.EventType.CHANGE, function( evt ){
//
//		console.log( 'Update phone number model' );
//
//	} );
//	goog.events.listen( button_reset, goog.ui.Component.EventType.ACTION, function( evt ){
//
//		input_phone_type.setValue( '' );
//		input_phone_number.setValue( '' );
//
//	} );
//	console.log( button_reset );


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
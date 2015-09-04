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
goog.require( 'goog.ui.Button' );
goog.require( 'zz.template' );
goog.require( 'zz.model.ExampleUserSet' );
goog.require( 'zz.model.EventType' );

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
	var phone = user.userPhones.createLast( );

	phone.phoneActiveFlag = true;
	phone.phoneType = 'mobile';
	phone.phoneNumber = '+380991234567';

	user.userPhones.deleteCurrent( );

	var EVENTS = goog.object.getValues( zz.model.EventType );
	var CAPTURE = false;

	goog.events.listen( users, EVENTS, function( evt ){

		if( evt.type === zz.model.EventType.DATAROW_UPDATE &&
			evt.target instanceof zz.model.ExampleUserPhone &&
			evt.changes.phoneType ){

			console.log( '' );
			console.log( '------------------------------- UPDATE START ---------------------------------------------' );
			console.log( 'Old user phone type value: ' + evt.changes.phoneType.from );
			console.log( 'New user phone type value: ' + evt.changes.phoneType.to );
			console.log( evt );
			console.log( '------------------------------- UPDATE END -----------------------------------------------' );
			console.log( '' );

		}else if( evt.type === zz.model.EventType.DATAROW_DELETE ){

			console.log( '' );
			console.log( '------------------------------- DELETE START ---------------------------------------------' );
			console.log( 'Deleted row Id: ' + evt.getDeletedDatarow( ).getId( ) );
			console.log( evt );
			console.log( '------------------------------- DELETE END -----------------------------------------------' );
			console.log( '' );

		}else{

			console.log( '' );
			console.log( '------------------------------- OTHER EVENT START ----------------------------------------' );
			console.log( 'User Set Level: ' + evt.type );
			console.log( '------------------------------- OTHER EVENT END ------------------------------------------' );
			console.log( '' );
		}
	}, CAPTURE );

	//goog.events.listen( user, EVENTS, function( evt ){
    //
	//	console.log( 'User Row Level: ' + evt.type );
    //
	//}, CAPTURE );
    //
	//goog.events.listen( user.userPhones, EVENTS, function( evt ){
    //
	//	console.log( 'User Phone Set Level: ' + evt.type );
    //
	//}, CAPTURE );
    //
	//goog.events.listen( phone, EVENTS, function( evt ){
    //
	//	console.log( 'User Phone Row Level: ' + evt.type );
    //
	//}, CAPTURE );

	/******************************************************************************************************************
	 * Testing section                                                                                                *
	 ******************************************************************************************************************/

	var button = new goog.ui.Button( 'Button' );
	var component = new goog.ui.Component( );

	component.render( goog.dom.getElement( 'root' ) );
	component.addChild( button );

	button.setTooltip( 'Some tooltip here' );
	button.render( component.getElement( ) );

	var EVENTS1 = goog.object.getValues( goog.ui.Component.EventType );
	var capture = true;

	goog.events.listen( button, EVENTS1, function( evt ){

		console.log( 'B-level: ' + goog.now( ) );

		goog.dom.getElement( 'logger' ).textContent =

			goog.dom.getElement( 'logger' ).textContent + 'B-level: ' + goog.now( ) + '; ';

	}, capture );
	goog.events.listen( component, EVENTS1, function( evt ){

		console.log( 'C-level: ' + goog.now( ) );

		goog.dom.getElement( 'logger' ).textContent =

			goog.dom.getElement( 'logger' ).textContent + 'C-level: ' + goog.now( ) + '; ';

	}, capture );
	goog.events.listen( window, goog.events.EventType.TOUCHSTART, function( evt ){

		console.log( 'W-level: ' + goog.now( ) );

		goog.dom.getElement( 'logger' ).textContent =

			goog.dom.getElement( 'logger' ).textContent + 'W-level: ' + goog.now( ) + '; ';

	}, capture );
	goog.events.listen( window, goog.events.EventType.CLICK, function( evt ){

		console.log( 'W-level: ' + goog.now( ) );

		goog.dom.getElement( 'logger' ).textContent =

			goog.dom.getElement( 'logger' ).textContent + 'W-level: ' + goog.now( ) + '; ';

	}, capture );
};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
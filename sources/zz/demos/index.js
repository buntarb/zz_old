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
goog.require( 'goog.ui.decorate' );
goog.require( 'goog.ui.Component' );

goog.require( 'zz.ui.mdl.Button' );
goog.require( 'zz.ui.mdl.Tooltip' );
goog.require( 'zz.ui.mdl.Navigation' );
goog.require( 'zz.ui.mdl.Spinner' );
goog.require( 'zz.ui.mdl.Progress' );
goog.require( 'zz.ui.mdl.Checkbox' );
goog.require( 'zz.ui.mdl.Switch' );
goog.require( 'zz.ui.mdl.Radio' );
goog.require( 'zz.ui.mdl.IconToggle' );
goog.require( 'zz.ui.mdl.TextField' );
goog.require( 'zz.ui.mdl.Slider' );
goog.require( 'zz.ui.mdl.Menu' );
goog.require( 'zz.ui.mdl.MenuItem' );

goog.require( 'zz.template.ui.button' );
goog.require( 'zz.template.ui.spinner' );
goog.require( 'zz.template.ui.navigation' );
goog.require( 'zz.template.ui.progress' );
goog.require( 'zz.template.ui.tooltip' );
goog.require( 'zz.template.ui.checkbox' );
goog.require( 'zz.template.ui.switch' );
goog.require( 'zz.template.ui.radio' );
goog.require( 'zz.template.ui.icontoggle' );
goog.require( 'zz.template.ui.textfield' );
goog.require( 'zz.template.ui.slider' );
goog.require( 'zz.template.ui.menu' );

goog.require( 'zz.app.Router' );

goog.require( 'zz.module.user.view.Users' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = {};
zz.demos.app.run = function( ){

//	Model

	var users = goog.global.users = new zz.module.user.model.Users( );
	var user = goog.global.user = users.createFirst( );

//	Navigation

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.navigation.fixedHeadersAndTabs );
//
//	var layout = new zz.ui.mdl.Navigation( );
//		layout.decorate( goog.dom.getElementByClass( goog.getCssName( 'mdl-js-layout' ) ) );

//	Tooltip

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.tooltip.default );
//	var tt1 = new zz.ui.mdl.Tooltip( );
//		tt1.decorate( goog.dom.getElement( 'tt-1' ) );
//	var tt2 = new zz.ui.mdl.Tooltip( );
//		tt2.decorate( goog.dom.getElement( 'tt-2' ) );
//	var tt3 = new zz.ui.mdl.Tooltip( );
//		tt3.decorate( goog.dom.getElement( 'tt-3' ) );
//	var tt4 = new zz.ui.mdl.Tooltip( );
//		tt4.decorate( goog.dom.getElement( 'tt-4' ) );

//	Progress

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.progress.default );
//	var prg1 = new zz.ui.mdl.Progress( );
//		prg1.decorate( goog.dom.getElement( '1' ) );
//		prg1.setProgress( 10 );
//	var prg2 = new zz.ui.mdl.Progress( );
//		prg2.decorate( goog.dom.getElement( '2' ) );
//	var prg3 = new zz.ui.mdl.Progress( );
//		prg3.decorate( goog.dom.getElement( '3' ) );

//	Spinner

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.spinner.default );
//
//	var spn1 = new zz.ui.mdl.Spinner( );
//		spn1.decorate( goog.dom.getElement( '1' ) );
//	var spn2 = new zz.ui.mdl.Spinner( );
//		spn2.decorate( goog.dom.getElement( '2' ) );

//	Buttons

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.button.default );
//	var btn1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var btn2 = goog.ui.decorate( goog.dom.getElement( '2' ) );
//	var btn3 = goog.ui.decorate( goog.dom.getElement( '3' ) );
//	var btn4 = goog.ui.decorate( goog.dom.getElement( '4' ) );
//	var btn5 = goog.ui.decorate( goog.dom.getElement( '5' ) );
//	var btn6 = goog.ui.decorate( goog.dom.getElement( '6' ) );
//	var btn7 = goog.ui.decorate( goog.dom.getElement( '7' ) );
//	var btn8 = goog.ui.decorate( goog.dom.getElement( '8' ) );
//	var btn9 = goog.ui.decorate( goog.dom.getElement( '9' ) );
//	var btn10 = goog.ui.decorate( goog.dom.getElement( '10' ) );
//	var btn11 = goog.ui.decorate( goog.dom.getElement( '11' ) );
//	var btn12 = goog.ui.decorate( goog.dom.getElement( '12' ) );
//	var btn13 = goog.ui.decorate( goog.dom.getElement( '13' ) );
//	var btn14 = goog.ui.decorate( goog.dom.getElement( '14' ) );
//	var btn15 = goog.ui.decorate( goog.dom.getElement( '15' ) );
//	var btn16 = goog.ui.decorate( goog.dom.getElement( '16' ) );
//	var btn17 = goog.ui.decorate( goog.dom.getElement( '17' ) );
//	var btn18 = goog.ui.decorate( goog.dom.getElement( '18' ) );
//	var btn19 = goog.ui.decorate( goog.dom.getElement( '19' ) );
//	var btn20 = goog.ui.decorate( goog.dom.getElement( '20' ) );
//	var ttp1 = goog.ui.decorate( goog.dom.getElement( 'ttp-1' ) );
//	var ttp2 = goog.ui.decorate( goog.dom.getElement( 'ttp-2' ) );
//	goog.events.listen( btn2, goog.ui.Component.EventType.ACTION, function( evt ){
//
//		console.log( evt );
//		btn2.setEnabled( false );
//		btn6.setContent( 'Content' );
//		var elm1 = goog.dom.createDom( goog.dom.TagName.I, {
//
//			'class': goog.getCssName( 'material-icons' )
//
//		}, 'add' );
//		var elm2 = goog.dom.createDom( goog.dom.TagName.I, {
//
//			'class': goog.getCssName( 'material-icons' )
//
//		}, 'add' );
//		btn7.setContent( elm1 );
//	} );
//	goog.events.listen( btn4, goog.ui.Component.EventType.ACTION, function( evt ){
//
//		console.log( evt );
//		btn2.setEnabled( true );
//	} );
//	goog.events.listen( btn5, goog.ui.Component.EventType.ACTION, function( evt ){
//
//		console.log( evt );
//		btn2.setEnabled( true );
//	} );

//	Checkbox

//	user.userVerifiedFlag = true;
//
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.checkbox.default );
//
//	var chckbx1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var chckbx2 = goog.ui.decorate( goog.dom.getElement( '2' ) );
//
//	chckbx1.setModel( users, user, users.datafield.userVerifiedFlag );
//	chckbx2.setEnabled( false );

//	Switch

//	user.userVerifiedFlag = true;
//
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.switch.default );
//
//	var swtch1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var swtch2 = goog.ui.decorate( goog.dom.getElement( '2' ) );
//
//	swtch1.setModel( users, user, users.datafield.userVerifiedFlag );
//	swtch2.setEnabled( false );
//
//	goog.events.listen(
//
//		swtch1, [
//
//			goog.ui.Component.EventType.ACTION,
//			goog.ui.Component.EventType.CHANGE,
//			goog.ui.Component.EventType.CHECK,
//			goog.ui.Component.EventType.UNCHECK,
//			goog.ui.Component.EventType.FOCUS,
//			goog.ui.Component.EventType.BLUR,
//			goog.ui.Component.EventType.DISABLE,
//			goog.ui.Component.EventType.ENABLE
//		],
//		function( e ){ console.log( e ); },
//		false );

//	Icon Toggle

//	user.userVerifiedFlag = true;
//
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.icontoggle.default );
//
//	var tggl1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var tggl2 = goog.ui.decorate( goog.dom.getElement( '2' ) );
//
//	tggl1.setModel( users, user, users.datafield.userVerifiedFlag );
//	tggl2.setEnabled( false );

//Radio

//	user.userFirstName = 'b';
//
//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.radio.default );
//
//	var radio1 = goog.ui.decorate( goog.dom.getElement( 'a1' ) );
//	var radio2 = goog.ui.decorate( goog.dom.getElement( 'b1' ) );
//
//	radio1.setModel( users, user, users.datafield.userFirstName );
//	radio2.setModel( users, user, users.datafield.userFirstName );

// Text Field

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.textfield.default );
//
//	var tf1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var tf2 = goog.ui.decorate( goog.dom.getElement( '2' ) );
//
//	tf1.setEnabled( false );
//
//	tf1.setModel( users, user, users.datafield.userFirstName );
//	tf2.setModel( users, user, users.datafield.userFirstName );

// Slider

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.slider.default );
//	var sldr1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	sldr1.setModel( users, user, users.datafield.userId );
//	sldr1.setEnabled( true );

// Menu

//	soy.renderElement( goog.dom.getElement( 'root' ), zz.template.ui.menu.default );
//
//	var menu = goog.global.menu = goog.ui.decorate( goog.dom.getElement( '1' ) );
//	var btn = goog.ui.decorate( goog.dom.getElement( 'demo-menu-lower-left' ) );
//	var item = new zz.ui.mdl.MenuItem( 'Added menu item' );
//
//	goog.events.listen( btn, goog.ui.Component.EventType.ACTION, function( ){
//
//		menu.toggle( );
//	} );
//
//	goog.events.listen( menu, goog.ui.Component.EventType.ACTION, function( evt ){
//
//		if( evt.target.getId( ) === 'add' ){
//
//			menu.addMenuItem( item, 4 );
//		}
//		if( evt.target.getId( ) === 'remove' ){
//
//			menu.removeMenuItem( item );
//		}
//	} );

//	Run user module

	var usersView;
	var router = goog.global.router = zz.app.Router.getInstance( );
	router

		.when( '', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/user', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/user/:id', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/user/:id/phone/:phone', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/test/path', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.when( '/error', function( ){

			usersView = new zz.module.user.view.Users( );
			usersView.render( goog.dom.getElement( 'root' ) );
		} )
		.otherwise( '/error' )
		.bootstrap( );
};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
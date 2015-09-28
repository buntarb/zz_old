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
 * @fileoverview Provide zz.module.user.view.User class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.view.User' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.ui.BidiInput' );
goog.require( 'goog.ui.Checkbox' );
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.module.user.controller.User' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.user.view.User = function( opt_domHelper ){

	/**
	 * Current view controller.
	 * @type {zz.module.user.controller.User}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.User( );

	zz.mvc.view.BaseView.call( this, opt_domHelper );
};
goog.inherits( zz.module.user.view.User, zz.mvc.view.BaseView );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * Creates the initial DOM representation for the component.  The default implementation is to set this.element_ = div.
 *
 * @override
 */
zz.module.user.view.User.prototype.createDom = function( ){

	var element = goog.base( this, 'createDom' );
	var firstNameElement = new goog.ui.BidiInput( );
		firstNameElement.setId( '0' );
	var lastNameElement = new goog.ui.BidiInput( );
		lastNameElement.setId( '1' );
	var loginElement = new goog.ui.BidiInput( );
		loginElement.setId( '3' );
	var passwordElement = new goog.ui.BidiInput( );
		passwordElement.setId( '4' );
	var verifiedElement = new goog.ui.Checkbox( );
		verifiedElement.setId( '5' );

	this.addChildAt( firstNameElement, 0, true );
	this.addChildAt( lastNameElement, 1, true );
	this.addChildAt( loginElement, 2, true );
	this.addChildAt( passwordElement, 3, true );
	this.addChildAt( verifiedElement, 4, true );

	return element;
};

zz.module.user.view.User.prototype.enterDocument = function( ){

	this.getHandler( ).listenWithScope(

		this.getChildAt( 0 ).getElement( ),
		[ goog.events.EventType.INPUT, goog.events.EventType.CHANGE ],
		function( evt ){

			console.log( evt.target.id );
			this.model_.datarow.firstNameElement = evt.target.value
		},
		false,
		this
	);
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Update view to process model changes. This method need to be override by child.
 *
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.module.user.view.User.prototype.modelChangedInternal = function( message ){

	this.getChildAt( 0 ).setValue( message.datarow.userFirstName );
	this.getChildAt( 1 ).setValue( message.datarow.userLastName );
	this.getChildAt( 2 ).setValue( message.datarow.userLogin );
	this.getChildAt( 3 ).setValue( message.datarow.userPassword );
	this.getChildAt( 4 ).setChecked( message.datarow.userVerifiedFlag );
};
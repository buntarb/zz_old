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
goog.require( 'goog.ui.Textarea' );
goog.require( 'goog.ui.Checkbox' );
goog.require( 'goog.i18n.NumberFormat' );
goog.require( 'goog.i18n.NumberFormat.Format' );
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.module.user.controller.User' );
goog.require( 'zz.ui.LabelInput' );
goog.require( 'zz.ui.DecimalFormatter' );

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
 * @override
 */
zz.module.user.view.User.prototype.createDom = function( ){

	var element = goog.base( this, 'createDom' );
	var viewModel = this.getModel( );
	var formatter = zz.ui.DecimalFormatter.getInstance( );

	// User id
	var userIdElement = new zz.ui.LabelInput( 'User #', formatter, false );
	userIdElement.setModel(

		viewModel.dataset,
		viewModel.datarow,
		/** @type {string} */( viewModel.dataset.datafield.userId )
	);
	this.addChild( userIdElement, true );

	// User first name
	var firstNameElement = new zz.ui.LabelInput( 'User first name' );
	firstNameElement.setModel(

		viewModel.dataset,
		viewModel.datarow,
		viewModel.dataset.datafield.userFirstName
	);
	this.addChild( firstNameElement, true );

	// User last name
	var lastNameElement = new zz.ui.LabelInput( 'User last name' );
	lastNameElement.setModel(

		viewModel.dataset,
		viewModel.datarow,
		viewModel.dataset.datafield.userLastName
	);
	this.addChild( lastNameElement, true );

	// User login
	var loginElement = new zz.ui.LabelInput( 'User login' );
	loginElement.setModel(

		viewModel.dataset,
		viewModel.datarow,
		viewModel.dataset.datafield.userLogin
	);
	this.addChild( loginElement, true );

	// User password
	var passwordElement = new zz.ui.LabelInput( 'User password', undefined, true );
	passwordElement.setModel(

		viewModel.dataset,
		viewModel.datarow,
		viewModel.dataset.datafield.userPassword
	);
	this.addChild( passwordElement, true );

	// User verified flag
	//var verifiedElement = new goog.ui.Checkbox( );
	//this.addChildAt( verifiedElement, 5, true );

	return element;
};

zz.module.user.view.User.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Update view to process model changes. This method need to be override by child.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.module.user.view.User.prototype.modelChangedInternal = function( message ){

//	this.getChildAt( 0 ).setValue( message.datarow.userFirstName );
//	this.getChildAt( 1 ).setValue( message.datarow.userLastName );
//	this.getChildAt( 2 ).setValue( message.datarow.userLogin );
//	this.getChildAt( 3 ).setValue( message.datarow.userPassword );
//	this.getChildAt( 4 ).setChecked( message.datarow.userVerifiedFlag );
};
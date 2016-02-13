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

// Common
goog.require( 'soy' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );

// UI
goog.require( 'zz.ui.mdl.TextField' );
goog.require( 'zz.ui.mdl.Checkbox' );

// Template
goog.require( 'zz.template.module.user' );

// Views
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.module.user.view.Phones' );

// Controllers
goog.require( 'zz.module.user.controller.Users' );

// Other
goog.require( 'zz.ui.formatter.Decimal' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.user.view.User = function( opt_domHelper ){

	zz.mvc.view.BaseView.call( this, opt_domHelper );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.module.user.view.User, zz.mvc.view.BaseView );

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.User.prototype.createDom = function( ){

	this.setElementInternal(

		soy.renderAsElement(

			zz.template.module.user.user,
			{ id: goog.getUid( this.getModel( ).datarow ) } ) );
};

/**
 * @override
 */
zz.module.user.view.User.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	var model = this.getModel( );
	var formatter = zz.ui.formatter.Decimal.getInstance( );

	// Create inputs.

	/**
	 * Control for user id.
	 * @type {zz.ui.mdl.TextField}
	 * @private
	 */
	this.userIdElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-number' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	this.userIdElement_.setFormatter( formatter );

	/**
	 * Control for user first name.
	 * @type {zz.ui.mdl.TextField}
	 * @private
	 */
	this.firstNameElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-first-name' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	/**
	 * Control for user last name.
	 * @type {zz.ui.mdl.TextField}
	 * @private
	 */
	this.lastNameElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-last-name' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	/**
	 * Control for user login.
	 * @type {zz.ui.mdl.TextField}
	 * @private
	 */
	this.loginElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-login' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	/**
	 * Control for user password.
	 * @type {zz.ui.mdl.TextField}
	 * @private
	 */
	this.passwordElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-password' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	/**
	 * Control for userVerifiedFlag.
	 * @type {zz.ui.mdl.Checkbox}
	 * @private
	 */
	this.verifiedElement_ = goog.ui.decorate(

		goog.dom.getElementByClass(

			goog.getCssName( 'user-verified-flag' ),
			goog.dom.getElementByClass(

				goog.getCssName( 'user-detail' ),
				this.getElement( ) ) ) );

	// Setting up controls models

	this.userIdElement_.setModel(

		model.dataset,
		model.datarow,
		/** @type {string} */( model.dataset.datafield.userId )
	);
	this.firstNameElement_.setModel(

		model.dataset,
		model.datarow,
		model.dataset.datafield.userFirstName
	);
	this.lastNameElement_.setModel(

		model.dataset,
		model.datarow,
		model.dataset.datafield.userLastName
	);
	this.loginElement_.setModel(

		model.dataset,
		model.datarow,
		model.dataset.datafield.userLogin
	);
	this.passwordElement_.setModel(

		model.dataset,
		model.datarow,
		model.dataset.datafield.userPassword
	);
	this.verifiedElement_.setModel(

		model.dataset,
		model.datarow,
		model.dataset.datafield.userVerifiedFlag
	);

	// Inserting controls.

	this.addChild( this.userIdElement_ );
	this.addChild( this.firstNameElement_ );
	this.addChild( this.lastNameElement_ );
	this.addChild( this.loginElement_ );
	this.addChild( this.passwordElement_ );
	this.addChild( this.verifiedElement_ );

	this.getHandler( ).listenWithScope(

		this,
		goog.ui.Component.EventType.CHECK,
		function( e ){

			console.log( e );
		},
		false,
		this
	);
};

/**
 * @override
 */
zz.module.user.view.User.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );
	this.userIdElement_ = null;
	this.firstNameElement_ = null;
	this.lastNameElement_ = null;
	this.loginElement_ = null;
	this.passwordElement_ = null;
	this.verifiedElement_ = null;
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Update view to process model changes. This method need to be override by child.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.module.user.view.User.prototype.modelChangedInternal = function( message ){ };

/**********************************************************************************************************************
 * Controller methods section                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.User.prototype.setControllerInternal = function( ){

	/**
	 * Current view controller.
	 * @type {zz.module.user.controller.Users}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.Users( );
};
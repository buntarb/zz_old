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
goog.require( 'goog.dom.classlist' );
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.ui.Checkbox' );
goog.require( 'zz.ui.LabelInput' );
goog.require( 'zz.ui.formatter.Decimal' );
goog.require( 'zz.module.user.controller.Users' );
goog.require( 'zz.module.user.view.Phones' );

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
	 * @type {zz.module.user.controller.Users}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.Users( );

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
 * @override
 */
zz.module.user.view.User.prototype.createDom = function( ){

	var model = this.getModel( );
	var formatter = zz.ui.formatter.Decimal.getInstance( );

	// Create dom structure.

	/**
	 * Wrapper element for user inputs.
	 * @type {Element}
	 * @private
	 */
	this.userDetailPanelElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'user-detail' )
	} );

	/**
	 * Wrapper element for user phones view.
	 * @type {Element}
	 * @private
	 */
	this.userPhonesPanelElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'user-phones' )
	} );

	/**
	 * Current view root element.
	 * @type {Element}
	 * @private
	 */
	this.userWrapperElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'user-view' )

	}, [ this.userDetailPanelElement_, this.userPhonesPanelElement_ ] );

	// Create inputs.

	/**
	 * Control for user id.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.userIdElement_ = new zz.ui.LabelInput( 'User #', formatter, false );

	/**
	 * Control for user first name.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.firstNameElement_ = new zz.ui.LabelInput( 'User first name' );

	/**
	 * Control for user last name.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.lastNameElement_ = new zz.ui.LabelInput( 'User last name' );

	/**
	 * Control for user login.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.loginElement_ = new zz.ui.LabelInput( 'User login' );

	/**
	 * Control for user password.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.passwordElement_ = new zz.ui.LabelInput( 'User password', undefined, true );

	/**
	 * Control for userVerifiedFlag.
	 * @type {zz.ui.Checkbox}
	 * @private
	 */
	this.verifiedElement_ = new zz.ui.Checkbox( );

	/**
	 * Phones view.
	 * @type {zz.module.user.view.Phones}
	 * @private
	 */
	this.phonesView_ = new zz.module.user.view.Phones( );

	// Setting up controls models.
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

	// Setting up views models.
	this.phonesView_.setModel( model.datarow.userPhones );

	// Change internal element to insert controls.
	this.setElementInternal( this.userDetailPanelElement_ );

	// Inserting controls.
	this.addChild( this.userIdElement_, true );
	this.addChild( this.firstNameElement_, true );
	this.addChild( this.lastNameElement_, true );
	this.addChild( this.loginElement_, true );
	this.addChild( this.passwordElement_, true );
	this.addChild( this.verifiedElement_, true );

	// Adding classes.
	this.setInputControlStyle( this.userIdElement_ );
	this.setInputControlStyle( this.firstNameElement_ );
	this.setInputControlStyle( this.lastNameElement_ );
	this.setInputControlStyle( this.loginElement_ );
	this.setInputControlStyle( this.passwordElement_ );

	// Change internal element to insert phones view.
	this.setElementInternal( this.userPhonesPanelElement_ );

	// Inserting phones view.
	this.addChild( this.phonesView_, true );

	// Change internal element to view root element before exit.
	this.setElementInternal( this.userWrapperElement_ );
};

/**
 * @override
 */
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
zz.module.user.view.User.prototype.modelChangedInternal = function( message ){ };

/**
 * Setting up inputs dimensions.
 * @param {zz.ui.LabelInput} ctrl
 */
zz.module.user.view.User.prototype.setInputControlStyle = function( ctrl ){

	goog.dom.classlist.addAll( ctrl.getElement( ), [

		goog.getCssName( 'height-5un' ),
		goog.getCssName( 'margin-top-1un' ),
		goog.getCssName( 'margin-right-1un' ),
		goog.getCssName( 'margin-bottom-1un' ),
		goog.getCssName( 'margin-left-1un' ),
		goog.getCssName( 'padding-top-1un' ),
		goog.getCssName( 'padding-right-1un' ),
		goog.getCssName( 'padding-bottom-1un' ),
		goog.getCssName( 'padding-left-1un' )
	] );
};
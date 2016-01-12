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
 * @fileoverview Provide zz.module.user.view.Users class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.view.Users' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

// Common
goog.require( 'soy' );
goog.require( 'goog.dom' );
goog.require( 'goog.array' );
goog.require( 'goog.events.EventType' );

// UI
goog.require( 'zz.ui.mdl.Button' );

// Views
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.module.user.view.User' );

// Controllers
goog.require( 'zz.module.user.controller.Users' );

// Template
goog.require( 'zz.template.module.user' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.user.view.Users = function( opt_domHelper ){

	zz.mvc.view.BaseView.call( this, opt_domHelper );

	/**
	 * Array for storing created user views.
	 * @type {Array}
	 * @private
	 */
	this.userViews_ = [];
};

/**
 * Base inheritance.
 */
goog.inherits( zz.module.user.view.Users, zz.mvc.view.BaseView );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Users view css class.
 * @type {String}
 */
zz.module.user.view.Users.CSS_CLASS = goog.getCssName( 'users-view' );

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.Users.prototype.createDom = function( ){

	this.setElementInternal( soy.renderAsElement( zz.template.module.user.users ) );
};

/**
 * @override
 */
zz.module.user.view.Users.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	/**
	 * Add user control button.
	 * @type {zz.ui.mdl.Button}
	 * @private
	 */
	this.addUserButton_ = goog.ui.decorate( goog.dom.getElementByClass(

		goog.getCssName( 'add-user' ),
		goog.dom.getElementByClass(

			goog.getCssName( 'users-control' ),
			this.getElement( ) ) ) );

	/**
	 * Remove user control button.
	 * @type {zz.ui.mdl.Button}
	 * @private
	 */
	this.remUserButton_ = goog.ui.decorate( goog.dom.getElementByClass(

		goog.getCssName( 'remove-user' ),
		goog.dom.getElementByClass(

			goog.getCssName( 'users-control' ),
			this.getElement( ) ) ) );

	// Setting up add user button click event.

	this.getHandler( ).listenWithScope(

		this.addUserButton_,
		goog.ui.Component.EventType.ACTION,
		this.controller_.addUser,
		false,
		this
	);
};

/**
 * @override
 */
zz.module.user.view.Users.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.addUserButton_.dispose( );
	this.remUserButton_.dispose( );

	goog.array.forEach( this.userViews_, function( view ){

		view.dispose( );
	} );

	delete this.addUserButton_;
	delete this.remUserButton_;
	delete this.userViews_;
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.Users.prototype.modelChangedInternal = function( message ){

	if( message.eventtype === zz.mvc.model.EventType.DATAROW_CREATE &&
		message.sourceDataset.getUid( ) === this.getModel( ).dataset.getUid( ) ){

		this.addUser( message );
	}
};

/**********************************************************************************************************************
 * Controller methods section                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.Users.prototype.setControllerInternal = function( ){

	/**
	 * Current view controller.
	 * @type {zz.module.user.controller.Users}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.Users( this );
};

/**********************************************************************************************************************
 * User action handling                                                                                               *
 **********************************************************************************************************************/

/**
 * @param {zz.mvc.model.Message} message
 */
zz.module.user.view.Users.prototype.addUser = function( message ){

	this.userViews_.push( new zz.module.user.view.User( ) );
	this.userViews_[ this.userViews_.length - 1 ].setModel( message.dataset, message.datarow );
	if( this.userViews_.length > 1 ){

		this.userViews_[ this.userViews_.length - 1 ].renderBefore( goog.dom.getElement(

			goog.dom.getElementByClass(

				goog.getCssName( 'user-view' ),
				this.getElement( ) ) ) );

	}else{

		this.userViews_[ this.userViews_.length - 1 ].render( goog.dom.getElement(

			goog.dom.getElementByClass(

				goog.getCssName( 'users-content' ),
				this.getElement( ) ) ) );
	}
};
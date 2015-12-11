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
 * @fileoverview Provide zz.module.user.view.Phones class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.view.Phones' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'zz.mvc.view.BaseView' );
//goog.require( 'zz.ui.LabelInput' );
goog.require( 'zz.module.user.controller.Users' );
goog.require( 'zz.module.user.view.Phone' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.user.view.Phones = function( opt_domHelper ){

	zz.mvc.view.BaseView.call( this, opt_domHelper );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.module.user.view.Phones, zz.mvc.view.BaseView );

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.Phones.prototype.createDom = function( ){

	// Creating dom structure.

	/**
	 * Wrapper element for add and remove phone buttons.
	 * @type {Element}
	 * @private
	 */
	this.controlPanelElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'phones-control' )
	} );

	/**
	 * Wrapper element for phone view.
	 * @type {Element}
	 * @private
	 */
	this.contentPanelElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'phones-content' )
	} );

	/**
	 * Current view root element
	 * @type {Element}
	 * @private
	 */
	this.wrapperElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'phones-view' )

	}, [ this.controlPanelElement_, this.contentPanelElement_ ] );

	/**
	 * Array for storing created phone views.
	 * @type {Array}
	 * @private
	 */
	this.phoneViews_ = [];


	/**
	 * Add phone button control.
	 * @type {goog.ui.Button}
	 * @private
	 */
	this.addPhoneButton_ = new goog.ui.Button( 'Add phone' );

	/**
	 * Remove phone button control.
	 * @type {goog.ui.Button}
	 * @private
	 */
	this.remPhoneButton_ = new goog.ui.Button( 'Remove phone' );

	// Change internal element to insert buttons.
	this.setElementInternal( this.controlPanelElement_ );

	// Insert buttons.
	this.addChild( this.addPhoneButton_, true );
	this.addChild( this.remPhoneButton_, true );

	// Change internal element to root before exit.
	this.setElementInternal( this.wrapperElement_ );
};

/**
 * @override
 */
zz.module.user.view.Phones.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
	this.getHandler( ).listenWithScope(

		this.addPhoneButton_,
		goog.ui.Component.EventType.ACTION,
		this.controller_.addPhone,
		false,
		this
	);
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Update view to process model changes. This method need to be override by child.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.module.user.view.Phones.prototype.modelChangedInternal = function( message ){

	if( message.eventtype === zz.mvc.model.EventType.DATAROW_CREATE ){

		this.addPhone( message );
	}
};

/**********************************************************************************************************************
 * Controller methods section                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.module.user.view.Phones.prototype.setControllerInternal = function( ){

	/**
	 * Current view controller.
	 * @type {zz.module.user.controller.Users}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.Users( );
};

/**********************************************************************************************************************
 * User action handling                                                                                               *
 **********************************************************************************************************************/

/**
 * @param {zz.mvc.model.Message} message
 */
zz.module.user.view.Phones.prototype.addPhone = function( message ){

	this.phoneViews_.push( new zz.module.user.view.Phone( ) );
	this.phoneViews_[ this.phoneViews_.length - 1 ].setModel( message.dataset, message.datarow );
	this.setElementInternal( this.contentPanelElement_ );
	this.addChildAt( this.phoneViews_[ this.phoneViews_.length - 1 ], 2, true );
	this.setElementInternal( this.wrapperElement_ );
};
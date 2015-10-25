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
 * @fileoverview Provide zz.module.user.view.Phone class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.module.user.view.Phone' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.ui.LabelInput' );
goog.require( 'zz.ui.DecimalFormatter' );
goog.require( 'zz.module.user.controller.Users' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.module.user.view.Phone = function( opt_domHelper ){

	/**
	 * Current view controller.
	 * @type {zz.module.user.controller.Users}
	 * @private
	 */
	this.controller_ = new zz.module.user.controller.Users( );

	zz.mvc.view.BaseView.call( this, opt_domHelper );
};
goog.inherits( zz.module.user.view.Phone, zz.mvc.view.BaseView );

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
zz.module.user.view.Phone.prototype.createDom = function( ){

	var model = this.getModel( );
	var formatter = zz.ui.DecimalFormatter.getInstance( );

	/**
	 * Current view root element.
	 * @type {Element}
	 * @private
	 */
	this.wrapperElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': goog.getCssName( 'phone-view' )
	} );

	/**
	 * Phone order input control.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.phoneOrderElement_ = new zz.ui.LabelInput( 'Phone #', formatter );

	/**
	 * Phone number input control.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.phoneNumberElement_ = new zz.ui.LabelInput( 'Phone number' );

	/**
	 * Phone type input control.
	 * @type {zz.ui.LabelInput}
	 * @private
	 */
	this.phoneTypeElement_ = new zz.ui.LabelInput( 'Phone type' );

	// Setting up controls models.
	this.phoneOrderElement_.setModel(

		model.dataset,
		model.datarow,
		/** @type {string} */( model.dataset.datafield.phoneOrder )
	);
	this.phoneNumberElement_.setModel(

		model.dataset,
		model.datarow,
		/** @type {string} */( model.dataset.datafield.phoneNumber )
	);
	this.phoneTypeElement_.setModel(

		model.dataset,
		model.datarow,
		/** @type {string} */( model.dataset.datafield.phoneType )
	);

	// Change internal element to view root element.
	this.setElementInternal( this.wrapperElement_ );

	// Insert controls.
	this.addChild( this.phoneOrderElement_, true );
	this.addChild( this.phoneNumberElement_, true );
	this.addChild( this.phoneTypeElement_, true );
};

/**
 * @override
 */
zz.module.user.view.Phone.prototype.enterDocument = function( ){

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
zz.module.user.view.Phone.prototype.modelChangedInternal = function( message ){ };
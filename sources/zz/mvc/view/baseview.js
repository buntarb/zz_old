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
 * @fileoverview Provide zz.mvc.view.BaseView class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.view.BaseView' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.json' );
goog.require( 'goog.ui.Component' );
goog.require( 'goog.format.JsonPrettyPrinter' );
goog.require( 'goog.format.JsonPrettyPrinter.TextDelimiters' );
goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.mvc.controller.BaseController' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * The default implementation of base view.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
zz.mvc.view.BaseView = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.view.BaseView, goog.ui.Component );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of view.
 * @type {string}
 */
zz.mvc.view.BaseView.CSS_CLASS = goog.getCssName( 'zz-base-view' );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.getCssClass = function( ){

	return zz.mvc.view.BaseView.CSS_CLASS;
};

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.getContentElement = function( ){

	return zz.mvc.view.BaseView.superClass_.getContentElement.call( this );
};

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.canDecorate = function( element ){

	return zz.mvc.view.BaseView.superClass_.canDecorate.call( this, element );
};

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.createDom = function( ){

	return zz.mvc.view.BaseView.superClass_.createDom.call( this );
};

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.decorate = function( element ){

	return zz.mvc.view.BaseView.superClass_.decorate.call( this, element );
};

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.enterDocument = function( ){

	zz.mvc.view.BaseView.superClass_.enterDocument.call( this );

	this.setControllerInternal( );
	if( this.model_ ){

		this.modelChanged( new zz.mvc.model.Message(

			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.model_.dataset,
			this.model_.datarow,
			this.model_.datafield,
			undefined,
			this.model_.datafield ? this.model_.datarow[ this.model_.datafield ] : undefined
		) );
	}
};

/**
 * @override
 */
zz.mvc.view.BaseView.prototype.disposeInternal = function( ){

	zz.mvc.view.BaseView.superClass_.disposeInternal.call( this );
	this.unsubscribe_( );
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Subscribe view on setting model changes.
 * @private
 */
zz.mvc.view.BaseView.prototype.subscribe_ = function( ){

	var model = this.getModel( );
	if( goog.isDefAndNotNull( model ) ){

		model.dataset.subscribe( this );
	}
};

/**
 * Unsubscribe view from setting model changes.
 */
zz.mvc.view.BaseView.prototype.unsubscribe_ = function( ){

	var subModel = this.getModel( );
	if( goog.isDefAndNotNull( subModel ) ){

		subModel.dataset.unsubscribe( this );
	}
};

/**
 * Setting up view model.
 * @param {zz.mvc.model.Dataset} dataset
 * @param {zz.mvc.model.Datarow=} opt_datarow
 * @param {string=} opt_datafield
 */
zz.mvc.view.BaseView.prototype.setModel = function( dataset, opt_datarow, opt_datafield ){

	this.unsubscribe_( );
	this.model_ = {

		dataset: dataset,
		datarow: opt_datarow,
		datafield: opt_datafield
	};
	this.subscribe_( );
};

/**
 * Calling protected zz.mvc.view.BaseView#modelChangedInternal to process model changes and update current view.
 * @param {zz.mvc.model.Message} message
 * @final
 */
zz.mvc.view.BaseView.prototype.modelChanged = function( message ){

	var model = this.getModel( );
	if( goog.isDefAndNotNull( model ) ){

		if( goog.isDefAndNotNull( model.datafield ) ){

			if( model.datarow.getUid( ) === message.datarow.getUid( ) ){

				this.modelChangedInternal( message );
			}
		}else{

			this.modelChangedInternal( message );
		}
	}
};

/**
 * Update view to process model changes. This method need to be override by child.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.mvc.view.BaseView.prototype.modelChangedInternal = function( message ){

	var jsonFormatter = new goog.format.JsonPrettyPrinter( new goog.format.JsonPrettyPrinter.TextDelimiters( ) );
	var content = jsonFormatter.format( goog.json.serialize( message.dataset.serializeDataset( true ) ) );
	var element = goog.dom.createElement( 'pre' );
	if( this.getContentElement( ) ){

		goog.dom.setTextContent( element, content );
		goog.dom.removeChildren( this.getElement( ) );
		goog.dom.insertChildAt( this.getElement( ), element, 0 );
	}
};

/**********************************************************************************************************************
 * Controller methods section                                                                                         *
 **********************************************************************************************************************/

/**
 * Setting up view controller. Need to be upgraded by subclass.
 * @protected
 */
zz.mvc.view.BaseView.prototype.setControllerInternal = function( ){

	/**
	 * Current view controller.
	 * @type {zz.mvc.controller.BaseController}
	 * @private
	 */
	this.controller_ = new zz.mvc.controller.BaseController( this );
};
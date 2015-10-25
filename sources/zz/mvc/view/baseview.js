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
goog.require( 'goog.ui.Component' );
goog.require( 'goog.json' );
goog.require( 'goog.format.JsonPrettyPrinter' );
goog.require( 'goog.format.JsonPrettyPrinter.TextDelimiters' );
goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );

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
	this.controller_.initialize( this );
};
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
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Current view controller.
 * @type {zz.mvc.controller.BaseController}
 * @private
 */
zz.mvc.view.BaseView.prototype.controller_ = undefined;

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.mvc.view.BaseView.prototype.getCssClass = function( ){

	return zz.mvc.view.BaseView.CSS_CLASS;
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.mvc.view.BaseView.prototype.enterDocument = function( ){

	zz.mvc.view.BaseView.superClass_.enterDocument.call( this );
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

/**********************************************************************************************************************
 * DOM construct methods section                                                                                      *
 **********************************************************************************************************************/

/**
 * @returns {Element} Element to contain child elements (null if none).
 * @override
 */
zz.mvc.view.BaseView.prototype.getContentElement = function( ){

	return zz.mvc.view.BaseView.superClass_.getContentElement.call( this );
};

/**
 * Determines if a given element can be decorated by this type of component. This method should be overridden by
 * inheriting objects.
 * @param {Element} element Element to decorate.
 * @return {boolean} True if the element can be decorated, false otherwise.
 * @override
 */
zz.mvc.view.BaseView.prototype.canDecorate = function( element ){

	return zz.mvc.view.BaseView.superClass_.canDecorate.call( this, element );
};

/**
 * Creates the initial DOM representation for the component.  The default implementation is to set this.element_ = div.
 * @override
 */
zz.mvc.view.BaseView.prototype.createDom = function( ){

	return zz.mvc.view.BaseView.superClass_.createDom.call( this );
};

/**
 * Decorates the element for the UI component. If the element is in the document, the enterDocument method will be
 * called. If goog.ui.Component.ALLOW_DETACHED_DECORATION is false, the caller must pass an element that is in the
 * document.
 * @param {Element} element Element to decorate.
 * @override
 */
zz.mvc.view.BaseView.prototype.decorate = function( element ){

	return zz.mvc.view.BaseView.superClass_.decorate.call( this, element );
};

/**********************************************************************************************************************
 * Model subscriber methods section                                                                                   *
 **********************************************************************************************************************/

/** @inheritDoc */
zz.mvc.view.BaseView.prototype.disposeInternal = function( ){

	zz.mvc.view.BaseView.superClass_.disposeInternal.call( this );
	this.unsubscribe( );
};

/**
 * Setting up view model.
 * @param {zz.mvc.model.Dataset} dataset
 * @param {zz.mvc.model.Datarow=} opt_datarow
 * @param {string=} opt_datafield
 */
zz.mvc.view.BaseView.prototype.setModel = function( dataset, opt_datarow, opt_datafield ){

	this.unsubscribe( );
	this.model_ = {

		dataset: dataset,
		datarow: opt_datarow,
		datafield: opt_datafield
	};
	this.subscribe_( );
};

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
zz.mvc.view.BaseView.prototype.unsubscribe = function( ){

	var subModel = this.getModel( );
	if( goog.isDefAndNotNull( subModel ) ){

		subModel.dataset.unsubscribe( this );
	}
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
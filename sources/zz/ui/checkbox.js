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
 * @fileoverview Provide zz.ui.Checkbox class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Checkbox' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.Checkbox' );
goog.require( 'goog.events.EventType' );
goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.mvc.controller.BaseController' );
goog.require( 'zz.ui.CheckboxRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * 3-state checkbox widget. Fires CHECK or UNCHECK events before toggled and CHANGE event after toggled by user.
 * The checkbox can also be enabled/disabled and get focused and highlighted.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or decorate the checkbox.
 * @extends {goog.ui.Checkbox}
 * @constructor
 */
zz.ui.Checkbox = function( opt_domHelper, opt_renderer ){

	goog.ui.Checkbox.call( this, undefined, opt_domHelper, opt_renderer || zz.ui.CheckboxRenderer.getInstance( ) );
};
goog.inherits( zz.ui.Checkbox, goog.ui.Checkbox );
goog.tagUnsealableClass( zz.ui.Checkbox );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
//zz.ui.Checkbox.CSS_CLASS = goog.getCssName( 'zz-checkbox' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
//zz.ui.Checkbox.prototype.getCssClass = function( ){
//
//	return zz.ui.Checkbox.CSS_CLASS;
//};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.Checkbox.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
	if( this.model_ ){

		this.modelChanged( new zz.mvc.model.Message(

			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.model_.dataset,
			this.model_.datarow,
			this.model_.datafield,
			null,
			this.model_.datarow[ this.model_.datafield ]
		) );
	}
	this.getHandler( ).listenWithScope( this.getContentElement( ), [

		goog.events.EventType.CHANGE

	], /** @this {zz.ui.Checkbox} */ function( evt ){

		try{

			this.model_.datarow[ this.model_.datafield ] = this.getChecked( );

		}catch( err ){

			this.errorHandler_( err );
		}
//		if( evt.type === goog.events.EventType.CHANGE ){
//
//			this.setChecked( this.model_.datarow[ this.model_.datafield ] );
//		}
	}, false, this );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.Checkbox.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.unsubscribe( );
	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Data binding methods                                                                                               *
 **********************************************************************************************************************/

/**
 * Setting up model.
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {!zz.mvc.model.Datarow} datarow
 * @param {!string} datafield
 */
zz.ui.Checkbox.prototype.setModel = function( dataset, datarow, datafield ){

	this.unsubscribe( );
	this.model_ = {

		dataset: dataset,
		datarow: datarow,
		datafield: datafield
	};
	this.subscribe_( );
};

/**
 * Subscribe control to model changes.
 * @private
 */
zz.ui.Checkbox.prototype.subscribe_ = function( ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.model_.dataset.subscribe( this );
	}
};

/**
 * Unsubscribe control from model changes.
 */
zz.ui.Checkbox.prototype.unsubscribe = function( ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.model_.dataset.unsubscribe( this );
	}
};

/**
 * Call protected {@code modelChangedInternal} to process model changes and update control view.
 * @param {zz.mvc.model.Message} message
 * @final
 */
zz.ui.Checkbox.prototype.modelChanged = function( message ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.modelChangedInternal( message );
	}
};

/**
 * Update checkbox value if the model have changed.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.ui.Checkbox.prototype.modelChangedInternal = function( message ){

	this.setChecked( message.new_value );
};

/**********************************************************************************************************************
 * Error handling                                                                                                     *
 **********************************************************************************************************************/

/**
 * Error handler function.
 * @param {Error} err
 * @private
 */
zz.ui.Checkbox.prototype.errorHandler_ = function( err ){

	console.log( err.message );
};

/**
 * Setting up error handler function.
 * @param {function(err:Error)} fn
 */
zz.ui.Checkbox.prototype.setErrorHandler = function( fn ){

	if( goog.isDef( fn ) && goog.isFunction( fn ) ){

		this.errorHandler_ = fn;
	}
};
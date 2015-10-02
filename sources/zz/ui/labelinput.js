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
 * @fileoverview Provide zz.ui.LabelInput class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.LabelInput' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.LabelInput' );
goog.require( 'goog.dom.InputType' );
goog.require( 'goog.events.EventType' );

goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.mvc.controller.BaseController' );
goog.require( 'zz.ui.Formatter' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {Object=} opt_formatter Formatter object.
 * @param {boolean=} opt_password Determine is current component used for password input.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.LabelInput}
 * @constructor
 */
zz.ui.LabelInput = function( opt_label, opt_formatter, opt_password, opt_domHelper ){

	goog.ui.LabelInput.call( this, opt_label, opt_domHelper );

	/**
	 * Model-View formatter.
	 * @type {goog.i18n.NumberFormat}
	 * @private
	 */
	this.formatter_ = opt_formatter || zz.ui.Formatter.getInstance( );

	/**
	 * Password type flag.
	 * @type {boolean}
	 * @private
	 */
	this.isPassword_ = !!opt_password;
};
goog.inherits( zz.ui.LabelInput, goog.ui.LabelInput );
goog.tagUnsealableClass( zz.ui.LabelInput );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.LabelInput.CSS_CLASS = goog.getCssName( 'zz-label-input' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.LabelInput.prototype.getCssClass = function( ){

	return zz.ui.LabelInput.CSS_CLASS;
};

/**
 * The CSS class name to add to the input when the user has not entered a value.
 * @type {string}
 */
zz.ui.LabelInput.prototype.labelCssClassName = goog.getCssName( 'zz-label-input-label' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Creates the DOM nodes needed for the label input.
 * @override
 */
zz.ui.LabelInput.prototype.createDom = function( ){

	this.setElementInternal( this.getDomHelper( ).createDom( goog.dom.TagName.INPUT, {

		'type': this.isPassword_ ? goog.dom.InputType.PASSWORD : goog.dom.InputType.TEXT
	} ) );
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.LabelInput.prototype.enterDocument = function( ){

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

		goog.events.EventType.INPUT,
		goog.events.EventType.CHANGE

	], /** @this {zz.ui.LabelInput} */ function( evt ){

		try{

			this.model_.datarow[ this.model_.datafield ] = this.formatter_.parse( this.getValue( ) );

		}catch( err ){

			this.errorHandler_( err );

		}
		if( evt.type === goog.events.EventType.CHANGE ){

			this.setValue( this.formatter_.format( this.model_.datarow[ this.model_.datafield ] ) );
		}
	}, false, this );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.LabelInput.prototype.disposeInternal = function( ){

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
zz.ui.LabelInput.prototype.setModel = function( dataset, datarow, datafield ){

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
zz.ui.LabelInput.prototype.subscribe_ = function( ){

	var subscriberModel = this.getModel( );
	if( goog.isDefAndNotNull( subscriberModel ) ){

		subscriberModel.dataset.subscribe( this );
	}
};

/**
 * Unsubscribe control from model changes.
 */
zz.ui.LabelInput.prototype.unsubscribe = function( ){

	var subscriberModel = this.getModel( );
	if( goog.isDefAndNotNull( subscriberModel ) ){

		subscriberModel.dataset.unsubscribe( this );
	}
};

/**
 * Call protected {@code modelChangedInternal} to process model changes and update control view.
 * @param {zz.mvc.model.Message} message
 * @final
 */
zz.ui.LabelInput.prototype.modelChanged = function( message ){

	var subscriberModel = this.getModel( );
	if( goog.isDefAndNotNull( subscriberModel ) ){

		this.modelChangedInternal( message );
	}
};

/**
 * Update input value if the model have changed.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.ui.LabelInput.prototype.modelChangedInternal = function( message ){

	this.setValue( this.formatter_ ?

		this.formatter_.format( message.new_value ):
		message.new_value );
};

/**********************************************************************************************************************
 * Error handling                                                                                                     *
 **********************************************************************************************************************/

/**
 * Error handler function.
 * @param {Error} err
 * @private
 */
zz.ui.LabelInput.prototype.errorHandler_ = function( err ){

	console.log( err.message );
};

/**
 * Setting up error handler function.
 * @param {function(err:Error)} fn
 */
zz.ui.LabelInput.prototype.setErrorHandler = function( fn ){

	if( goog.isDef( fn ) && goog.isFunction( fn ) ){

		this.errorHandler_ = fn;
	}
};
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
 * @fileoverview Provide zz.ui.Input class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Input' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.registry' );
goog.require( 'zz.mvc.controller' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.ui.Error' );
goog.require( 'zz.ui.BindType' );
goog.require( 'zz.ui.ModelBindingType' );
goog.require( 'zz.ui.ControlBindingType' );
goog.require( 'zz.ui.InputRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Base input control.
 * @constructor
 * @param {zz.mvc.model.Datarow=} opt_datarow
 * @param {number=} opt_index
 * @param {goog.ui.ControlRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @extends {goog.ui.Control}
 */
zz.ui.Input = function( opt_datarow, opt_index, opt_renderer, opt_domHelper ){

	goog.ui.Control.call( this, undefined, opt_renderer, opt_domHelper );
	this.setAllowTextSelection( true );
	if( goog.isDef( opt_datarow ) && goog.isDef( opt_index ) ){

		this.setModel( opt_datarow, opt_index );
	}
};
goog.inherits( zz.ui.Input, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.Input );
goog.ui.registry.setDefaultRenderer( zz.ui.Input, zz.ui.InputRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Error message.
 * @type {string}
 * @private
 */
zz.ui.Input.prototype.error_ = '';

/**
 * Capture flag (default - false).
 * @type {boolean}
 */
zz.ui.Input.prototype.bindCaptureFlag = false;

/**
 * Binding type.
 * @type {zz.ui.BindType|string}
 */
zz.ui.Input.prototype.bindType = zz.ui.BindType.TWO_WAY_BINDING;

/**
 * Model binding level.
 * @type {zz.ui.ModelBindingType|string}
 */
zz.ui.Input.prototype.modelBindLevel = zz.ui.ModelBindingType.ROW;

/**
 * Control binding level.
 * @type {zz.ui.ControlBindingType|string}
 */
zz.ui.Input.prototype.controlBindLevel = zz.ui.ControlBindingType.CONTROL;

/**********************************************************************************************************************
 * Elements access section                                                                                            *
 **********************************************************************************************************************/

/**
 * Return input element.
 * @returns {Element}
 */
zz.ui.Input.prototype.getInputElement = function( ){

	return this.getRenderer( ).getInputElement( this );
};

/**
 * Return input element value.
 * @returns {string}
 */
zz.ui.Input.prototype.getInputElementValue = function( ){

	return this.getRenderer( ).getInputElementValue( this );
};

/**********************************************************************************************************************
 * Model layout section                                                                                               *
 **********************************************************************************************************************/

/**
 * Setting up model to current field controller.
 * @param {!zz.mvc.model.Datarow} datarow
 * @param {!number} index
 * @override
 */
zz.ui.Input.prototype.setModel = function( datarow, index ){

	this.model_ = {};

	/**
	 * Model top level event target.
	 * @type {goog.events.EventTarget}
	 */
	this.model_.modelTopEventTarget = zz.mvc.controller.getTopEventTarget( datarow );

	/**
	 * Model Dataset.
	 * @type {goog.events.EventTarget}
	 */
	this.model_.modelDataset = datarow.getParentEventTarget( );

	/**
	 * Model Datarow.
	 * @type {!zz.mvc.model.Datarow}
	 */
	this.model_.modelDatarow = datarow;

	/**
	 * Model type.
	 * @type {string}
	 */
	this.model_.modelType = datarow.getFieldTypeByIndex( index );

	/**
	 * Model name.
	 * @type {string}
	 */
	this.model_.modelName = datarow.getFieldNameByIndex( index );

	/**
	 * Model required flag.
	 * @type {boolean}
	 */
	this.model_.modelRequired = datarow.getFieldRequiredFlagByIndex( index );
};

/**
 * Return model field name.
 * @returns {string}
 */
zz.ui.Input.prototype.getModelName = function( ){

	return this.model_.modelName;
};

/**
 * Return model data type.
 * @returns {string}
 */
zz.ui.Input.prototype.getModelType = function( ){

	return this.model_.modelType;
};

/**
 * Return model value.
 * @returns {*}
 */
zz.ui.Input.prototype.getModelValue = function( ){

	return this.model_.modelDatarow[this.getModelName( )];
};

/**
 * Set model value.
 * @param {*} value
 */
zz.ui.Input.prototype.setModelValue = function( value ){

	try{

		this.error_ = '';
		this.model_.modelDatarow[this.getModelName( )] = value;

	}catch( e ){

		this.error_ = e.message;
	}
};

/**********************************************************************************************************************
 * View layout section                                                                                                *
 **********************************************************************************************************************/

/**
 * Return view value.
 * @returns {goog.ui.ControlContent}
 */
zz.ui.Input.prototype.getViewValue = function( ){

	return this.getContent( );
};

/**
 * Set view value.
 * @param {goog.ui.ControlContent} value
 */
zz.ui.Input.prototype.setViewValue = function( value ){

	this.setContent( value );
};

/**********************************************************************************************************************
 * Listener section                                                                                                   *
 **********************************************************************************************************************/

/**
 * Model->view update event listener.
 * @param {zz.model.DatarowUpdateEvent} evt
 * @private
 */
zz.ui.Input.prototype.modelUpdatedListener_ = function( evt ){

	//noinspection JSUnresolvedVariable
	if( evt.changes[ this.getModelName( ) ] ){

		this.setViewValue( this.convertModelToViewInternal( this.getModelValue( ) ) );
	}
};

/**
 * View->model update event listener.
 * @private
 */
zz.ui.Input.prototype.viewUpdatedListener_ = function( ){

	this.setModelValue( this.convertViewToModelInternal( this.getInputElementValue( ) ) );
};

/**********************************************************************************************************************
 * Enable binding section                                                                                             *
 **********************************************************************************************************************/

/**
 * Enable model->vew data binding.
 * @param {boolean} opt_capt
 * @private
 */
zz.ui.Input.prototype.enableModelToViewBinding_ = function( opt_capt ){

	if( this.modelBindLevel === zz.ui.ModelBindingType.ROW ){

		var datarow = this.model_.modelDatarow;
		datarow.getHandler( ).listenWithScope(

			datarow,
			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.modelUpdatedListener_,
			opt_capt,
			this
		);
	}
};

/**
 * Enable view->model data binding.
 * @param {boolean=} opt_capt
 * @private
 */
zz.ui.Input.prototype.enableViewToModelBinding_ = function( opt_capt ){

	if( this.controlBindLevel === zz.ui.ControlBindingType.CONTROL ){

		var input = this.getInputElement( );
		this.getHandler( ).listenWithScope(

			input,
			[goog.events.EventType.INPUT, goog.events.EventType.CHANGE],
			this.viewUpdatedListener_,
			opt_capt,
			this
		);
	}
};

/**
 * Enable specified data binding.
 * @param {boolean=} opt_capt
 * @private
 */
zz.ui.Input.prototype.enableDataBinding_ = function( opt_capt ){

	if( this.bindType === zz.ui.BindType.TWO_WAY_BINDING ){

		this.enableModelToViewBinding_( opt_capt );
		this.enableViewToModelBinding_( opt_capt );
	}
};

/**********************************************************************************************************************
 * Converter section (need to be overridden)                                                                          *
 **********************************************************************************************************************/

/**
 * Return model value converted into view mode.
 * @param {*} val
 * @returns {goog.ui.ControlContent}
 * @protected
 */
zz.ui.Input.prototype.convertModelToViewInternal = function( val ){

	return zz.mvc.controller.convertModelToView( this.getModelType( ), val );
};

/**
 * Return view value converted into model mode.
 * @param {goog.ui.ControlContent} val
 * @returns {*}
 * @protected
 */
zz.ui.Input.prototype.convertViewToModelInternal = function( val ){

	return zz.mvc.controller.convertViewToModel( this.getModelType( ), val );
};

/**
 * @override
 */
zz.ui.Input.prototype.enterDocument = function( ){

	if( this.model_ ){

		goog.base( this, 'enterDocument' );
		this.setViewValue( this.convertModelToViewInternal( this.getModelValue( ) ) );
		this.enableDataBinding_( this.bindCaptureFlag );

	}else{

		throw new Error( zz.ui.Error.INPUT_MODEL_REQUIRE );
	}
};
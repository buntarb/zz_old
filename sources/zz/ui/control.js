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
 * @fileoverview Provide zz.ui.Control class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Control' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.registry' );
goog.require( 'zz.mvc.controller' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.ui.Error' );
goog.require( 'zz.ui.BindType' );
goog.require( 'zz.ui.ModelBindingType' );
goog.require( 'zz.ui.ControlBindingType' );
goog.require( 'zz.ui.ControlRenderer' );

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
zz.ui.Control = function( opt_datarow, opt_index, opt_renderer, opt_domHelper ){

	goog.ui.Control.call( this, undefined, opt_renderer, opt_domHelper );
	this.setAllowTextSelection( true );
	if( goog.isDef( opt_datarow ) && goog.isDef( opt_index ) ){

		this.setModel( opt_datarow, opt_index );
	}
};
goog.inherits( zz.ui.Control, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.Control );
goog.ui.registry.setDefaultRenderer( zz.ui.Control, zz.ui.ControlRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Error message.
 * @type {string}
 * @private
 */
zz.ui.Control.prototype.error_ = '';

/**
 * Capture flag (default - false).
 * @type {boolean}
 */
zz.ui.Control.prototype.bindCaptureFlag = false;

/**
 * Binding type.
 * @type {zz.ui.BindType|string}
 */
zz.ui.Control.prototype.bindType = zz.ui.BindType.TWO_WAY_BINDING;

/**********************************************************************************************************************
 * Elements access section                                                                                            *
 **********************************************************************************************************************/

/**
 * Return input element.
 * @returns {Element}
 */
zz.ui.Control.prototype.getChangeableElement = function( ){

	return this.getRenderer( ).getChangeableElement( this );
};

/**
 * Return input element value.
 * @returns {string}
 */
zz.ui.Control.prototype.getChangeableElementValue = function( ){

	return this.getRenderer( ).getChangeableElementValue( this );
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
zz.ui.Control.prototype.setModel = function( datarow, index ){

	this.model_ = {};

	/**
	 * Model Datarow.
	 * @type {!zz.mvc.model.Datarow}
	 */
	this.model_.modelDatarow = datarow;

	/**
	 * Datarow field index.
	 * @type {!number}
	 */
	this.model_.modelFieldIndex = index;

	/**
	 * Control index in model scope.
	 * @type {number}
	 */
	this.model_.modelControlIndex = undefined;

	/**
	 * Current datarow tree ids.
	 * @type {Array}
	 */
	this.model_.modelTreeIds = zz.mvc.controller.getDatarowTreeIds( datarow );

	/**
	 * Model top level event target.
	 * @type {zz.model.Dataset}
	 */
	this.model_.modelEventTarget = zz.mvc.controller.getTopEventTarget( datarow );


	// ------------------------------------------------------------------------------



	/**
	 * Model Dataset.
	 * @type {goog.events.EventTarget}
	 */
	this.model_.modelDataset = datarow.getParentEventTarget( );

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
zz.ui.Control.prototype.getModelName = function( ){

	return this.model_.modelName;
};

/**
 * Return model data type.
 * @returns {string}
 */
zz.ui.Control.prototype.getModelType = function( ){

	return this.model_.modelType;
};

/**
 * Return model value.
 * @returns {*}
 */
zz.ui.Control.prototype.getModelValue = function( ){

	return this.model_.modelDatarow[this.getModelName( )];
};

/**
 * Set model value.
 * @param {*} value
 */
zz.ui.Control.prototype.setModelValue = function( value ){

	try{

		this.error_ = '';
		this.getRenderer( ).removeErrorState( this );
		this.model_.modelDatarow[this.getModelName( )] = value;

	}catch( e ){

		this.error_ = e.message;
		this.getRenderer( ).addErrorState( this, e.message );
	}
};

/**********************************************************************************************************************
 * View layout section                                                                                                *
 **********************************************************************************************************************/

/**
 * Return view value.
 * @returns {goog.ui.ControlContent}
 */
zz.ui.Control.prototype.getViewValue = function( ){

	return this.getChangeableElementValue( );
};

/**
 * Set view value.
 * @param {goog.ui.ControlContent} value
 */
zz.ui.Control.prototype.setViewValue = function( value ){

	this.error_ = '';
	this.getRenderer( ).removeErrorState( this );
	this.setContent( value );
};

/**********************************************************************************************************************
 * Model to view data binding                                                                                         *
 **********************************************************************************************************************/

/**
 * Delete datarow event listener.
 * @param {zz.mvc.model.DatarowDeleteEvent} evt
 */
zz.ui.Control.prototype.handleDatarowDeleteEvent = function( evt ){

	this.setHandleDatarowEvents( false );
};

/**
 * Model datarow update event handler.
 * @param {zz.mvc.model.DatarowUpdateEvent} evt
 */
zz.ui.Control.prototype.handleDatarowUpdateEvent = function( evt ){

	if( evt.changes[ this.getModelName( ) ] ){

		this.setViewValue( this.convertModelToViewInternal( this.getModelValue( ) ) );
	}
};

/**
 * Enable model->vew data binding.
 * @param {boolean} enable
 */
zz.ui.Control.prototype.setHandleDatarowEvents = function( enable ){

	if( enable ){

		this.model_.modelControlIndex = this.model_.modelDatarow.addFieldControl( this.model_.modelFieldIndex, this );
		this.model_.modelEventTarget.setHandleDatarowEvents( true );

	}else{

		this.model_.modelDatarow.removeFieldControl( this.model_.modelFieldIndex, this.model_.modelControlIndex );
	}
};

/**********************************************************************************************************************
 * View to model data binding methods                                                                                 *
 **********************************************************************************************************************/

/**
 * View changed event handler.
 * @param {goog.events.Event} evt
 */
zz.ui.Control.prototype.handleViewChangeEvent = function( evt ){

	this.setModelValue( this.convertViewToModelInternal( this.getViewValue( ) ) );
	if( evt.type === goog.events.EventType.CHANGE ){

		this.setViewValue( this.convertModelToViewInternal( this.getModelValue( ) ) );
	}
};

/**
 * Enable view->model data binding.
 * @param {boolean} enable
 * @private
 */
zz.ui.Control.prototype.setHandleViewChangeEvent = function( enable ){

	var target = this.getChangeableElement( );
	if( enable ){

		this.getHandler( ).listenWithScope(

			target,
			[goog.events.EventType.INPUT, goog.events.EventType.CHANGE],
			this.handleViewChangeEvent,
			this.bindCaptureFlag,
			this
		);
	}else{

		this.getHandler( ).unlisten(

			target,
			[goog.events.EventType.INPUT, goog.events.EventType.CHANGE],
			this.handleViewChangeEvent,
			this.bindCaptureFlag,
			this
		);
	}
};

/**********************************************************************************************************************
 * Common data binding                                                                                                *
 **********************************************************************************************************************/

/**
 * Enable specified data binding.
 * @param {boolean=} opt_capt
 * @private
 */
zz.ui.Control.prototype.enableDataBinding = function( opt_capt ){

	if( goog.isBoolean( opt_capt ) && opt_capt ){

		this.bindCaptureFlag = opt_capt;
	}
	if( this.bindType === zz.ui.BindType.TWO_WAY_BINDING ){

		this.setHandleDatarowEvents( true );
		this.setHandleViewChangeEvent( true );

	}else if( this.bindType === zz.ui.BindType.MODEL_TO_UI ){

		this.setHandleDatarowEvents( true );

	}else if( this.bindType === zz.ui.BindType.UI_TO_MODEL ){

		this.setHandleViewChangeEvent( true );

	}else{

		throw new Error( zz.ui.Error.INCORRECT_BINDING_TYPE );
	}
	this.setViewValue( this.convertModelToViewInternal( this.getModelValue( ) ) );
};

/**
 * Disable specified data binding.
 * @private
 */
zz.ui.Control.prototype.disableDataBinding = function( ){

	if( this.bindType === zz.ui.BindType.TWO_WAY_BINDING ){

		this.setHandleDatarowEvents( false );
		this.setHandleViewChangeEvent( false );

	}else if( this.bindType === zz.ui.BindType.MODEL_TO_UI ){

		this.setHandleDatarowEvents( false );

	}else if( this.bindType === zz.ui.BindType.UI_TO_MODEL ){

		this.setHandleViewChangeEvent( false );

	}else{

		throw new Error( zz.ui.Error.INCORRECT_BINDING_TYPE );
	}
	this.setViewValue( '' );
	delete this.model_;
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
zz.ui.Control.prototype.convertModelToViewInternal = function( val ){

	return zz.mvc.controller.convertModelToView( this.getModelType( ), val );
};

/**
 * Return view value converted into model mode.
 * @param {goog.ui.ControlContent} val
 * @returns {*}
 * @protected
 */
zz.ui.Control.prototype.convertViewToModelInternal = function( val ){

	return zz.mvc.controller.convertViewToModel( this.getModelType( ), val );
};

/**
 * @override
 */
zz.ui.Control.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	// TODO: Add param to construct.
	if( this.model_ ){

		this.enableDataBinding( );
	}
};
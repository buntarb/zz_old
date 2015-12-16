// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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

/**
 * @fileoverview Base class for UI MDL controls.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Control' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.Event' );
goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.Component' );

goog.require( 'zz.mvc.model.Message' );
goog.require( 'zz.mvc.model.EventType' );
goog.require( 'zz.ui.formatter.Default' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {zz.ui.mdl.ControlRenderer=} opt_renderer Renderer used to render or decorate the component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @param {zz.ui.formatter.Default=} opt_formatter Formatter object.
 * @constructor
 * @extends {goog.ui.Control}
 */
zz.ui.mdl.Control = function( opt_content, opt_renderer, opt_domHelper, opt_formatter ){

	goog.ui.Control.call(

		this,
		opt_content,
		opt_renderer || zz.ui.mdl.ControlRenderer.getInstance( ),
		opt_domHelper
	);

	/**
	 * Model-View formatter.
	 * @type {zz.ui.formatter.Default|zz.ui.formatter.Decimal}
	 * @private
	 */
	this.formatter_ = opt_formatter || zz.ui.formatter.Default.getInstance( );
};
goog.inherits( zz.ui.mdl.Control, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.mdl.Control );

/**
 * Downgrade the component.
 * @private
 */
zz.ui.mdl.Control.prototype.mdlDowngrade = function( ){

	this.dispose( );
};

/**********************************************************************************************************************
 * Base class methods override                                                                                        *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.Control.prototype.performActionInternal = function( e ){

	if( this.isAutoState( goog.ui.Component.State.CHECKED ) ){

		this.setChecked( !this.isChecked( ) );
	}
	if( this.isAutoState( goog.ui.Component.State.SELECTED ) ){

		this.setSelected( true );
	}
	if( this.isAutoState( goog.ui.Component.State.OPENED ) ){

		this.setOpen( !this.isOpen( ) );
	}
	var actionEvent = new goog.events.Event( goog.ui.Component.EventType.ACTION, this );
	if( e ){

		actionEvent.altKey = e.altKey;
		actionEvent.ctrlKey = e.ctrlKey;
		actionEvent.metaKey = e.metaKey;
		actionEvent.shiftKey = e.shiftKey;
		actionEvent.platformModifierKey = e.platformModifierKey;
	}
	return this.dispatchEvent( actionEvent );
};

/**
 * @override
 */
zz.ui.mdl.Control.prototype.handleMouseUp = function( e ){

	if( this.isEnabled( ) ){

		if( this.isAutoState( goog.ui.Component.State.HOVER ) ){

			this.setHighlighted( true );
		}
		if( /* this.isActive( ) && */
			this.performActionInternal( e ) &&
			this.isAutoState( goog.ui.Component.State.ACTIVE ) ){

			this.setActive( false );
		}
	}
};

/**
 * @override
 */
zz.ui.mdl.Control.prototype.handleDblClick = function( e ){

	if( this.isEnabled( ) ){

		this.performActionInternal( e );
	}
};

/**
 * @override
 */
zz.ui.mdl.Control.prototype.handleKeyEventInternal = function( e ){

	return ( e.keyCode == goog.events.KeyCodes.ENTER || e.keyCode == goog.events.KeyCodes.SPACE )

		&& this.performActionInternal( e );
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Control.prototype.enterDocument = function( ){

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
	this.getHandler( ).listenWithScope( this.getInputElement( ), [

		goog.events.EventType.INPUT,
		goog.events.EventType.CHANGE

	], /** @this {zz.ui.mdl.Control} */ function( evt ){

		try{

			if( this.model_ )

				this.model_.datarow[ this.model_.datafield ] = this.formatter_.parse( this.getInputValue( ) );

		}catch( err ){

			this.errorHandler_( err );
		}
		if( evt.type === goog.events.EventType.CHANGE ){

			if( this.model_ )

				this.setInputValue( this.formatter_.format( this.model_.datarow[ this.model_.datafield ] ) );
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
zz.ui.mdl.Control.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.unsubscribe_( );
	this.getHandler( ).dispose( );

	this.model_ = null;
	this.inputElement_ = null;

	delete this.model_;
	delete this.inputElement_;
};

/**********************************************************************************************************************
 * Data binding methods                                                                                               *
 **********************************************************************************************************************/

/**
 * Subscribe control to model changes.
 * @private
 */
zz.ui.mdl.Control.prototype.subscribe_ = function( ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.model_.dataset.subscribe( this );
		this.modelChanged( new zz.mvc.model.Message(

			zz.mvc.model.EventType.DATAROW_UPDATE,
			this.model_.dataset,
			this.model_.datarow,
			this.model_.datafield,
			null,
			this.model_.datarow[ this.model_.datafield ]
		) );
	}
};

/**
 * Unsubscribe control from model changes.
 * @private
 */
zz.ui.mdl.Control.prototype.unsubscribe_ = function( ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.model_.dataset.unsubscribe( this );
	}
};

/**
 * Setting up model.
 * @param {!zz.mvc.model.Dataset} dataset
 * @param {!zz.mvc.model.Datarow} datarow
 * @param {!string} datafield
 */
zz.ui.mdl.Control.prototype.setModel = function( dataset, datarow, datafield ){

	this.unsubscribe_( );
	this.model_ = {

		dataset: dataset,
		datarow: datarow,
		datafield: datafield
	};
	this.subscribe_( );
};

/**
 * Call protected {@code modelChangedInternal} to process model changes and update control view.
 * @param {zz.mvc.model.Message} message
 * @final
 */
zz.ui.mdl.Control.prototype.modelChanged = function( message ){

	if( goog.isDefAndNotNull( this.model_ ) ){

		this.modelChangedInternal( message );
	}
};

/**
 * Update control value if the model have changed.
 * @param {zz.mvc.model.Message} message
 * @protected
 */
zz.ui.mdl.Control.prototype.modelChangedInternal = function( message ){

	this.setInputValue( this.formatter_.format( message.new_value ) );
};

/**
 * Control input element setter (used by renderer).
 * @param {Element} element
 */
zz.ui.mdl.Control.prototype.setInputElement = function( element ){

	/**
	 * Control input element.
	 * @type {Element}
	 * @private
	 */
	this.inputElement_ = element;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Control input element getter.
 * @returns {Element}
 */
zz.ui.mdl.Control.prototype.getInputElement = function( ){

	return /** @type {Element} */ ( this.inputElement_ );
};

/**
 * Set control input element value.
 * @param {*} value
 */
zz.ui.mdl.Control.prototype.setInputValue = function( value ){

	this.getRenderer( ).setValue( this, value );
};

/**
 * Return control input element value.
 * @returns {*} value
 */
zz.ui.mdl.Control.prototype.getInputValue = function( ){

	return this.getRenderer( ).getValue( this );
};

/**********************************************************************************************************************
 * Error handling                                                                                                     *
 **********************************************************************************************************************/

/**
 * User input error handler function.
 * @param {Error} err
 * @private
 */
zz.ui.mdl.Control.prototype.errorHandler_ = function( err ){

	console.log( err.message );
};

/**
 * Setting up user input error handler function.
 * @param {function(err:Error)} fn
 */
zz.ui.mdl.Control.prototype.setErrorHandler = function( fn ){

	if( goog.isDef( fn ) && goog.isFunction( fn ) ){

		this.errorHandler_ = fn;
	}
};
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

goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {zz.ui.mdl.ControlRenderer=} opt_renderer Renderer used to render or decorate the component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
zz.ui.mdl.Control = function( opt_content, opt_renderer, opt_domHelper ){

	goog.ui.Control.call(

		this,
		opt_content,
		opt_renderer || zz.ui.mdl.ControlRenderer.getInstance( ),
		opt_domHelper
	);
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
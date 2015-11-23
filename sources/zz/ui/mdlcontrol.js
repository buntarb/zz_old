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

goog.provide( 'zz.ui.MdlControl' );

goog.require( 'goog.events.Event' );
goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.Component' );
goog.require( 'goog.ui.ControlRenderer' );


/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
zz.ui.MdlControl = function( opt_content, opt_renderer, opt_domHelper ){

	goog.ui.Control.call( this, opt_content, opt_renderer, opt_domHelper );
};
goog.inherits( zz.ui.MdlControl, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.MdlControl );

/**
 * Performs the appropriate action when the control is activated by the user. The default implementation first updates
 * the checked and selected state of controls that support them, then dispatches an ACTION event.  Considered protected;
 * should only be used within this package and by subclasses.
 * This method called from:
 *
 * - zz.ui.MdlControl#handleMouseUp;
 * - zz.ui.MdlControl#handleDblClick;
 * - zz.ui.MdlControl#handleKeyEventInternal.
 *
 * @param {goog.events.Event} e Event that triggered the action.
 * @return {boolean} Whether the action is allowed to proceed.
 * @protected
 */
zz.ui.MdlControl.prototype.performActionInternal = function( e ){

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
 * Handles mouseup events.  If the component is enabled, highlights it.  If
 * the component has previously been activated, performs its associated action
 * by calling {@link performActionInternal}, then deactivates it.  Considered
 * protected; should only be used within this package and by subclasses.
 * @param {goog.events.Event} e Mouse event to handle.
 */
goog.ui.Control.prototype.handleMouseUp = function(e) {
	if (this.isEnabled()) {
		if (this.isAutoState(goog.ui.Component.State.HOVER)) {
			this.setHighlighted(true);
		}
		if (this.isActive() &&
			this.performActionInternal(e) &&
			this.isAutoState(goog.ui.Component.State.ACTIVE)) {
			this.setActive(false);
		}
	}
};


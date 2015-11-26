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

goog.provide( 'zz.ui.MdlControl' );
goog.provide( 'zz.ui.MdlControlRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.Event' );
goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.Component' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {zz.ui.MdlControlRenderer=} opt_renderer Renderer used to render or decorate the component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
zz.ui.MdlControl = function( opt_content, opt_renderer, opt_domHelper ){

	goog.ui.Control.call(

		this,
		opt_content,
		opt_renderer || zz.ui.MdlControlRenderer.getInstance( ),
		opt_domHelper
	);
};
goog.inherits( zz.ui.MdlControl, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.MdlControl );

/**
 * Downgrade the component.
 * @private
 */
zz.ui.MdlControl.prototype.mdlDowngrade = function( ){

	this.dispose( );
};

/**********************************************************************************************************************
 * Touch events handling section                                                                                      *
 **********************************************************************************************************************/

///**
// * Enables or disables touch event handling on the control.
// * @param {boolean} enable Whether to enable touch event handling.
// * @private
// */
//goog.ui.Control.prototype.enableTouchEventHandling_ = function( enable ){
//
//	var handler = this.getHandler( );
//	var element = this.getElement( );
//	if( enable ){
//
//		handler.
//
//			listen(element, goog.events.EventType.MOUSEOVER, this.handleMouseOver).
//			listen(element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).
//			listen(element, goog.events.EventType.MOUSEUP, this.handleMouseUp).
//			listen(element, goog.events.EventType.MOUSEOUT, this.handleMouseOut);
//
//		if( this.handleContextMenu != goog.nullFunction ){
//
//			handler.listen(
//
//				element,
//				goog.events.EventType.CONTEXTMENU,
//				this.handleContextMenu
//			);
//		}
//		if( goog.userAgent.IE ){
//
//			handler.listen( element, goog.events.EventType.DBLCLICK, this.handleDblClick );
//			if( !this.ieMouseEventSequenceSimulator_ ){
//
//				this.ieMouseEventSequenceSimulator_ = new goog.ui.Control.IeMouseEventSequenceSimulator_( this );
//				this.registerDisposable( this.ieMouseEventSequenceSimulator_ );
//			}
//		}
//	}else{
//
//		handler.
//
//			unlisten( element, goog.events.EventType.MOUSEOVER, this.handleMouseOver ).
//			unlisten( element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown ).
//			unlisten( element, goog.events.EventType.MOUSEUP, this.handleMouseUp ).
//			unlisten( element, goog.events.EventType.MOUSEOUT, this.handleMouseOut );
//
//		if( this.handleContextMenu != goog.nullFunction ){
//
//			handler.unlisten( element, goog.events.EventType.CONTEXTMENU, this.handleContextMenu );
//		}
//		if( goog.userAgent.IE ){
//
//			handler.unlisten( element, goog.events.EventType.DBLCLICK, this.handleDblClick );
//			goog.dispose( this.ieMouseEventSequenceSimulator_ );
//			this.ieMouseEventSequenceSimulator_ = null;
//		}
//	}
//};

/**********************************************************************************************************************
 * Base class methods override                                                                                        *
 **********************************************************************************************************************/

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
zz.ui.MdlControl.prototype.handleMouseUp = function( e ){

	if( this.isEnabled( ) ){

		if( this.isAutoState( goog.ui.Component.State.HOVER ) ){

			this.setHighlighted( true );
		}
		if( this.isActive( ) &&
			this.performActionInternal( e ) &&
			this.isAutoState( goog.ui.Component.State.ACTIVE ) ){

			this.setActive( false );
		}
	}
};

/**
 * Handles dblclick events.  Should only be registered if the user agent is
 * IE.  If the component is enabled, performs its associated action by calling
 * {@link performActionInternal}.  This is used to allow more performant
 * buttons in IE.  In IE, no mousedown event is fired when that mousedown will
 * trigger a dblclick event.  Because of this, a user clicking quickly will
 * only cause ACTION events to fire on every other click.  This is a workaround
 * to generate ACTION events for every click.  Unfortunately, this workaround
 * won't ever trigger the ACTIVE state.  This is roughly the same behaviour as
 * if this were a 'button' element with a listener on mouseup.  Considered
 * protected; should only be used within this package and by subclasses.
 * @param {goog.events.Event} e Mouse event to handle.
 */
zz.ui.MdlControl.prototype.handleDblClick = function( e ){

	if( this.isEnabled( ) ){

		this.performActionInternal( e );
	}
};

/**
 * Attempts to handle a keyboard event; returns true if the event was handled,
 * false otherwise.  Considered protected; should only be used within this
 * package and by subclasses.
 * @param {goog.events.KeyEvent} e Key event to handle.
 * @return {boolean} Whether the key event was handled.
 * @protected
 */
zz.ui.MdlControl.prototype.handleKeyEventInternal = function( e ){

	return ( e.keyCode == goog.events.KeyCodes.ENTER || e.keyCode == goog.events.KeyCodes.SPACE )

		&& this.performActionInternal( e );
};

/**********************************************************************************************************************
 **********************************************************************************************************************
 **********************************************************************************************************************
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.MdlControl}s. Extends the superclass to support checkbox states.
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
zz.ui.MdlControlRenderer = function( ){

	zz.ui.MdlControlRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.MdlControlRenderer, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.ui.MdlControlRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.MdlControlRenderer.CSS_CLASS = goog.getCssName( 'zz-mdl-control' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.MdlControlRenderer.prototype.getCssClass = function( ){

	return '';
};

/**
 * Updates the control's DOM by adding or removing the specified class name to/from its root element. Because of this,
 * subclasses should use this method when modifying class names on the controls root element.
 * @param {goog.ui.Control|Element} control Control instance (or root element) to be updated.
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
zz.ui.MdlControlRenderer.prototype.enableClassName = function( control, className, enable ){ };
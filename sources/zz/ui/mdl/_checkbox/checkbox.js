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
 * @fileoverview Provide zz.ui.mdl.Checkbox class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Checkbox' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.CheckboxRenderer' );
goog.require( 'zz.ui.mdl.Ripple' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the button.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @extends {zz.ui.mdl.Control}
 * @constructor
 */
zz.ui.mdl.Checkbox = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call( this, opt_content, opt_renderer || zz.ui.mdl.CheckboxRenderer.getInstance( ), opt_domHelper );
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.Checkbox, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.Checkbox );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Checkbox.CONST = {

	TINY_TIMEOUT: 10
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Checkbox.CSS = {

	INPUT: goog.getCssName( 'mdl-checkbox__input' ),
	BOX_OUTLINE: goog.getCssName( 'mdl-checkbox__box-outline' ),
	FOCUS_HELPER: goog.getCssName( 'mdl-checkbox__focus-helper' ),
	TICK_OUTLINE: goog.getCssName( 'mdl-checkbox__tick-outline' ),
	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-checkbox__ripple-container' ),
	RIPPLE_CENTER: goog.getCssName( 'mdl-ripple--center' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	IS_FOCUSED: goog.getCssName( 'is-focused' ),
	IS_DISABLED: goog.getCssName( 'is-disabled' ),
	IS_CHECKED: goog.getCssName( 'is-checked' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	LABEL: goog.getCssName( 'mdl-checkbox__label' )

};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Checkbox.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getElement( ),
		goog.events.EventType.MOUSEUP,
		this.blurListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getCheckboxElement( ),
		goog.events.EventType.FOCUS,
		this.focusCheckboxListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getCheckboxElement( ),
		goog.events.EventType.BLUR,
		this.blurCheckboxListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getCheckboxElement( ),
		goog.events.EventType.CHANGE,
		this.changeCheckboxListener_,
		false,
		this
	);

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

		this.getHandler( ).listenWithScope(

			this.getElement( ),
			goog.events.EventType.MOUSEUP,
			this.blurListener_,
			false,
			this
		);
		var  ripple = new zz.ui.mdl.Ripple( );
		this.addChild( ripple, false );
		ripple.decorate( goog.dom.getElementByClass( zz.ui.mdl.Checkbox.CSS.RIPPLE_CONTAINER, this.getElement( ) ) );
	}

	this.changeCheckboxListener_( );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Checkbox.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for element blur event.
 * @this {zz.ui.mdl.Checkbox}
 * @private
 */
zz.ui.mdl.Checkbox.prototype.blurListener_ = function( ){

	goog.Timer.callOnce( /** @this {zz.ui.mdl.Checkbox} */ function( ){

		//noinspection JSPotentiallyInvalidUsageOfThis
		this.getCheckboxElement( ).blur( );

	}, zz.ui.mdl.Checkbox.CONST.TINY_TIMEOUT, this );
};

/**
 * Listener for checkbox element focus event.
 * @private
 */
zz.ui.mdl.Checkbox.prototype.focusCheckboxListener_ = function( ){

	goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_FOCUSED );
};

/**
 * Listener for checkbox element blur event.
 * @private
 */
zz.ui.mdl.Checkbox.prototype.blurCheckboxListener_ = function( ){

	goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_FOCUSED );
};

/**
 * Listener for checkbox element change event.
 * @private
 */
zz.ui.mdl.Checkbox.prototype.changeCheckboxListener_ = function( ){

	this.setChecked( this.getCheckboxElement( ).checked );
	this.getRenderer( ).updateClasses( this );
};

/**********************************************************************************************************************
 * Dom helpers section                                                                                                *
 **********************************************************************************************************************/

/**
 * Checkbox input element setter (for renderer).
 * @param {Element} element
 */
zz.ui.mdl.Checkbox.prototype.setCheckboxElement = function( element ){

	/**
	 * Checkbox input element.
	 * @type {Element}
	 * @private
	 */
	this.checkboxElement_ = element;
};

/**
 * Checkbox input element getter (for renderer).
 * @returns {Element}
 */
zz.ui.mdl.Checkbox.prototype.getCheckboxElement = function( ){

	return /** @type {Element} */ ( this.checkboxElement_ );
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Enable/disable checkbox.
 * @param {boolean} enable
 */
zz.ui.mdl.Checkbox.prototype.setEnabled = function( enable ){

	zz.ui.mdl.Checkbox.superClass_.setEnabled.call( this, enable );
	this.getCheckboxElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};

/**
 * Check/uncheck checkbox.
 * @param {boolean} check
 */
zz.ui.mdl.Checkbox.prototype.setChecked = function( check ){

	zz.ui.mdl.Checkbox.superClass_.setChecked.call( this, check );
	this.getCheckboxElement( ).checked = check;
};
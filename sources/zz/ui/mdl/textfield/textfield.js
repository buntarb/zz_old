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
 * @fileoverview Provide zz.ui.mdl.TextField class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.TextField' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.Control' );
goog.require( 'zz.ui.mdl.TextFieldRenderer' );
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
zz.ui.mdl.TextField = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.Control.call( this, opt_content, opt_renderer || zz.ui.mdl.TextFieldRenderer.getInstance( ), opt_domHelper );
	this.setAutoStates( goog.ui.Component.State.ALL, false );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.TextField, zz.ui.mdl.Control );
goog.tagUnsealableClass( zz.ui.mdl.TextField );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.TextField.CONST = {

	NO_MAX_ROWS: -1,
	MAX_ROWS_ATTRIBUTE: 'maxrows'
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.TextField.CSS = {

	LABEL: goog.getCssName( 'mdl-textfield__label' ),
	INPUT: goog.getCssName( 'mdl-textfield__input' ),
	IS_DIRTY: goog.getCssName( 'is-dirty' ),
	IS_FOCUSED: goog.getCssName( 'is-focused' ),
	IS_DISABLED: goog.getCssName( 'is-disabled' ),
	IS_INVALID: goog.getCssName( 'is-invalid' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	ERROR: goog.getCssName( 'mdl-textfield__error' )
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.TextField.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		//TODO: add goog.events.KeyHandler to handle key events
		goog.events.EventType.KEYDOWN,
		this.keyTextFieldListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.FOCUS,
		this.focusTextFieldListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.BLUR,
		this.blurTextFieldListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.CHANGE,
		this.changeTextFieldListener_,
		false,
		this
	);



	this.changeTextFieldListener_( );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.TextField.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Listener for Text Field element onkeydown event.
 * @private
 */
zz.ui.mdl.TextField.prototype.keyTextFieldListener_ = function( ){

	var currentRowCount = event.target.value.split('\n').length;
	if (event.keyCode === 13) {
		if (currentRowCount >= zz.ui.mdl.TextField.CONST.NO_MAX_ROWS) {
			event.preventDefault();
		}
	}
};

/**
 * Listener for TextField element focus event.
 * @private
 */
zz.ui.mdl.TextField.prototype.focusTextFieldListener_ = function( ){

	goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.TextField.CSS.IS_FOCUSED );
};

/**
 * Listener for TextField element blur event.
 * @private
 */
zz.ui.mdl.TextField.prototype.blurTextFieldListener_ = function( ){

	goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.TextField.CSS.IS_FOCUSED );
};

/**
 * Listener for Text Field element change event.
 * @private
 */
zz.ui.mdl.TextField.prototype.changeTextFieldListener_ = function( ){

	this.setInputValue( this.getInputValue( ) );
	this.getRenderer( ).updateClasses( this );
};
/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Enable/disable TextField.
 * @param {boolean} enable
 */
zz.ui.mdl.TextField.prototype.setEnabled = function( enable ){

	zz.ui.mdl.TextField.superClass_.setEnabled.call( this, enable );
	this.getInputElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};
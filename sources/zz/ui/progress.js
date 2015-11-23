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
 * @fileoverview Provide zz.ui.Progress class.
 * @author aleksander.popkov@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.Progress' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.componentHandler' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Material ripple fx class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.Progress = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.Progress, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.Progress );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.Button.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.Progress.CSS = {
	INDETERMINATE_CLASS: goog.getCssName( 'mdl-progress__indeterminate' )
};

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.Progress.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * Set the current progress of the progressbar.
 *
 * @param {number} p Percentage of the progress (0-100)
 * @public
 */
zz.ui.Progress.prototype.setProgress = function( p ) {
	if ( this.getElement( ).classList.contains( this.CSS.INDETERMINATE_CLASS ) ) {
		return;
	}

	this.progressbar.style.width = p + '%';
};

/**
 * Set the current progress of the buffer.
 *
 * @param {number} p Percentage of the buffer (0-100)
 * @public
 */
zz.ui.Progress.prototype.setBuffer = function( p ) {
	this.bufferbar.style.width = p + '%';
	this.auxbar.style.width = (100 - p) + '%';
};

/**
 * @override
 */
zz.ui.Progress.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );




	if (element) {
		var el = getDomHelper( ).createDom( goog.dom.TagName.DIV);
		el.className =
			goog.getCssName( 'progressbar' ) + ' ' +
			goog.getCssName( 'bar' ) + ' ' +
			goog.getCssName( 'bar1' );
		goog.dom.appendChild( element, el );
		this.progressbar = el;

		el = getDomHelper( ).createDom( goog.dom.TagName.DIV);
		el.className =
			goog.getCssName( 'bufferbar' ) + ' ' +
			goog.getCssName( 'bar' ) + ' ' +
			goog.getCssName( 'bar2' );
		goog.dom.appendChild( element, el );
		this.bufferbar = el;

		el = getDomHelper( ).createDom( goog.dom.TagName.DIV);
		el.className =
			goog.getCssName( 'auxbar' ) + ' ' +
			goog.getCssName( 'bar' ) + ' ' +
			goog.getCssName( 'bar3' );
		goog.dom.appendChild( element, el );
		this.auxbar = el;

		this.progressbar.style.width = '0%';
		this.bufferbar.style.width = '100%';
		this.auxbar.style.width = '0%';

		this.getElement( ).classList.add( goog.getCssName( 'is-upgraded' ) );
	}

};

/**
 * Downgrade the component
 *
 * @private
 */
zz.ui.Progress.prototype.mdlDowngrade = function() {
	while (this.getElement( ).firstChild) {
		this.getElement( ).removeChild(this.getElement( ).firstChild);
	}
};

/**
 * Downgrade the component
 *
 * @private
 */
zz.ui.Progress.prototype.mdlDowngrade = function() {
	while (this.getElement.firstChild) {
		this.getElement.removeChild(this.getElement.firstChild);
	}
};
/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.Button.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
//zz.ui.Button.prototype.disposeInternal = function( ){
//
//	goog.base( this, 'disposeInternal' );
//
//	this.getHandler( ).dispose( );
//};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Public alias for the downgrade method.
 *
 * @public
 */

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
	constructor: zz.ui.Progress,
	classAsString: 'ZZUIProgress',
	cssClass: goog.getCssName( 'mdl-js-progress' ),
	widget: true
});


/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.Progress.prototype.getCssClass = function( ){

	return zz.ui.Progress.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/
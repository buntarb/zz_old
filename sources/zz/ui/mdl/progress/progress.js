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
 * @fileoverview Provide zz.ui.mdl.Progress class.
 * @author aleksander.popkov@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Progress' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Material ripple fx class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.mdl.Progress = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.mdl.Progress, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.mdl.Progress );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Progress.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Progress.CSS = {

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
zz.ui.mdl.Progress.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.Progress.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );

	if( element ){

		this.progressbar_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
		this.bufferbar_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
		this.auxbar_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV );
		goog.dom.classlist.addAll( this.progressbar_, [

			goog.getCssName( 'progressbar' ),
			goog.getCssName( 'bar' ),
			goog.getCssName( 'bar1' )
		] );
		goog.dom.classlist.addAll( this.bufferbar_, [

			goog.getCssName( 'bufferbar' ),
			goog.getCssName( 'bar' ),
			goog.getCssName( 'bar2' )
		] );
		goog.dom.classlist.addAll( this.auxbar_, [

			goog.getCssName( 'auxbar' ),
			goog.getCssName( 'bar' ),
			goog.getCssName( 'bar3' )
		] );
		goog.style.setStyle( this.progressbar_, {

			width: '0'
		} );
		goog.style.setStyle( this.bufferbar_, {

			width: '100%'
		} );
		goog.style.setStyle( this.auxbar_, {

			width: '0'
		} );
		goog.dom.appendChild( element, this.progressbar_ );
		goog.dom.appendChild( element, this.bufferbar_ );
		goog.dom.appendChild( element, this.auxbar_ );
		goog.dom.classlist.add( this.getElement( ), goog.getCssName( 'is-upgraded' ) );
	}
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Progress.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Progress.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**
 * Downgrade the component
 *
 * @private
 */
zz.ui.mdl.Progress.prototype.mdlDowngrade = function( ){

	this.dispose( );
};


/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.mdl.Progress.prototype.getCssClass = function( ){

	return zz.ui.mdl.Progress.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Set the current progress of the progressbar.
 * @param {number} p Percentage of the progress (0-100)
 * @public
 */
zz.ui.mdl.Progress.prototype.setProgress = function( p ){

	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.Progress.CSS.INDETERMINATE_CLASS ) ){

		return;
	}
	goog.style.setStyle( this.progressbar_, {

		width: p + '%'
	} );
};

/**
 * Set the current progress of the buffer.
 * @param {number} p Percentage of the buffer (0-100)
 * @public
 */
zz.ui.mdl.Progress.prototype.setBuffer = function( p ){

	goog.style.setStyle( this.bufferbar_, {

		width: p + '%'
	} );
	goog.style.setStyle( this.auxbar_, {

		width: ( 100 - p ) + '%'
	} );
};
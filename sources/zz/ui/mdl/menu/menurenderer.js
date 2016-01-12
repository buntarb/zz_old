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
 * @fileoverview Provide zz.ui.mdl.MenuRenderer class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.MenuRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.ControlRenderer' );

/**********************************************************************************************************************
 * Renderer definition section                                                                                        *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.mdl.Menu}s. Extends the superclass to support Menues states.
 * @constructor
 * @extends {zz.ui.mdl.ControlRenderer}
 */
zz.ui.mdl.MenuRenderer = function( ){

	zz.ui.mdl.MenuRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.MenuRenderer, zz.ui.mdl.ControlRenderer );
goog.addSingletonGetter( zz.ui.mdl.MenuRenderer );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.MenuRenderer.CSS_CLASS = goog.getCssName( 'mdl-menu' );

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.Menu} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.MenuRenderer.prototype.decorate = function( control, element ){

	var container = goog.dom.createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Menu.CSS.CONTAINER
	} );

	var listItem = goog.dom.getElementsByClass( zz.ui.mdl.Menu.CSS.ITEM);

	// Container element
	control.setContainerElement( container );

	goog.dom.insertSiblingBefore( container, element );

	goog.dom.appendChild( container, goog.dom.createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Menu.CSS.OUTLINE
	} ) );

	goog.dom.appendChild( container, element );


	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.RIPPLE_EFFECT ) ) {

		for ( i = 0; i < listItem.length; i++ ){

			goog.dom.appendChild( listItem[i], control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

				'class': zz.ui.mdl.Menu.CSS.ITEM_RIPPLE_CONTAINER
			}, control.getDomHelper().createDom(goog.dom.TagName.SPAN, {

				'class': zz.ui.mdl.Menu.CSS.RIPPLE
			})));
		}
	}

	// Find the "for" element.
	var forElId = control.getElement( ).getAttribute( 'for' );
	var forElement = null;
	if ( forElId ){

		forEl = goog.dom.getElement( forElId );
	}
	control.setForElement( forElement );

	goog.dom.classlist.add( container, zz.ui.mdl.Menu.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.MenuRenderer.prototype.getCssClass = function( ){

	return zz.ui.mdl.MenuRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * @param {zz.ui.mdl.Menu} control
 */
zz.ui.mdl.MenuRenderer.prototype.addAnimationEndListener_ = function( ){

	var cleanup = function( ){

		control.getElement( ).removeEventListener('transitionend', cleanup);
		control.getElement( ).removeEventListener('webkitTransitionEnd', cleanup);
		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Menu.IS_ANIMATING );

	}.bind( this );

	// Remove animation class once the transition is done.
	control.getElement( ).addEventListener( 'transitionend', cleanup );
	control.getElement( ).addEventListener( 'webkitTransitionEnd', cleanup );
};
/**
 * Displays the menu.
 *
 * @public
 */
zz.ui.mdl.MenuRenderer.prototype.show = function( evt ){

	// Measure the inner element.
	var height = control.getElement( ).getBoundingClientRect( ).height;
	var width = control.getElement( ).getBoundingClientRect( ).width;

	// Apply the inner element's size to the container and outline.
	goog.style.setStyle( control.getContainerElement( ), {

		width : width + 'px',
		height : height + 'px'
	});
	goog.style.setStyle( control.outLine_, {

		width : width + 'px',
		height : height + 'px'
	});

	var transitionDuration = zz.ui.mdl.Menu.CONST.TRANSITION_DURATION_SECONDS *
		zz.ui.mdl.Menu.CONST.TRANSITION_DURATION_FRACTION;

		// Calculate transition delays for individual menu items, so that they fade
		// in one at a time.
		var items = control.getElement( ).querySelectorAll( '.' + zz.ui.mdl.Menu.CSS.ITEM );
		for ( var i = 0; i < items.length; i++ ){

			var itemDelay = null;
			if ( goog.dom.classlist.contains( control.getElement( ), zz.ui.mdl.Menu.CSS.TOP_LEFT ) ||

				goog.dom.classlist.contains( control.getElement( ), zz.ui.mdl.Menu.CSS.TOP_LEFT ).TOP_RIGHT ){

				itemDelay = ( ( height - items[i].offsetTop - items[i].offsetHeight ) /

					height * transitionDuration ) + 's';
			} else {

				itemDelay = ( items[i].offsetTop / height * transitionDuration ) + 's';
			}
			items[i].style.transitionDelay = itemDelay;
		}

		// Apply the initial clip to the text before we start animating.
		control.applyClip_( height, width );

		// Wait for the next frame, turn on animation, and apply the final clip.
		// Also make it visible. This triggers the transitions.
		window.requestAnimationFrame( function( ){

			goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Menu.CSS.IS_ANIMATING );
			goog.style.setStyle( control.getElement( ), {

				clip : 'rect(0 ' + width + 'px ' + height + 'px 0)'
			} );
			goog.dom.classlist.add( control.getContainerElement( ), zz.ui.mdl.Menu.CSS.IS_VISIBLE );;
		}.bind( control ) );

		// Clean up after the animation is complete.
		control.addAnimationEndListener_( );

		// Add a click listener to the document, to close the menu.
		var callback = function( e ){

			// Check to see if the document is processing the same event that
			// displayed the menu in the first place. If so, do nothing.
			// Also check to see if the menu is in the process of closing itself, and
			// do nothing in that case.
			// Also check if the clicked element is a menu item
			// if so, do nothing.
			if ( e !== evt && !control.closing_ && e.target.parentNode !== control.getElement( ) ){

				document.removeEventListener( 'click', callback );
				control.hide( );
			}
		}.bind( control );
		document.addEventListener( 'click', callback );
};

/**
 * Hides the menu.
 *
 * @public
 */
zz.ui.mdl.MenuRenderer.prototype.hide = function( ){

		var items = control.getElement.querySelectorAll( '.' + zz.ui.mdl.Menu.CSS.ITEM);

		// Remove all transition delays; menu items fade out concurrently.
		for ( var i = 0; i < items.length; i++ ){

			goog.style.setStyle( items[i], {

				transitionDelay : null
			} );
		}

		// Measure the inner element.
		var rect = control.getElement( ).getBoundingClientRect( );
		var height = rect.height;
		var width = rect.width;

		// Turn on animation, and apply the final clip. Also make invisible.
		// This triggers the transitions.
		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Menu.CSS.IS_ANIMATING );
		control.applyClip_( height, width );
		goog.dom.classlist.remove( control.getContainerElement( ), zz.ui.mdl.Menu.CSS.IS_VISIBLEG );

		// Clean up after the animation is complete.
		control.addAnimationEndListener_( );
};

/**
 * Displays or hides the menu, depending on current state.
 *
 * @public
 */
zz.ui.mdl.MenuRenderer.prototype.toggle = function( evt ){

	if ( goog.dom.classlist.contains( control.getContainerElement( ), zz.ui.mdl.Menu.CSS.IS_VISIBLE ) ){

		control.hide( );
	} else {
		control.show( evt );
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Menues.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.MenuRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Menu( );
} );
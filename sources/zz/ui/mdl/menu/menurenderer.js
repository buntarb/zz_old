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

goog.require( 'goog.array' );
goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.ui.MenuRenderer' );
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

	goog.ui.MenuRenderer.call( this );
};
goog.inherits( zz.ui.mdl.MenuRenderer, goog.ui.MenuRenderer );
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
	var outline = goog.dom.createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Menu.CSS.OUTLINE
	} );
	var itemsList = goog.dom.getElementsByClass( zz.ui.mdl.Menu.CSS.ITEM );

	goog.dom.insertSiblingBefore( container, element );
	goog.dom.appendChild( container, outline );
	goog.dom.appendChild( container, element );

	control.setContainerElement( container );
	control.setOutlineElement( outline );
	control.setListElement( element );
	control.setItemsElements( itemsList );

	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.BOTTOM_LEFT ) ){

		goog.dom.classlist.add( outline, zz.ui.mdl.Menu.CSS.BOTTOM_LEFT )
	}
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.BOTTOM_RIGHT ) ){

		goog.dom.classlist.add( outline, zz.ui.mdl.Menu.CSS.BOTTOM_RIGHT )
	}
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.TOP_LEFT ) ){

		goog.dom.classlist.add( outline, zz.ui.mdl.Menu.CSS.TOP_LEFT )
	}
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.TOP_RIGHT ) ){

		goog.dom.classlist.add( outline, zz.ui.mdl.Menu.CSS.TOP_RIGHT )
	}
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Menu.CSS.UNALIGNED ) ){

		goog.dom.classlist.add( outline, zz.ui.mdl.Menu.CSS.UNALIGNED )
	}
	if( goog.dom.classlist.contains( control.getListElement( ), zz.ui.mdl.MenuItem.CSS.RIPPLE_EFFECT ) ){

		goog.array.forEach( control.getItemsElements( ), function( item ){

			goog.dom.classlist.add( item, zz.ui.mdl.MenuItem.CSS.RIPPLE_EFFECT );
		} );
	}
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
 * Apply clip to menu list.
 * @param {zz.ui.mdl.Menu} control
 * @param {goog.math.Size} listSize
 * @private
 */
zz.ui.mdl.MenuRenderer.prototype.applyClip_ = function( control, listSize ){

	if( goog.dom.classlist.contains( control.getListElement( ), zz.ui.mdl.Menu.CSS.UNALIGNED  ) ){

		goog.style.setStyle( control.getListElement( ), {

			clip: ''
		} );
	}
	if( goog.dom.classlist.contains( control.getListElement( ), zz.ui.mdl.Menu.CSS.BOTTOM_RIGHT  ) ){

		goog.style.setStyle( control.getListElement( ), {

			clip: 'rect(0 ' + listSize.width + 'px ' + '0 ' + listSize.width + 'px)'
		} );
	}
	if( goog.dom.classlist.contains( control.getListElement( ), zz.ui.mdl.Menu.CSS.TOP_LEFT  ) ){

		goog.style.setStyle( control.getListElement( ), {

			clip: 'rect(' + listSize.height + 'px 0 ' + listSize.height + 'px 0)'
		} );
	}
	if( goog.dom.classlist.contains( control.getListElement( ), zz.ui.mdl.Menu.CSS.TOP_RIGHT  ) ){

		goog.style.setStyle( control.getListElement( ), {

			clip: 'rect(' + listSize.height + 'px ' +

				listSize.width + 'px ' +
				listSize.height + 'px ' +
				listSize.width + 'px)'
		} );
	}
};

/**
 * Remove animating class.
 * @param {zz.ui.mdl.Menu} control
 */
zz.ui.mdl.MenuRenderer.prototype.removeAnimatingClass = function( control ){

	goog.dom.classlist.remove( control.getListElement( ), zz.ui.mdl.Menu.CSS.IS_ANIMATING );
};

/**
 * Open menu.
 * @param {zz.ui.mdl.Menu} control
 * @param {Element=} opt_element
 */
zz.ui.mdl.MenuRenderer.prototype.open = function( control, opt_element ){

	if( control.getContainerElement( ) && control.getOutlineElement( ) && control.getListElement( ) ){

		var listSize = goog.style.getSize( control.getListElement( ) );

		goog.style.setWidth( control.getContainerElement( ), listSize.width );
		goog.style.setHeight( control.getContainerElement( ), listSize.height );
		goog.style.setWidth( control.getOutlineElement( ), listSize.width );
		goog.style.setHeight( control.getOutlineElement( ), listSize.height );

		var transitionDuration = zz.ui.mdl.Menu.CONST.TRANSITION_DURATION_SECONDS *

			zz.ui.mdl.Menu.CONST.TRANSITION_DURATION_FRACTION;

		goog.array.forEach( control.getItemsElements( ), function( item ){

			var itemDelay = null;
			if( goog.dom.classlist.contains( item, zz.ui.mdl.Menu.CSS.TOP_LEFT ) ||
				goog.dom.classlist.contains( item, zz.ui.mdl.Menu.CSS.TOP_RIGHT ) ){

				itemDelay = ( (

					listSize.height -
					goog.style.getPosition( item ).y -
					goog.style.getSize( item ).height ) /

					listSize.height * transitionDuration ) + 's';

			}else{

				itemDelay = ( goog.style.getPosition( item ).y / listSize.height * transitionDuration ) + 's';
			}
			goog.style.setStyle( item, {

				transitionDelay: itemDelay
			} );
		} );
		this.applyClip_( control, listSize );

		// TODO (buntarb): Maybe we can drop animation frame from here.
//		window.requestAnimationFrame( function( ){

			goog.dom.classlist.add( control.getListElement( ), zz.ui.mdl.Menu.CSS.IS_ANIMATING );
			goog.style.setStyle( control.getListElement( ), {

				clip: 'rect(0 ' + listSize.width + 'px ' + listSize.height + 'px 0)'
			} );
			goog.dom.classlist.add( control.getContainerElement( ), zz.ui.mdl.Menu.CSS.IS_VISIBLE );

//		} );
	}
};

/**
 * Close menu.
 * @param {zz.ui.mdl.Menu} control
 * @param {Element=} opt_element
 */
zz.ui.mdl.MenuRenderer.prototype.close = function( control, opt_element ){

	if( control.getContainerElement( ) && control.getOutlineElement( ) && control.getListElement( ) ){

		goog.array.forEach( control.getItemsElements( ), function( item ){

			goog.style.setStyle( item, {

				transitionDelay: ''
			} );
		} );
		var listSize = goog.style.getSize( control.getListElement( ) );
		goog.dom.classlist.add( control.getListElement( ), zz.ui.mdl.Menu.CSS.IS_ANIMATING );
		this.applyClip_( control, listSize );
		goog.dom.classlist.remove( control.getContainerElement( ), zz.ui.mdl.Menu.CSS.IS_VISIBLE );
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Menus.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.MenuRenderer.CSS_CLASS, function( ){

	return new zz.ui.mdl.Menu( );
} );
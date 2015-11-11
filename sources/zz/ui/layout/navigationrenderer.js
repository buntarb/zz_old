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
 * @fileoverview Provide zz.ui.layout.NavigationRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.layout.NavigationRenderer' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

//goog.require( 'goog.a11y.aria' );
//goog.require( 'goog.a11y.aria.Role' );
//goog.require( 'goog.a11y.aria.State' );

goog.require( 'goog.ui.ControlRenderer' );

goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.asserts' );

goog.require( 'goog.dom.TagName' );
goog.require( 'goog.dom.classlist' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.Checkbox}s.  Extends the superclass to support checkbox states.
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
zz.ui.layout.NavigationRenderer = function( ){

	zz.ui.CheckboxRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.layout.NavigationRenderer, goog.ui.ControlRenderer );
goog.tagUnsealableClass( zz.ui.layout.NavigationRenderer );
goog.addSingletonGetter( zz.ui.layout.NavigationRenderer );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.layout.NavigationRenderer.CONST = {

	MAX_WIDTH: 1024,
	MAX_WIDTH_MEDIA: '(max-width: 1024px)',
	TAB_SCROLL_PIXELS: 100,
	MENU_ICON: 'menu',
	CHEVRON_LEFT: 'chevron_left',
	CHEVRON_RIGHT: 'chevron_right'
};

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.layout.NavigationRenderer.CSS = {

	CONTAINER: goog.getCssName( 'mdl-layout__container' ),

	LAYOUT: goog.getCssName( 'mdl-layout' ),
	LAYOUT_JS: goog.getCssName( 'mdl-js-layout' ),

	HEADER: goog.getCssName( 'mdl-layout__header' ),
	DRAWER: goog.getCssName( 'mdl-layout__drawer' ),
	CONTENT: goog.getCssName( 'mdl-layout__content' ),
	DRAWER_BTN: goog.getCssName( 'mdl-layout__drawer-button' ),

	ICON: goog.getCssName( 'material-icons' ),

	JS_RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-layout__tab-ripple-container' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),

	HEADER_ROW: goog.getCssName( 'mdl-layout__header-row' ),
	HEADER_SEAMED: goog.getCssName( 'mdl-layout__header--seamed' ),
	HEADER_WATERFALL: goog.getCssName( 'mdl-layout__header--waterfall' ),
	HEADER_SCROLL: goog.getCssName( 'mdl-layout__header--scroll' ),

	TITLE: goog.getCssName( 'mdl-layout-title' ),
	SPACER: goog.getCssName( 'mdl-layout-spacer' ),
	NAVIGATION: goog.getCssName( 'mdl-navigation' ),

	FIXED_HEADER: goog.getCssName( 'mdl-layout--fixed-header' ),
	OBFUSCATOR: goog.getCssName( 'mdl-layout__obfuscator' ),

	TAB_BAR: goog.getCssName( 'mdl-layout__tab-bar' ),
	TAB_CONTAINER: goog.getCssName( 'mdl-layout__tab-bar-container' ),
	TAB: goog.getCssName( 'mdl-layout__tab' ),
	TAB_BAR_BUTTON: goog.getCssName( 'mdl-layout__tab-bar-button' ),
	TAB_BAR_LEFT_BUTTON: goog.getCssName( 'mdl-layout__tab-bar-left-button' ),
	TAB_BAR_RIGHT_BUTTON: goog.getCssName( 'mdl-layout__tab-bar-right-button' ),
	PANEL: goog.getCssName( 'mdl-layout__tab-panel' ),

	HAS_DRAWER: goog.getCssName( 'has-drawer' ),
	HAS_TABS: goog.getCssName( 'has-tabs' ),
	HAS_SCROLLING_HEADER: goog.getCssName( 'has-scrolling-header' ),
	CASTING_SHADOW: goog.getCssName( 'is-casting-shadow' ),
	IS_COMPACT: goog.getCssName( 'is-compact' ),
	IS_SMALL_SCREEN: goog.getCssName( 'is-small-screen' ),
	IS_DRAWER_OPEN: goog.getCssName( 'is-visible' ),
	IS_ACTIVE: goog.getCssName( 'is-active' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	IS_ANIMATING: goog.getCssName( 'is-animating' ),

	ON_LARGE_SCREEN: goog.getCssName( 'mdl-layout--large-screen-only' ),
	ON_SMALL_SCREEN: goog.getCssName( 'mdl-layout--small-screen-only' )
};

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.layout.NavigationRenderer.CSS_LAYOUT_CLASS = goog.getCssName( 'mdl-layout' );
zz.ui.layout.NavigationRenderer.CSS_LAYOUT_JS_CLASS = goog.getCssName( 'mdl-js-layout' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.layout.NavigationRenderer.prototype.getCssClass = function( ){

	return zz.ui.layout.NavigationRenderer.CSS_LAYOUT_CLASS + ' ' +
		zz.ui.layout.NavigationRenderer.CSS_LAYOUT_JS_CLASS;
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 * @param {zz.ui.layout.Navigation} navigation
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationRenderer.prototype.createDom = function( navigation ){

	this.createHeaderDom_( /** @type {zz.ui.layout.Navigation} */ ( navigation ) );

	// Drawer
	var drawerElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.DRAWER
	} );

	// Body
	var bodyElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.CONTENT
	} );

	// Layout
	var layoutElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class':

			zz.ui.layout.NavigationRenderer.CSS.LAYOUT + ' ' +
			zz.ui.layout.NavigationRenderer.CSS.LAYOUT_JS

	}, [ navigation.getHeaderElement( ), drawerElement, bodyElement ] );

	return layoutElement;
};

/** @override */
zz.ui.layout.NavigationRenderer.prototype.decorate = function( navigation, element ){

	//

	return element;
};

/**********************************************************************************************************************
 * Create DOM-elements methods                                                                                        *
 **********************************************************************************************************************/

/**
 * Create layout header DOM.
 * @param {zz.ui.layout.Navigation} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createHeaderDom_ = function( navigation ){

	// Title
	var headerTitleElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.layout.NavigationRenderer.CSS.TITLE
	} );

	// Spacer
	var headerSpacerElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.SPACER
	} );

	// Navigation
	var headerNavigationElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.NAV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.NAVIGATION
	} );

	// Header row
	var headerRowElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.HEADER_ROW

	}, [ headerTitleElement, headerSpacerElement, headerNavigationElement ] );

	// Setting up header.
	navigation.setHeaderElement( navigation.getDomHelper( ).createDom( goog.dom.TagName.HEADER, {

		'class': zz.ui.layout.NavigationRenderer.CSS.HEADER

	}, [ headerRowElement ] ) );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Update styles on window resize event.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnResize = function( navigation ){

	var element = navigation.getElement( );
	var drawer = navigation.getDrawerElement( );
	var obfuscator = navigation.getObfuscatorElement( );
	if( navigation.getDomHelper( ).getWindow( ).innerWidth <=
		zz.ui.layout.NavigationRenderer.CONST.MAX_WIDTH ){

		goog.dom.classlist.add(

			element,
			zz.ui.layout.NavigationRenderer.CSS.IS_SMALL_SCREEN );

	}else{

		goog.dom.classlist.remove(

			element,
			zz.ui.layout.NavigationRenderer.CSS.IS_SMALL_SCREEN );

		// Collapse drawer (if any) when moving to a large screen size.
		if( drawer ){

			goog.dom.classlist.remove(

				drawer,
				zz.ui.layout.NavigationRenderer.CSS.IS_DRAWER_OPEN );

			goog.dom.classlist.remove(

				obfuscator,
				zz.ui.layout.NavigationRenderer.CSS.IS_DRAWER_OPEN );
		}
	}
};

/**
 * Update on scroll event.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnScroll = function( navigation ){

	var header = navigation.getHeaderElement( );
	var body = navigation.getBodyElement( );
	if( goog.dom.classlist.contains( header, zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING ) ){

		return;
	}
	if( body.scrollTop > 0 &&
		!goog.dom.classlist.contains( header, zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );

	}else if( body.scrollTop <= 0 &&
		goog.dom.classlist.contains( header, zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove( header, zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );
		goog.dom.classlist.remove( header, zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT );
		goog.dom.classlist.add( header, zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );
	}
};

/**
 * Update style on header transition end event.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnHeaderTransitionEnd = function( navigation ){

	var header = navigation.getHeaderElement( );
	goog.dom.classlist.remove(

		header,
		zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );
};

/**
 * Update style on header click event.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnHeaderClick = function( navigation ){

	var header = navigation.getHeaderElement( );
	if( goog.dom.classlist.contains( header, zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );
	}
};

/**
 * Update style on drawer toggle event.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnDrawerToggle = function( navigation ){

	var drawer = navigation.getDrawerElement( );
	var obfuscator = navigation.getObfuscatorElement( );
	goog.dom.classlist.toggle(

		drawer,
		zz.ui.layout.NavigationRenderer.CSS.IS_DRAWER_OPEN );

	goog.dom.classlist.toggle(

		obfuscator,
		zz.ui.layout.NavigationRenderer.CSS.IS_DRAWER_OPEN );
};

/**
 * Reset tab state, dropping active classes
 * @param {Array} tabBar
 */
zz.ui.layout.NavigationRenderer.prototype.resetTabState = function( tabBar ){

	for(var i = 0; i < tabBar.length; i++ ){

		goog.dom.classlist.remove(

			tabBar[ i ],
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
	}
};

/**
 * Reset panel state, dropping active classes
 * @param {Array} panels
 */
zz.ui.layout.NavigationRenderer.prototype.resetPanelState = function( panels ){

	for( var i = 0; i < panels.length; i++){

		goog.dom.classlist.remove(

			panels[ i ],
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
	}
};
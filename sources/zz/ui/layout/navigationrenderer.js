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

goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.asserts' );
goog.require( 'goog.dom.TagName' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.ui.ControlRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Default renderer for {@link zz.ui.Checkbox}s.  Extends the superclass to support checkbox states.
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
zz.ui.layout.NavigationRenderer = function( ){

	zz.ui.layout.NavigationRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.layout.NavigationRenderer, goog.ui.ControlRenderer );
goog.tagUnsealableClass( zz.ui.layout.NavigationRenderer );
goog.addSingletonGetter( zz.ui.layout.NavigationRenderer );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Modes.
 * @enum {number}
 */
zz.ui.layout.NavigationRenderer.MODE = {

	STANDARD: 0,
	SEAMED: 1,
	WATERFALL: 2,
	SCROLL: 3
};

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
	NAVIGATION_LINK: goog.getCssName( 'mdl-navigation__link' ),

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
zz.ui.layout.NavigationRenderer.CSS_CLASS = goog.getCssName( '' );

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

	return zz.ui.layout.NavigationRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Create DOM-elements methods                                                                                        *
 **********************************************************************************************************************/

/**
 * Generate navigation list.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @returns {Array}
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createNavigationListDom_ = function( navigation ){

	var links = [ ];
	goog.array.forEach( navigation.getList( ), function( link ){

		links.push( navigation.getDomHelper( ).createDom( goog.dom.TagName.A, {

			'class': zz.ui.layout.NavigationRenderer.CSS.NAVIGATION_LINK,
			'href': link.href

		}, link.name ) );

	}, this );
	return links;
};

/**
 * Create layout header DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createHeaderDom_ = function( navigation ){

	// Title
	var headerTitleElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.layout.NavigationRenderer.CSS.TITLE

	}, navigation.getContent( ) );

	// Spacer
	var headerSpacerElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.SPACER
	} );

	// Navigation
	var headerNavigationElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.NAV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.NAVIGATION

	}, this.createNavigationListDom_( navigation ) );

	// Header row
	var headerRowElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.HEADER_ROW

	}, [ headerTitleElement, headerSpacerElement, headerNavigationElement ] );

	var headerRootElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.HEADER, {

		'class': zz.ui.layout.NavigationRenderer.CSS.HEADER

	}, headerRowElement );

	// Setting up header.
	navigation.setHeaderElement( headerRootElement );
};

/**
 * Create layout drawer DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createDrawerDom_ = function( navigation ){

	// Title
	var drawerTitleElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.layout.NavigationRenderer.CSS.TITLE

	}, navigation.getContent( ) );

	// Navigation
	var drawerNavigationElement = navigation.getDomHelper( ).createDom( goog.dom.TagName.NAV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.NAVIGATION

	}, this.createNavigationListDom_( navigation ) );

	// Setting up drawer.
	navigation.setDrawerElement( navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.DRAWER

	}, [ drawerTitleElement, drawerNavigationElement ] ) );
};

/**
 * Create layout drawer button DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createDrawerButtonDom_ = function( navigation ){

	navigation.setDrawerButtonElement( navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.DRAWER_BTN

	}, navigation.getDomHelper( ).createDom( goog.dom.TagName.I, {

		'class': zz.ui.layout.NavigationRenderer.CSS.ICON

	}, zz.ui.layout.NavigationRenderer.CONST.MENU_ICON ) ) );
};

/**
 * Create layout body DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createObfuscatorDom_ = function( navigation ){

	navigation.setObfuscatorElement( navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.OBFUSCATOR
	} ) );
};

/**
 * Create layout tab-bar section DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createTabBarDom_ = function( navigation ){

	var container = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.TAB_CONTAINER

	} );
	goog.dom.insertSiblingBefore(

		container,
		navigation.getTabBarElement( ) );

	goog.dom.removeChildren(

		navigation.getTabBarElement( ) );

	navigation.setTabBarLeftButtonElement(

		navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

			'class':

				zz.ui.layout.NavigationRenderer.CSS.TAB_BAR_BUTTON + ' ' +
				zz.ui.layout.NavigationRenderer.CSS.TAB_BAR_LEFT_BUTTON

		}, navigation.getDomHelper( ).createDom( goog.dom.TagName.I, {

			'class': zz.ui.layout.NavigationRenderer.CSS.ICON

		}, zz.ui.layout.NavigationRenderer.CONST.CHEVRON_LEFT ) ) );

	navigation.setTabBarRightButtonElement(

		navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

			'class':

				zz.ui.layout.NavigationRenderer.CSS.TAB_BAR_BUTTON + ' ' +
				zz.ui.layout.NavigationRenderer.CSS.TAB_BAR_RIGHT_BUTTON

		}, navigation.getDomHelper( ).createDom( goog.dom.TagName.I, {

			'class': zz.ui.layout.NavigationRenderer.CSS.ICON

		}, zz.ui.layout.NavigationRenderer.CONST.CHEVRON_RIGHT ) ) );

	goog.dom.appendChild(

		container,
		navigation.getTabBarLeftButtonElement( ) );

	goog.dom.appendChild(

		container,
		navigation.getTabBarElement( ) );

	goog.dom.appendChild(

		container,
		navigation.getTabBarRightButtonElement( ) );

	if( goog.dom.classlist.contains(
		navigation.getTabBarElement( ),
		zz.ui.layout.NavigationRenderer.CSS.JS_RIPPLE_EFFECT ) ){

		goog.dom.classlist.add(

			navigation.getTabBarElement( ),
			zz.ui.layout.NavigationRenderer.CSS.RIPPLE_IGNORE_EVENTS );
	}
	this.setStyleOnTabScroll( navigation );

	// Select element tabs
	navigation.setTabsElements(

		goog.dom.getElementsByClass(

			zz.ui.layout.NavigationRenderer.CSS.TAB,
			navigation.getTabBarElement( ) ) );

	// Select document panels
	navigation.setPanelsElements(

		goog.dom.getElementsByClass(

			zz.ui.layout.NavigationRenderer.CSS.PANEL,
			navigation.getTabBarElement( ) ) );

	// Create new tabs for each tab element
	goog.array.forEach( navigation.getTabsElements( ), function( tab ){

		if( goog.dom.classlist.contains(
			navigation.getTabBarElement( ),
			zz.ui.layout.NavigationRenderer.CSS.JS_RIPPLE_EFFECT ) ){

			goog.dom.appendChild(

				tab,
				navigation.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

					'class': zz.ui.layout.NavigationRenderer.CSS.RIPPLE_CONTAINER + ' ' +
						zz.ui.layout.NavigationRenderer.CSS.JS_RIPPLE_EFFECT

				}, navigation.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

					'class': zz.ui.layout.NavigationRenderer.CSS.RIPPLE
				} ) ) );
		}
	} );
};

/**
 * Create layout body DOM.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @private
 */
zz.ui.layout.NavigationRenderer.prototype.createBodyDom_ = function( navigation ){

	// Setting up body.
	navigation.setBodyElement( navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.CONTENT
	} ) );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Update styles on window resize event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @param {Element} element
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnResize = function( navigation, element ){

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
 * @param {zz.ui.layout.NavigationCtrl} navigation
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

	}else if( body.scrollTop <= 0 && goog.dom.classlist.contains(
		header,
		zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove(

			header,
			zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );

		goog.dom.classlist.remove(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_COMPACT );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );
	}
};

/**
 * Update style on tab scroll event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnTabScroll = function( navigation ){

	if( navigation.getTabBarElement( ).scrollLeft > 0 ){

		goog.dom.classlist.add(

			navigation.getTabBarLeftButtonElement( ),
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );

	}else{

		goog.dom.classlist.remove(

			navigation.getTabBarLeftButtonElement( ),
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
	}
	if( navigation.getTabBarElement( ).scrollLeft <
		navigation.getTabBarElement( ).scrollWidth -
			navigation.getTabBarElement( ).offsetWidth ){

		goog.dom.classlist.add(

			navigation.getTabBarRightButtonElement( ),
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );

	}else{

		goog.dom.classlist.remove(

			navigation.getTabBarRightButtonElement( ),
			zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
	}
};

/**
 * Update style on header transition end event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnHeaderTransitionEnd = function( navigation ){

	var header = navigation.getHeaderElement( );
	goog.dom.classlist.remove(

		header,
		zz.ui.layout.NavigationRenderer.CSS.IS_ANIMATING );
};

/**
 * Update style on header click event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
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
 * @param {zz.ui.layout.NavigationCtrl} navigation
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
 * Update style on tab-bar left button click event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnTabBarLeftButtonClick = function( navigation ){

	navigation.getTabBarElement( ).scrollLeft -= zz.ui.layout.NavigationRenderer.CONST.TAB_SCROLL_PIXELS;
};

/**
 * Update style on tab-bar right button click event.
 * @param {zz.ui.layout.NavigationCtrl} navigation
 */
zz.ui.layout.NavigationRenderer.prototype.setStyleOnTabBarRightButtonClick = function( navigation ){

	navigation.getTabBarElement( ).scrollLeft += zz.ui.layout.NavigationRenderer.CONST.TAB_SCROLL_PIXELS;
};

/**
 * Set tab active
 * @param {Element} tab
 */
zz.ui.layout.NavigationRenderer.prototype.setTabActive = function( tab ){

	goog.dom.classlist.add(

		tab,
		zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
};

/**
 * Set panel active
 * @param {Element} panel
 */
zz.ui.layout.NavigationRenderer.prototype.setPanelActive = function( panel ){

	goog.dom.classlist.add(

		panel,
		zz.ui.layout.NavigationRenderer.CSS.IS_ACTIVE );
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

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @returns {Element}
 */
zz.ui.layout.NavigationRenderer.prototype.createDom = function( navigation ){

	this.createNavigationListDom_( navigation );
	this.createHeaderDom_( navigation );
	this.createDrawerDom_( navigation );
	this.createBodyDom_( navigation );

	return this.decorate( navigation, navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class':

			zz.ui.layout.NavigationRenderer.CSS.LAYOUT + ' ' +
			zz.ui.layout.NavigationRenderer.CSS.LAYOUT_JS

	}, [ navigation.getHeaderElement( ), navigation.getDrawerElement( ), navigation.getBodyElement( ) ] ) );
};

/**
 * @override
 * @param {zz.ui.layout.NavigationCtrl} navigation
 * @param {Element} element
 * @returns {Element}
 */
zz.ui.layout.NavigationRenderer.prototype.decorate = function( navigation, element ){

	var children = element.childNodes;
	var container = navigation.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.layout.NavigationRenderer.CSS.CONTAINER

	}, element );

	// Find elements
	if( !navigation.getHeaderElement( ) ||
		!navigation.getDrawerElement( ) ||
		!navigation.getBodyElement( ) ) {

		goog.array.forEach( children, function( child ){

			if( goog.dom.classlist.contains(
				child,
				zz.ui.layout.NavigationRenderer.CSS.HEADER ) ){

				navigation.setHeaderElement( child );
			}
			if( goog.dom.classlist.contains(
				child,
				zz.ui.layout.NavigationRenderer.CSS.DRAWER ) ){

				navigation.setDrawerElement( child );
			}
			if( goog.dom.classlist.contains(
				child,
				zz.ui.layout.NavigationRenderer.CSS.CONTENT ) ){

				navigation.setBodyElement( child );
			}
		}, this );
	}

	// Patch header
	if( navigation.getHeaderElement( ) ){

		navigation.setTabBarElement(

			goog.dom.getElementByClass(

				zz.ui.layout.NavigationRenderer.CSS.TAB_BAR,
				navigation.getHeaderElement( ) ) );

		if( goog.dom.classlist.contains(
			navigation.getHeaderElement( ),
			zz.ui.layout.NavigationRenderer.CSS.HEADER_SEAMED ) ){

			navigation.setMode( zz.ui.layout.NavigationRenderer.MODE.SEAMED );

		}else if( goog.dom.classlist.contains(
			navigation.getHeaderElement( ),
			zz.ui.layout.NavigationRenderer.CSS.HEADER_WATERFALL ) ){

			navigation.setMode( zz.ui.layout.NavigationRenderer.MODE.WATERFALL );

		}else if( goog.dom.classlist.contains(
			navigation.getHeaderElement( ),
			zz.ui.layout.NavigationRenderer.CSS.HEADER_SCROLL ) ){

			navigation.setMode( zz.ui.layout.NavigationRenderer.MODE.SCROLL );
			goog.dom.classlist.add(

				container,
				zz.ui.layout.NavigationRenderer.CSS.HAS_SCROLLING_HEADER );
		}
		if( navigation.getMode( ) === zz.ui.layout.NavigationRenderer.MODE.STANDARD ){

			goog.dom.classlist.add(

				navigation.getHeaderElement( ),
				zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );

			if( navigation.getTabBarElement( ) ){

				goog.dom.classlist.add(

					navigation.getTabBarElement( ),
					zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );
			}
		}else if( navigation.getMode( ) === zz.ui.layout.NavigationRenderer.MODE.SEAMED ||
			navigation.getMode( ) === zz.ui.layout.NavigationRenderer.MODE.SCROLL ){

			goog.dom.classlist.remove(

				navigation.getHeaderElement( ),
				zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );

			if( navigation.getTabBarElement( ) ){

				goog.dom.classlist.remove(

					navigation.getTabBarElement( ),
					zz.ui.layout.NavigationRenderer.CSS.CASTING_SHADOW );
			}
		}else if( navigation.getMode( ) === zz.ui.layout.NavigationRenderer.MODE.WATERFALL ){

			this.setStyleOnScroll( navigation );
		}
	}

	// Patch drawer
	if( navigation.getDrawerElement( ) ){

		navigation.setDrawerButtonElement(

			goog.dom.getElementByClass(

				zz.ui.layout.NavigationRenderer.CSS.DRAWER_BTN,
				element ) );

		if( !navigation.getDrawerButtonElement( ) ) {

			this.createDrawerButtonDom_( navigation );
		}
		if( goog.dom.classlist.contains(
			navigation.getDrawerElement( ),
			zz.ui.layout.NavigationRenderer.CSS.ON_LARGE_SCREEN ) ){

			//If drawer has ON_LARGE_SCREEN class then add it to the drawer toggle button as well.
			goog.dom.classlist.add(

				navigation.getDrawerButtonElement( ),
				zz.ui.layout.NavigationRenderer.CSS.ON_LARGE_SCREEN );

		}else if( goog.dom.classlist.contains(
			navigation.getDrawerElement( ),
			zz.ui.layout.NavigationRenderer.CSS.ON_SMALL_SCREEN ) ){

			//If drawer has ON_SMALL_SCREEN class then add it to the drawer toggle button as well.
			goog.dom.classlist.add(

				navigation.getDrawerButtonElement( ),
				zz.ui.layout.NavigationRenderer.CSS.ON_SMALL_SCREEN );
		}
		goog.dom.classlist.add(

			element,
			zz.ui.layout.NavigationRenderer.CSS.HAS_DRAWER );

		if( goog.dom.classlist.contains(
			element,
			zz.ui.layout.NavigationRenderer.CSS.FIXED_HEADER ) ){

			goog.dom.insertChildAt(

				navigation.getHeaderElement( ),
				navigation.getDrawerButtonElement( ),
				0 );

		}else{

			goog.dom.insertChildAt(

				element,
				navigation.getDrawerButtonElement( ),
				0 );
		}
		this.createObfuscatorDom_( navigation );
		goog.dom.appendChild(

			element,
			navigation.getObfuscatorElement( ) );

		this.setStyleOnResize( navigation, element );
	}

	// Patch tabs
	if( navigation.getHeaderElement( ) && navigation.getTabBarElement( ) ){

		goog.dom.classlist.add(

			element,
			zz.ui.layout.NavigationRenderer.CSS.HAS_TABS );

		this.createTabBarDom_( navigation );
	}
	goog.dom.classlist.add(

		element,
		zz.ui.layout.NavigationRenderer.CSS.IS_UPGRADED );

	return container;
};
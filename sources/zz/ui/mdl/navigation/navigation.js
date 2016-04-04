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
 * @fileoverview Provide zz.ui.mdl.Navigation class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Navigation' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.asserts' );
goog.require( 'goog.dom.TagName' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'zz.mvc.view.BaseView' );
goog.require( 'zz.ui.mdl.Ripple' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation layout class.
 * @param {string=} opt_title Text caption or DOM structure to display as the title of the layout.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {zz.mvc.view.BaseView}
 * @constructor
 */
zz.ui.mdl.Navigation = function( opt_title, opt_domHelper ){

	zz.mvc.view.BaseView.call( this, opt_domHelper );

	/**
	 * Layout navigation title content.
	 * @type {string}
	 * @private
	 */
	this.title_ = opt_title || '';
};
goog.inherits( zz.ui.mdl.Navigation, zz.mvc.view.BaseView );
goog.tagUnsealableClass( zz.ui.mdl.Navigation );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Modes.
 * @enum {number}
 */
zz.ui.mdl.Navigation.MODE = {

	STANDARD: 0,
	SEAMED: 1,
	WATERFALL: 2,
	SCROLL: 3
};

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Navigation.CONST = {

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
zz.ui.mdl.Navigation.CSS = {

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

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation mode.
 * @type {number}
 * @private
 */
zz.ui.mdl.Navigation.prototype.mode_ = zz.ui.mdl.Navigation.MODE.STANDARD;

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.Navigation.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.Navigation.prototype.decorateInternal = function( element ){

	var children = element.childNodes;
	var container = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Navigation.CSS.CONTAINER
	} );
	goog.dom.insertSiblingBefore( container, element );
	goog.dom.appendChild( container, element );
	goog.base( this, 'decorateInternal', container );

	// Find elements
	if( !this.headerElement_ ||
		!this.drawerElement_ ||
		!this.bodyElement_ ) {

		goog.array.forEach( children, function( child ){

			if( goog.dom.classlist.contains( child, zz.ui.mdl.Navigation.CSS.HEADER ) ){

				this.headerElement_ = child;
			}
			if( goog.dom.classlist.contains( child, zz.ui.mdl.Navigation.CSS.DRAWER ) ){

				this.drawerElement_ = child;
			}
			if( goog.dom.classlist.contains( child, zz.ui.mdl.Navigation.CSS.CONTENT ) ){

				this.bodyElement_ = child;
			}
		}, this );
	}

	// Patch header
	if( this.headerElement_ ){

		this.tabBarElement_ = goog.dom.getElementByClass(

			zz.ui.mdl.Navigation.CSS.TAB_BAR,
			this.headerElement_ );

		if( goog.dom.classlist.contains(
			this.headerElement_,
			zz.ui.mdl.Navigation.CSS.HEADER_SEAMED ) ){

			this.setMode( zz.ui.mdl.Navigation.MODE.SEAMED );

		}else if( goog.dom.classlist.contains(
			this.headerElement_,
			zz.ui.mdl.Navigation.CSS.HEADER_WATERFALL ) ){

			this.setMode( zz.ui.mdl.Navigation.MODE.WATERFALL );

		}else if( goog.dom.classlist.contains(
			this.headerElement_,
			zz.ui.mdl.Navigation.CSS.HEADER_SCROLL ) ){

			this.setMode( zz.ui.mdl.Navigation.MODE.SCROLL );
			goog.dom.classlist.add( container, zz.ui.mdl.Navigation.CSS.HAS_SCROLLING_HEADER );
		}
		if( this.getMode( ) === zz.ui.mdl.Navigation.MODE.STANDARD ){

			goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
			if( this.tabBarElement_ ){

				goog.dom.classlist.add( this.tabBarElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
			}
		}else if( this.getMode( ) === zz.ui.mdl.Navigation.MODE.SEAMED ||
			this.getMode( ) === zz.ui.mdl.Navigation.MODE.SCROLL ){

			goog.dom.classlist.remove( this.headerElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
			if( this.tabBarElement_ ){

				goog.dom.classlist.remove( this.tabBarElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
			}
		}else if( this.getMode( ) === zz.ui.mdl.Navigation.MODE.WATERFALL ){

			this.setStyleOnScroll( );
		}
	}

	// Patch drawer
	if( this.drawerElement_ ){

		this.drawerButtonElement_ = goog.dom.getElementByClass( zz.ui.mdl.Navigation.CSS.DRAWER_BTN, element );
		if( !this.drawerButtonElement_ ) {

			this.createDrawerButtonDom_( );
		}
		if( goog.dom.classlist.contains( this.drawerElement_, zz.ui.mdl.Navigation.CSS.ON_LARGE_SCREEN ) ){

			//If drawer has ON_LARGE_SCREEN class then add it to the drawer toggle button as well.
			goog.dom.classlist.add( this.drawerButtonElement_, zz.ui.mdl.Navigation.CSS.ON_LARGE_SCREEN );

		}else if( goog.dom.classlist.contains( this.drawerElement_, zz.ui.mdl.Navigation.CSS.ON_SMALL_SCREEN ) ){

			//If drawer has ON_SMALL_SCREEN class then add it to the drawer toggle button as well.
			goog.dom.classlist.add( this.drawerButtonElement_, zz.ui.mdl.Navigation.CSS.ON_SMALL_SCREEN );
		}
		goog.dom.classlist.add( element, zz.ui.mdl.Navigation.CSS.HAS_DRAWER );

		if( goog.dom.classlist.contains( element, zz.ui.mdl.Navigation.CSS.FIXED_HEADER ) ){

			goog.dom.insertChildAt( this.headerElement_, this.drawerButtonElement_, 0 );

		}else{

			goog.dom.insertChildAt( element, this.drawerButtonElement_, 0 );
		}
		this.createObfuscatorDom_( );
		goog.dom.appendChild( element, this.obfuscatorElement_ );
		this.setStyleOnResize( element );
	}

	// Patch tabs
	if( this.headerElement_ && this.tabBarElement_ ){

		goog.dom.classlist.add( element, zz.ui.mdl.Navigation.CSS.HAS_TABS );
		this.createTabBarDom_( );
	}

	// Final changes
	goog.dom.classlist.add( element, zz.ui.mdl.Navigation.CSS.IS_UPGRADED );
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.Navigation.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	if( this.mode_ === zz.ui.mdl.Navigation.MODE.WATERFALL ){

		this.getHandler( ).listenWithScope(

			this.headerElement_,
			goog.events.EventType.MOUSEUP,
			this.headerClickListener_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.headerElement_,
			goog.events.EventType.TRANSITIONEND,
			this.headerTransitionEndListener_,
			false,
			this
		);
		// Add and remove shadows depending on scroll position.
		// Also add/remove auxiliary class for styling of the compact version of the header.
		this.getHandler( ).listenWithScope(

			this.bodyElement_,
			goog.events.EventType.SCROLL,
			this.bodyScrollListener_,
			false,
			this
		);
	}
	this.getHandler( ).listenWithScope(

		this.drawerButtonElement_,
		goog.events.EventType.MOUSEUP,
		this.drawerToggleListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.obfuscatorElement_,
		goog.events.EventType.MOUSEUP,
		this.drawerToggleListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.getDomHelper( ).getWindow( ),
		goog.events.EventType.RESIZE,
		this.windowResizeListener_,
		false,
		this
	);
	if( this.headerElement_ && this.tabBarElement_ ){

		this.getHandler( ).listenWithScope(

			this.tabBarLeftButtonElement_,
			goog.events.EventType.MOUSEUP,
			this.tabBarLeftButtonClickListener_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.tabBarRightButtonElement_,
			goog.events.EventType.MOUSEUP,
			this.tabBarRightButtonClickListener_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.tabBarElement_,
			goog.events.EventType.SCROLL,
			this.tabBarScrollListener_,
			false,
			this
		);
		goog.array.forEach( this.tabsElements_, function( tab ){

			this.getHandler( ).listenWithScope(

				tab,
				goog.events.EventType.MOUSEUP,
				/** @this {zz.ui.mdl.Navigation} */
				function( evt ){

					evt.preventDefault( );

					var href = tab.href.split( '#' )[ 1 ];
					var panel = goog.dom.getElement( href );

					//noinspection JSPotentiallyInvalidUsageOfThis
					this.resetTabState( this.tabsElements_ );

					//noinspection JSPotentiallyInvalidUsageOfThis
					this.resetPanelState( this.panelsElements_ );

					//noinspection JSPotentiallyInvalidUsageOfThis
					this.setTabActive( tab );

					//noinspection JSPotentiallyInvalidUsageOfThis
					this.setPanelActive( panel );
				},
				false,
				this
			);
		}, this );
	}
	this.ripples = [ ];
	goog.array.forEach(

		goog.dom.getElementsByClass( zz.ui.mdl.Navigation.CSS.RIPPLE_CONTAINER ),
		function( ripple ){

			this.ripples.push( new zz.ui.mdl.Ripple( ) );
			this.addChild( this.ripples[ this.ripples.length - 1 ], false );
			this.ripples[ this.ripples.length - 1 ].decorate( ripple );

		}, this );
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.mdl.Navigation.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );
	this.getHandler( ).dispose( );
	this.headerElement_ = null;
	this.drawerElement_ = null;
	this.drawerButtonElement_ = null;
	this.tabBarElement_ = null;
	this.tabBarLeftButtonElement_ = null;
	this.tabBarRightButtonElement_ = null;
	this.tabsElements_ = null;
	this.panelsElements_ = null;
	this.bodyElement_ = null;
	this.obfuscatorElement_ = null;
	goog.array.forEach( this.ripples, function( ripple ){

		ripple.dispose( );
	} );
	this.ripples = [ ];
};

/**********************************************************************************************************************
 * Data-model section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Set navigation mode.
 * @param {number} mode
 */
zz.ui.mdl.Navigation.prototype.setMode = function( mode ){

	/**
	 * Navigation mode.
	 * @type {number}
	 * @private
	 */
	this.mode_ = mode;
};

/**
 * Return navigation mode.
 * @returns {number}
 */
zz.ui.mdl.Navigation.prototype.getMode = function( ){

	return this.mode_;
};

/**
 * Set layout navigation title.
 * @param {goog.ui.ControlContent} title
 */
zz.ui.mdl.Navigation.prototype.setTitle = function( title ){

	this.title_ = title;
};

/**
 * Return layout navigation title.
 * @returns {string}
 */
zz.ui.mdl.Navigation.prototype.getTitle = function( ){

	return this.title_;
};

/**********************************************************************************************************************
 * Create DOM-elements methods                                                                                        *
 **********************************************************************************************************************/

/**
* Create layout drawer button DOM.
* @private
*/
zz.ui.mdl.Navigation.prototype.createDrawerButtonDom_ = function( ){

	this.drawerButtonElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Navigation.CSS.DRAWER_BTN

	}, this.getDomHelper( ).createDom( goog.dom.TagName.I, {

		'class': zz.ui.mdl.Navigation.CSS.ICON

	}, zz.ui.mdl.Navigation.CONST.MENU_ICON ) );
};

/**
* Create layout body DOM.
* @private
*/
zz.ui.mdl.Navigation.prototype.createObfuscatorDom_ = function( ){

	this.obfuscatorElement_ = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Navigation.CSS.OBFUSCATOR
	} );
};

/**
* Create layout tab-bar section DOM.
* @private
*/
zz.ui.mdl.Navigation.prototype.createTabBarDom_ = function( ){

	var container = this.getDomHelper( ).createDom( goog.dom.TagName.DIV, {

		'class': zz.ui.mdl.Navigation.CSS.TAB_CONTAINER

	} );
	goog.dom.insertSiblingBefore( container, this.tabBarElement_ );
	this.tabBarLeftButtonElement_ = this.getDomHelper( )

		.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Navigation.CSS.TAB_BAR_BUTTON + ' ' +
				zz.ui.mdl.Navigation.CSS.TAB_BAR_LEFT_BUTTON

		}, this.getDomHelper( ).createDom( goog.dom.TagName.I, {

			'class': zz.ui.mdl.Navigation.CSS.ICON

		}, zz.ui.mdl.Navigation.CONST.CHEVRON_LEFT ) );

	this.tabBarRightButtonElement_ = this.getDomHelper( )

		.createDom( goog.dom.TagName.DIV, {

			'class': zz.ui.mdl.Navigation.CSS.TAB_BAR_BUTTON + ' ' +
				zz.ui.mdl.Navigation.CSS.TAB_BAR_RIGHT_BUTTON

		}, this.getDomHelper( ).createDom( goog.dom.TagName.I, {

			'class': zz.ui.mdl.Navigation.CSS.ICON

		}, zz.ui.mdl.Navigation.CONST.CHEVRON_RIGHT ) );

	goog.dom.appendChild( container, this.tabBarLeftButtonElement_ );
	goog.dom.appendChild( container, this.tabBarElement_ );
	goog.dom.appendChild( container, this.tabBarRightButtonElement_ );
	if( goog.dom.classlist.contains( this.tabBarElement_, zz.ui.mdl.Navigation.CSS.JS_RIPPLE_EFFECT ) ){

		goog.dom.classlist.add( this.tabBarElement_, zz.ui.mdl.Navigation.CSS.RIPPLE_IGNORE_EVENTS );
	}
	this.setStyleOnTabScroll( );

	// Select element tabs
	this.tabsElements_ = goog.dom.getElementsByClass( zz.ui.mdl.Navigation.CSS.TAB, this.tabBarElement_ );

	// Select document panels
	this.panelsElements_ = goog.dom.getElementsByClass( zz.ui.mdl.Navigation.CSS.PANEL, this.tabBarElement_ );

	// Create new tabs for each tab element
	goog.array.forEach( this.tabsElements_, function( tab ){

		if( goog.dom.classlist.contains( this.tabBarElement_, zz.ui.mdl.Navigation.CSS.JS_RIPPLE_EFFECT ) ){

			goog.dom.appendChild( tab, this.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

				'class': zz.ui.mdl.Navigation.CSS.RIPPLE_CONTAINER + ' ' +
					zz.ui.mdl.Navigation.CSS.JS_RIPPLE_EFFECT

			}, this.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

				'class': zz.ui.mdl.Navigation.CSS.RIPPLE
			} ) ) );
		}
	}, this );
};

/**********************************************************************************************************************
 * Event listeners section                                                                                            *
 **********************************************************************************************************************/

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.headerClickListener_ = function( ){

	this.setStyleOnHeaderClick( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.headerTransitionEndListener_ = function( ){

	this.setStyleOnHeaderTransitionEnd( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.drawerToggleListener_ = function( ){

	this.setStyleOnDrawerToggle( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.bodyScrollListener_ = function( ){

	this.setStyleOnScroll( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.windowResizeListener_ = function( ){

	this.setStyleOnResize( goog.dom.getChildren( this.getElement( ) )[ 0 ] );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.tabBarLeftButtonClickListener_ = function( ){

	this.setStyleOnTabBarLeftButtonClick( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.tabBarRightButtonClickListener_ = function( ){

	this.setStyleOnTabBarRightButtonClick( );
};

/**
 * @this {zz.ui.mdl.Navigation}
 * @private
 */
zz.ui.mdl.Navigation.prototype.tabBarScrollListener_ = function( ){

	this.setStyleOnTabScroll( );
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.mdl.Navigation.prototype.getCssClass = function( ){

	return zz.ui.mdl.Navigation.CSS_CLASS;
};

/**
 * Update styles on window resize event.
 * @param {Element} element
 */
zz.ui.mdl.Navigation.prototype.setStyleOnResize = function( element ){

	//noinspection JSUnresolvedVariable
	if( this.getDomHelper( ).getWindow( ).innerWidth <= zz.ui.mdl.Navigation.CONST.MAX_WIDTH ){

		goog.dom.classlist.add( element, zz.ui.mdl.Navigation.CSS.IS_SMALL_SCREEN );

	}else{

		goog.dom.classlist.remove( element, zz.ui.mdl.Navigation.CSS.IS_SMALL_SCREEN );

		// Collapse drawer (if any) when moving to a large screen size.
		if( this.drawerElement_ ){

			goog.dom.classlist.remove( this.drawerElement_, zz.ui.mdl.Navigation.CSS.IS_DRAWER_OPEN );
			goog.dom.classlist.remove( this.obfuscatorElement_, zz.ui.mdl.Navigation.CSS.IS_DRAWER_OPEN );
		}
	}
};

/**
 * Update on scroll event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnScroll = function( ){

	if( goog.dom.classlist.contains( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_ANIMATING ) ){

		return;
	}
	if( this.bodyElement_.scrollTop > 0 &&
		!goog.dom.classlist.contains( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT ) ){

		goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
		goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT );
		goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_ANIMATING );

	}else if( this.bodyElement_.scrollTop <= 0 && goog.dom.classlist.contains(
		this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove( this.headerElement_, zz.ui.mdl.Navigation.CSS.CASTING_SHADOW );
		goog.dom.classlist.remove( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT );
		goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_ANIMATING );
	}
};

/**
 * Update style on tab scroll event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnTabScroll = function( ){

	if( this.tabBarElement_.scrollLeft > 0 ){

		goog.dom.classlist.add( this.tabBarLeftButtonElement_, zz.ui.mdl.Navigation.CSS.IS_ACTIVE );

	}else{

		goog.dom.classlist.remove( this.tabBarLeftButtonElement_, zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
	}
	if( this.tabBarElement_.scrollLeft < this.tabBarElement_.scrollWidth - this.tabBarElement_.offsetWidth ){

		goog.dom.classlist.add( this.tabBarRightButtonElement_, zz.ui.mdl.Navigation.CSS.IS_ACTIVE );

	}else{

		goog.dom.classlist.remove( this.tabBarRightButtonElement_, zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
	}
};

/**
 * Update style on header transition end event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnHeaderTransitionEnd = function( ){

	goog.dom.classlist.remove( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_ANIMATING );
};

/**
 * Update style on header click event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnHeaderClick = function( ){

	if( goog.dom.classlist.contains( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_COMPACT );
		goog.dom.classlist.add( this.headerElement_, zz.ui.mdl.Navigation.CSS.IS_ANIMATING );
	}
};

/**
 * Update style on drawer toggle event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnDrawerToggle = function( ){

	goog.dom.classlist.toggle( this.drawerElement_, zz.ui.mdl.Navigation.CSS.IS_DRAWER_OPEN );
	goog.dom.classlist.toggle( this.obfuscatorElement_, zz.ui.mdl.Navigation.CSS.IS_DRAWER_OPEN );
};

/**
 * Update style on tab-bar left button click event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnTabBarLeftButtonClick = function( ){

	this.tabBarElement_.scrollLeft -= zz.ui.mdl.Navigation.CONST.TAB_SCROLL_PIXELS;
};

/**
 * Update style on tab-bar right button click event.
 */
zz.ui.mdl.Navigation.prototype.setStyleOnTabBarRightButtonClick = function( ){

	this.tabBarElement_.scrollLeft += zz.ui.mdl.Navigation.CONST.TAB_SCROLL_PIXELS;
};

/**
 * Set tab active
 * @param {Element} tab
 */
zz.ui.mdl.Navigation.prototype.setTabActive = function( tab ){

	goog.dom.classlist.add(

		tab,
		zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
};

/**
 * Set panel active
 * @param {Element} panel
 */
zz.ui.mdl.Navigation.prototype.setPanelActive = function( panel ){

	goog.dom.classlist.add(

		panel,
		zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
};

/**
 * Reset tab state, dropping active classes
 * @param {Array} tabBar
 */
zz.ui.mdl.Navigation.prototype.resetTabState = function( tabBar ){

	for(var i = 0; i < tabBar.length; i++ ){

		goog.dom.classlist.remove(

			tabBar[ i ],
			zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
	}
};

/**
 * Reset panel state, dropping active classes
 * @param {Array} panels
 */
zz.ui.mdl.Navigation.prototype.resetPanelState = function( panels ){

	for( var i = 0; i < panels.length; i++){

		goog.dom.classlist.remove(

			panels[ i ],
			zz.ui.mdl.Navigation.CSS.IS_ACTIVE );
	}
};
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
 * @fileoverview Provide zz.ui.layout.Navigation class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.layout.NavigationCtrl' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.ui.Control' );
goog.require( 'goog.ui.Component' );
goog.require( 'goog.events.EventType' );
goog.require( 'zz.ui.layout.NavigationRenderer' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation layout class.
 * @param {goog.ui.ControlContent=} opt_title Text caption or DOM structure to display as the title of the layout.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the layout.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.layout.NavigationCtrl = function( opt_title, opt_renderer, opt_domHelper ){

	goog.ui.Control.call(

		this,
		opt_title,
		opt_renderer || zz.ui.layout.NavigationRenderer.getInstance( ),
		opt_domHelper );

	// Enabling user select mode for layout.
	this.setAllowTextSelection( true );

	// Disabling mouse handling for layout.
	this.setHandleMouseEvents( false );

	// Disabling focus handling for layout.
	this.setSupportedState( goog.ui.Component.State.FOCUSED, false );
};
goog.inherits( zz.ui.layout.NavigationCtrl, goog.ui.Control );
goog.tagUnsealableClass( zz.ui.layout.NavigationCtrl );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Navigation mode.
 * @type {number}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.mode_ = zz.ui.layout.NavigationRenderer.MODE.STANDARD;

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.layout.NavigationCtrl.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	if( this.mode_ === zz.ui.layout.NavigationRenderer.MODE.WATERFALL ){

		this.getHandler( ).listenWithScope(

			this.headerElement_,
			goog.events.EventType.CLICK,
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
		goog.events.EventType.CLICK,
		this.drawerToggleListener_,
		false,
		this
	);
	this.getHandler( ).listenWithScope(

		this.obfuscatorElement_,
		goog.events.EventType.CLICK,
		this.drawerToggleListener_,
		false,
		this
	);
	// TODO (buntarb): Originally used window.matchMedia and MediaQueryList listener, not implemented in GCL.
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
			goog.events.EventType.CLICK,
			this.tabBarLeftButtonClickListener_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.tabBarRightButtonElement_,
			goog.events.EventType.CLICK,
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
		goog.array.forEach( this.getTabsElements( ), function( tab ){

			this.getHandler( ).listenWithScope(

				tab,
				goog.events.EventType.CLICK,
				/** @this {zz.ui.layout.NavigationCtrl} */
				function( evt ){

					evt.preventDefault( );

					var href = tab.href.split( '#' )[ 1 ];
					var panel = goog.dom.getElement( href );
					this.getRenderer( ).resetTabState( this.tabsElements_ );
					this.getRenderer( ).resetPanelState( this.panelsElements_ );
					this.getRenderer( ).setTabActive( tab );
					this.getRenderer( ).setPanelActive( panel );
				},
				false,
				this
			);
		}, this );
	}
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @inheritDoc
 **/
zz.ui.layout.NavigationCtrl.prototype.disposeInternal = function( ){

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
};

/**********************************************************************************************************************
 * Data-model section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Set navigation mode.
 * @param {number} mode
 */
zz.ui.layout.NavigationCtrl.prototype.setMode = function( mode ){

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
zz.ui.layout.NavigationCtrl.prototype.getMode = function( ){

	return this.mode_;
};

/**
 * Return navigation list.
 * @returns {Array.<Object>}
 */
zz.ui.layout.NavigationCtrl.prototype.getList = function( ){

	return [ {

		name: 'Link1',
		href: '#/link1'
	},{
		name: 'Link2',
		href: '#/link2'
	},{
		name: 'Link3',
		href: '#/link3'
	},{
		name: 'Link4',
		href: '#/link4'
	} ];
};

/**********************************************************************************************************************
 * Event listeners section                                                                                            *
 **********************************************************************************************************************/

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.headerClickListener_ = function( ){

	this.getRenderer( ).setStyleOnHeaderClick( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.headerTransitionEndListener_ = function( ){

	this.getRenderer( ).setStyleOnHeaderTransitionEnd( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.drawerToggleListener_ = function( ){

	this.getRenderer( ).setStyleOnDrawerToggle( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.bodyScrollListener_ = function( ){

	this.getRenderer( ).setStyleOnScroll( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.windowResizeListener_ = function( ){

	this.getRenderer( ).setStyleOnResize( this, goog.dom.getChildren( this.getElement( ) )[ 0 ] );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.tabBarLeftButtonClickListener_ = function( ){

	this.getRenderer( ).setStyleOnTabBarLeftButtonClick( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.tabBarRightButtonClickListener_ = function( ){

	this.getRenderer( ).setStyleOnTabBarRightButtonClick( this );
};

/**
 * @this {zz.ui.layout.NavigationCtrl}
 * @private
 */
zz.ui.layout.NavigationCtrl.prototype.tabBarScrollListener_ = function( ){

	this.getRenderer( ).setStyleOnTabScroll( this );
};

/**********************************************************************************************************************
 * Elements access section                                                                                            *
 **********************************************************************************************************************/

/**
 * Set layout header element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setHeaderElement = function( element ){

	/**
	 * Layout header element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.headerElement_ = element;
};

/**
 * Return layout header element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getHeaderElement = function( ){

	return this.headerElement_;
};

/**
 * Set layout drawer element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setDrawerElement = function( element ){

	/**
	 * Layout drawer element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.drawerElement_ = element;
};

/**
 * Return layout drawer element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getDrawerElement = function( ){

	return this.drawerElement_;
};

/**
 * Set layout drawer button element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setDrawerButtonElement = function( element ){

	/**
	 * Layout drawer button element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.drawerButtonElement_ = element;
};

/**
 * Return layout drawer button element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getDrawerButtonElement = function( ){

	return this.drawerButtonElement_;
};

/**
 * Set layout tab-bar element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setTabBarElement = function( element ){

	/**
	 * Layout tab-bar element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.tabBarElement_ = element;
};

/**
 * Return layout tab-bar element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getTabBarElement = function( ){

	return this.tabBarElement_;
};

/**
 * Set layout tab-bar left button element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setTabBarLeftButtonElement = function( element ){

	/**
	 * Layout tab-bar left button element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.tabBarLeftButtonElement_ = element;
};

/**
 * Return layout tab-bar left button element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getTabBarLeftButtonElement = function( ){

	return this.tabBarLeftButtonElement_;
};

/**
 * Set layout tabs elements.
 * @param {Array} elements
 */
zz.ui.layout.NavigationCtrl.prototype.setTabsElements = function( elements ){

	/**
	 * Layout tabs elements.
	 * @type {Array}
	 * @private
	 */
	this.tabsElements_ = elements;
};

/**
 * Return layout tabs elements.
 * @returns {Array}
 */
zz.ui.layout.NavigationCtrl.prototype.getTabsElements = function( ){

	return this.tabsElements_;
};

/**
 * Set layout panels elements.
 * @param {Array} elements
 */
zz.ui.layout.NavigationCtrl.prototype.setPanelsElements = function( elements ){

	/**
	 * Layout panels elements.
	 * @type {Array}
	 * @private
	 */
	this.panelsElements_ = elements;
};

/**
 * Return layout panels elements.
 * @returns {Array}
 */
zz.ui.layout.NavigationCtrl.prototype.getPanelsElements = function( ){

	return this.panelsElements_;
};

/**
 * Set layout tab-bar right button element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setTabBarRightButtonElement = function( element ){

	/**
	 * Layout tab-bar right button element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.tabBarRightButtonElement_ = element;
};

/**
 * Return layout tab-bar right button element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getTabBarRightButtonElement = function( ){

	return this.tabBarRightButtonElement_;
};

/**
 * Set layout body element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setBodyElement = function( element ){

	/**
	 * Layout body element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.bodyElement_ = element;
};

/**
 * Return layout body element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getBodyElement = function( ){

	return this.bodyElement_;
};

/**
 * Set layout obfuscator element.
 * @param {HTMLElement} element
 */
zz.ui.layout.NavigationCtrl.prototype.setObfuscatorElement = function( element ){

	/**
	 * Layout obfuscator element.
	 * @type {HTMLElement}
	 * @private
	 */
	this.obfuscatorElement_ = element;
};

/**
 * Return layout obfuscator element.
 * @returns {HTMLElement}
 */
zz.ui.layout.NavigationCtrl.prototype.getObfuscatorElement = function( ){

	return this.obfuscatorElement_;
};
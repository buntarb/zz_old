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
 * @fileoverview Provide zz.ui.layout.NavigationTransparentHeaderRenderer class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.layout.NavigationTransparentHeaderRenderer' );

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
zz.ui.layout.NavigationTransparentHeaderRenderer = function( ){

	zz.ui.CheckboxRenderer.base( this, 'constructor' );
};
goog.inherits( zz.ui.layout.NavigationTransparentHeaderRenderer, goog.ui.ControlRenderer );
goog.tagUnsealableClass( zz.ui.layout.NavigationTransparentHeaderRenderer );
goog.addSingletonGetter( zz.ui.layout.NavigationTransparentHeaderRenderer );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.CONST = {

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
zz.ui.layout.NavigationTransparentHeaderRenderer.CSS = {

	CONTAINER: goog.getCssName( 'mdl-layout__container' ),
	HEADER: goog.getCssName( 'mdl-layout__header' ),
	DRAWER: goog.getCssName( 'mdl-layout__drawer' ),
	CONTENT: goog.getCssName( 'mdl-layout__content' ),
	DRAWER_BTN: goog.getCssName( 'mdl-layout__drawer-button' ),

	ICON: goog.getCssName( 'material-icons' ),

	JS_RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-layout__tab-ripple-container' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),

	HEADER_SEAMED: goog.getCssName( 'mdl-layout__header--seamed' ),
	HEADER_WATERFALL: goog.getCssName( 'mdl-layout__header--waterfall' ),
	HEADER_SCROLL: goog.getCssName( 'mdl-layout__header--scroll' ),

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
zz.ui.layout.NavigationTransparentHeaderRenderer.CSS_CLASS = goog.getCssName( 'zz-transparent-header' );

/**********************************************************************************************************************
 * Base renderer methods                                                                                              *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.getCssClass = function( ){

	return zz.ui.layout.NavigationTransparentHeaderRenderer.CSS_CLASS;
};

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/** @override */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.createDom = function( navigation ){

	var element = checkbox.getDomHelper( ).createDom( goog.dom.TagName.I );
	//goog.dom.classlist.addAll( element, [
    //
	//	this.getCssClass( ),
	//	goog.getCssName( 'icon' ),
	//	goog.getCssName( 'check' ),
	//	goog.getCssName( 'width-5un' ),
	//	goog.getCssName( 'height-5un' ),
	//	goog.getCssName( 'line-height-3un' ),
	//	goog.getCssName( 'padding-top-1un' ),
	//	goog.getCssName( 'padding-right-1un' ),
	//	goog.getCssName( 'padding-bottom-1un' ),
	//	goog.getCssName( 'padding-left-1un' ),
	//	goog.getCssName( 'font-size-normal' )
	//] );
	////noinspection JSUnresolvedFunction
	//var state = checkbox.getChecked( );
	//this.setCheckboxState( element, state );
	return element;
};

/** @override */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.decorate = function( navigation, element ){

	// The superclass implementation takes care of common attributes; we only need to set the checkbox state.
	//element = zz.ui.CheckboxRenderer.base( this, 'decorate', checkbox, element );
	//goog.asserts.assert( element );
	//var classes = goog.dom.classlist.get( element );
    //
	//// Update the checked state of the element based on its css classNames with the following order:
	//// undetermined -> checked -> unchecked.
    //
	//var checked = /** @suppress {missingRequire} */ ( goog.ui.Checkbox.State.UNCHECKED );
	//if( goog.array.contains( classes,
	//	this.getClassForCheckboxState( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.UNDETERMINED ) ) ){
    //
	//	checked = ( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.UNDETERMINED );
    //
	//}else if( goog.array.contains( classes,
	//	this.getClassForCheckboxState( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.CHECKED ) ) ){
    //
	//	checked = ( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.CHECKED );
    //
	//}else if( goog.array.contains( classes,
	//	this.getClassForCheckboxState( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.UNCHECKED ) ) ){
    //
	//	checked = ( /** @suppress {missingRequire} */ goog.ui.Checkbox.State.UNCHECKED );
	//}
	////noinspection JSUnresolvedFunction
	//checkbox.setCheckedInternal( checked );
	////noinspection JSCheckFunctionSignatures
	//goog.asserts.assert( element, 'The element cannot be null.' );
	//goog.a11y.aria.setState( element, goog.a11y.aria.State.CHECKED, this.ariaStateFromCheckState_( checked ) );
	return element;
};

/**********************************************************************************************************************
 * Methods                                                                                                            *
 **********************************************************************************************************************/

/**
 * Update layout root element style.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.updateRootStyle = function( navigation ){

	var element = navigation.getElement( );
	var drawer = navigation.getDrawerElement( );
	var obfuscator = navigation.getObfuscatorElement( );
	if( navigation.getDomHelper( ).getWindow( ).innerWidth <=
		zz.ui.layout.NavigationTransparentHeaderRenderer.CONST.MAX_WIDTH ){

		goog.dom.classlist.add(

			element,
			zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_SMALL_SCREEN );

	}else{

		goog.dom.classlist.remove(

			element,
			zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_SMALL_SCREEN );

		// Collapse drawer (if any) when moving to a large screen size.
		if( drawer ){

			goog.dom.classlist.remove(

				drawer,
				zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_DRAWER_OPEN );

			goog.dom.classlist.remove(

				obfuscator,
				zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_DRAWER_OPEN );
		}
	}
};

/**
 * Update layout header style.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.updateHeaderStyle = function( navigation ){

	var header = navigation.getHeaderElement( );
	var content = navigation.getContentElement( );
	if( goog.dom.classlist.contains( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_ANIMATING ) ){

		return;
	}
	if( content.scrollTop > 0 &&
		!goog.dom.classlist.contains( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.CASTING_SHADOW );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_COMPACT );

		goog.dom.classlist.add(

			header,
			zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_ANIMATING );

	}else if( content.scrollTop <= 0 &&
		goog.dom.classlist.contains( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_COMPACT ) ){

		goog.dom.classlist.remove( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.CASTING_SHADOW );
		goog.dom.classlist.remove( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_COMPACT );
		goog.dom.classlist.add( header, zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_ANIMATING );
	}
};

/**
 * Toggle drawer style.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.toggleDrawerStyle = function( navigation ){

	var drawer = navigation.getDrawerElement( );
	var obfuscator = navigation.getObfuscatorElement( );
	goog.dom.classlist.toggle(

		drawer,
		zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_DRAWER_OPEN );

	goog.dom.classlist.toggle(

		obfuscator,
		zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_DRAWER_OPEN );
};

/**
 * Remove transition style from layout header.
 * @param {zz.ui.layout.Navigation} navigation
 */
zz.ui.layout.NavigationTransparentHeaderRenderer.prototype.removeHeaderTransitionStyle = function( navigation ){

	var header = navigation.getHeaderElement( );
	goog.dom.classlist.remove(

		header,
		zz.ui.layout.NavigationTransparentHeaderRenderer.CSS.IS_ANIMATING );
};
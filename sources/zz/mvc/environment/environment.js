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
 * @fileoverview Provide zz.mvc.Environment class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.Environment' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events');
goog.require( 'goog.labs.userAgent.browser' );
goog.require( 'goog.labs.userAgent.device' );
goog.require( 'goog.labs.userAgent.engine' );
goog.require( 'goog.labs.userAgent.platform' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Environment class.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.mvc.Environment = function( ){

	goog.base( this );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.Environment, goog.events.EventTarget );
goog.addSingletonGetter( zz.mvc.Environment );

/**********************************************************************************************************************
 * Mode                                                                                                               *
 **********************************************************************************************************************/

/**
 * The set of methods that returns info about application running mode.
 * @type {Object}
 */
zz.mvc.Environment.prototype.mode = { };

/**
 * Determine is current application running in Cordova/PhoneGAP mode.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.mode.isCordova = function( ){

	return !!goog.global[ 'cordova' ];
};

// TODO: Node.js!!!

/**
 * Determine is current application running in browser mode.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.mode.isBrowser = function( ){

	return !goog.global[ 'cordova' ];
};

/**********************************************************************************************************************
 * Device                                                                                                             *
 **********************************************************************************************************************/

/**
 * The set of methods that returns info about current device.
 * @type {Object}
 */
zz.mvc.Environment.prototype.device = { };

/**
 * Determine is current device touchable or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isTouchable = function( ){

	return ( 'on' + goog.events.EventType.TOUCHSTART ) in goog.global;
};

/**
 * Determine is current device desktop or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isDesktop = function( ){

	return goog.labs.userAgent.device.isDesktop( );
};

/**
 * Determine is current device tablet or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isTablet = function( ){

	return goog.labs.userAgent.device.isTablet( );
};

/**
 * Determine is current device mobile or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isMobile = function( ){

	return goog.labs.userAgent.device.isMobile( );
};

/**
 * Determine is current device iPad or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isIpad = function( ){

	return goog.labs.userAgent.platform.isIpad( );
};

/**
 * Determine is current device iPhone or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isIphone = function( ){

	return goog.labs.userAgent.platform.isIphone( );
};

/**
 * Determine is current device iPod or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.device.isIpod = function( ){

	return goog.labs.userAgent.platform.isIpod( );
};

/**********************************************************************************************************************
 * OS                                                                                                                 *
 **********************************************************************************************************************/

/**
 * The set of methods that returns info about current OS.
 * @type {Object}
 */
zz.mvc.Environment.prototype.os = { };

/**
 * Determine is current OS Android or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isAndroid = function( ){

	return goog.labs.userAgent.platform.isAndroid( );
};

/**
 * Determine is current OS Chrome or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isChrome = function( ){

	return goog.labs.userAgent.platform.isChromeOS( );
};

/**
 * Determine is current OS iOS or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isIOS = function( ){

	return goog.labs.userAgent.platform.isIos( );
};

/**
 * Determine is current OS Linux or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isLinux = function( ){

	return goog.labs.userAgent.platform.isLinux( );
};

/**
 * Determine is current OS Macintosh or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isMacintosh = function( ){

	return goog.labs.userAgent.platform.isMacintosh( );
};

/**
 * Determine is current OS Windows or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.os.isWindows = function( ){

	return goog.labs.userAgent.platform.isWindows( );
};

/**********************************************************************************************************************
 * Engine                                                                                                             *
 **********************************************************************************************************************/

/**
 * The set of methods that returns info about current browser engine.
 * @type {Object}
 */
zz.mvc.Environment.prototype.engine = { };

/**
 * Determine is current engine Gecko or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.engine.isGecko = function( ){

	return goog.labs.userAgent.engine.isGecko( );
};

/**
 * Determine is current engine Presto or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.engine.isPresto = function( ){

	return goog.labs.userAgent.engine.isPresto( );
};

/**
 * Determine is current engine Trident or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.engine.isTrident = function( ){

	return goog.labs.userAgent.engine.isTrident( );
};

/**
 * Determine is current engine WebKit or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.engine.isWebKit = function( ){

	return goog.labs.userAgent.engine.isWebKit( );
};

/**********************************************************************************************************************
 * Browser                                                                                                            *
 **********************************************************************************************************************/

/**
 * The set of methods that returns info about current browser.
 * @type {Object}
 */
zz.mvc.Environment.prototype.browser = { };

/**
 * Determine is current browser Android or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isAndroid = function( ){

	return goog.labs.userAgent.browser.isAndroidBrowser( );
};

/**
 * Determine is current browser Chrome or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isChrome = function( ){

	return goog.labs.userAgent.browser.isChrome( );
};

/**
 * Determine is current browser Coast or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isCoast = function( ){

	return goog.labs.userAgent.browser.isCoast( );
};

/**
 * Determine is current browser Firefox or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isFirefox = function( ){

	return goog.labs.userAgent.browser.isFirefox( );
};

/**
 * Determine is current browser IE or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isIE = function( ){

	return goog.labs.userAgent.browser.isIE( );
};

/**
 * Determine is current browser IosWebview or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isIosWebview = function( ){

	return goog.labs.userAgent.browser.isIosWebview( );
};

/**
 * Determine is current browser Opera or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isOpera = function( ){

	return goog.labs.userAgent.browser.isOpera( );
};

/**
 * Determine is current browser Safari or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isSafari = function( ){

	return goog.labs.userAgent.browser.isSafari( );
};

/**
 * Determine is current browser Silk or not.
 * @returns {boolean}
 */
zz.mvc.Environment.prototype.browser.isSilk = function( ){

	return goog.labs.userAgent.browser.isSilk( );
};
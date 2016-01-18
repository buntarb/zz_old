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
 * @fileoverview Provide zz.mvc.application.Router class (based on PlastronJS router).
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.mvc.application.Router' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.events');
goog.require( 'goog.History' );
goog.require( 'goog.history.Html5History' );
goog.require( 'zz.mvc.application.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Router class.
 * @param {boolean=} opt_noFragment Set to true to hide fragment when using HTML5 history.
 * @param {string=} opt_blankPage URL to a blank page - needed if HTML5 is not available with hiding fragment.
 * @param {HTMLInputElement=} opt_input The hidden input element to be used to store the history token.
 * @param {HTMLIFrameElement=} opt_iframe The hidden iframe that will be used for pushing history state changes.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.mvc.application.Router = function( opt_noFragment, opt_blankPage, opt_input, opt_iframe ){

	goog.base( this );

	/******************************************************************************************************************
	 * Private properties                                                                                             *
	 ******************************************************************************************************************/

	/**
	 * Routes settings.
	 * @type {Array}
	 * @private
	 */
	this.routes_ = [ ];

	/**
	 * Default url fragment.
	 * @type {string}
	 * @private
	 */
	this.defaultFragment_ = '';

	/**
	 * Current url fragment.
	 * @type {string}
	 * @private
	 */
	this.currentFragment_ = '';

	/**
	 * History event target object.
	 * @type {goog.history.Html5History|goog.History}
	 * @private
	 */
	this.history_ = goog.history.Html5History.isSupported( ) ?

		new goog.history.Html5History( ) :
		new goog.History( !!( opt_blankPage && opt_noFragment ), opt_blankPage, opt_input, opt_iframe );

	/******************************************************************************************************************
	 * Setting up history object                                                                                      *
	 ******************************************************************************************************************/

	if( this.history_.setUseFragment ){

		this.history_.setUseFragment( !opt_noFragment );
	}
	this.history_.setEnabled( true );

	/******************************************************************************************************************
	 * Setting up listener                                                                                            *
	 ******************************************************************************************************************/

	goog.events.listen(

		this.history_,
		goog.history.EventType.NAVIGATE,
		this.onChange_,
		false,
		this
	);
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.application.Router, goog.events.EventTarget );
goog.addSingletonGetter( zz.mvc.application.Router );

/**********************************************************************************************************************
 * Prototype methods section                                                                                          *
 **********************************************************************************************************************/

/**
 * Run route callback if route regexp matches fragment.
 * @param {Object} route
 * @param {string} fragment
 * @returns {boolean}
 * @private
 */
zz.mvc.application.Router.prototype.runRouteIfMatches_ = function( route, fragment ){

	var args = route.route.exec( fragment );
	if( args ){

		route.callback.apply( route.context, args );
		return true;
	}
	return false;
};

/**
 * History change events listener.
 * @private
 */
zz.mvc.application.Router.prototype.onChange_ = function( ){

	var fragment = this.history_.getToken( );
	if( fragment != this.currentFragment_ ){

		this.dispatchEvent( {

			type: zz.mvc.application.EventType.ROUTE_EXPIRED,
			previous: this.currentFragment_,
			current: fragment
		} );
		this.currentFragment_ = fragment;
		var isRouted = goog.array.find( this.routes_, function( route ){

			return this.runRouteIfMatches_( route, fragment );

		}, this );
		if( !isRouted ){

			this.setFragment( this.defaultFragment_ );
		}
	}
};

/**
 * Pass through the fragment for the URL.
 * @param {string} fragment
 */
zz.mvc.application.Router.prototype.setFragment = function( fragment ){

	this.history_.setToken( fragment );
};

/**
 * Returns current routed fragment.
 * @return {string}
 */
zz.mvc.application.Router.prototype.getFragment = function( ){

	return this.currentFragment_;
};

/**
 * Define route as string or regex.
 * @param {string|RegExp} route
 * @param {function(string, ...[string])} callback
 * @param {Object=} opt_context
 * @returns {zz.mvc.application.Router}
 */
zz.mvc.application.Router.prototype.when = function( route, callback, opt_context ){

	if( goog.isString( route ) )

		route = new RegExp( '^' + goog.string.regExpEscape( route )

			.replace( /\\:\w+/g, '([a-zA-Z0-9._-]+)' )
			.replace( /\\\*/g, '(.*)' )
			.replace( /\\\[/g, '(' )
			.replace( /\\\]/g, ')?' )
			.replace( /\\\{/g, '(?:' )
			.replace( /\\\}/g, ')?' ) + '$' );

	var completeRoute = {

		route: route,
		callback: callback,
		context: opt_context
	};
	this.routes_.push( completeRoute );
	return this;
};

/**
 * Fragment for default path.
 * @param {string} defaultFragment
 */
zz.mvc.application.Router.prototype.otherwise = function( defaultFragment ){

	this.defaultFragment_ = defaultFragment;
};

/**
 * Bootstrap router.
 */
zz.mvc.application.Router.prototype.bootstrap = function( ){

	var fragment = this.history_.getToken( );
	this.currentFragment_ = fragment;
	goog.array.find( this.routes_ || [ ], function( route ){

		return this.runRouteIfMatches_( route, fragment );

	}, this );
};
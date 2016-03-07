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
 * @fileoverview Provide zz.app.Router class (based on PlastronJS router).
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.app.Router' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.string' );
goog.require( 'goog.array' );
goog.require( 'goog.object' );
goog.require( 'goog.events');
goog.require( 'goog.events.EventTarget');
goog.require( 'goog.History' );
goog.require( 'goog.history.Html5History' );
goog.require( 'goog.history.EventType' );
goog.require( 'zz.events.Routed' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Router class.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.app.Router = function( ){

	goog.base( this );

	/******************************************************************************************************************
	 * Public properties                                                                                              *
	 ******************************************************************************************************************/

	/**
	 * Current route parameters.
	 * @type {Object}
	 */
	this.params = { };

	/******************************************************************************************************************
	 * Private properties                                                                                             *
	 ******************************************************************************************************************/

	/**
	 * Current layout.
	 * @type {zz.mvc.view.BaseView}
	 * @private
	 */
	this.layout_ = undefined;

	/**
	 * Current view.
	 * @type {zz.mvc.view.BaseView}
	 * @private
	 */
	this.view_ = undefined;

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
		new goog.History( );

	/******************************************************************************************************************
	 * Setting up history object                                                                                      *
	 ******************************************************************************************************************/

	if( this.history_.setUseFragment ){

		this.history_.setUseFragment( true );
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
goog.inherits( zz.app.Router, goog.events.EventTarget );
goog.addSingletonGetter( zz.app.Router );

/**********************************************************************************************************************
 * Static properties                                                                                                  *
 **********************************************************************************************************************/

/**
 * Layout parent element id.
 * @type {string}
 */
zz.app.Router.LAYOUT_ID = 'root';

/**
 * View parent element id.
 * @type {string}
 */
zz.app.Router.VIEW_ID = 'view';

/**********************************************************************************************************************
 * Prototype private methods section                                                                                  *
 **********************************************************************************************************************/

/**
 * Run route callback if route regexp matches fragment.
 * @param {Object} route
 * @param {string} fragment
 * @returns {boolean}
 * @private
 */
zz.app.Router.prototype.runRouteIfMatches_ = function( route, fragment ){

	// Clear params object.
	this.params = { };

	var args = route.route.exec( fragment );
	if( args ){

		// If route with params updating parameters object.
		if( route.params ){

			goog.array.forEach( route.params, function( param, index ){

				this.params[ param ] = args[ index + 1 ];

			}, this );
		}

		// If layout and view specified.
		if( route.layout && route.view ){

			// If view undefined or new view differ from current
			// disposing and deleting existing view.
			if( !this.view_ ||
				!goog.object.equals( this.view_, route.view ) ){

				if( this.view_ ){

					this.view_.dispose( );
					this.view_ = undefined;
					goog.dom.removeChildren( goog.dom.getElement( zz.app.Router.VIEW_ID ) );
				}

				// If layout undefined or new layout differ from current
				// disposing and deleting existing layout.
				if( !this.layout_ ||
					!goog.object.equals( this.layout_, route.layout ) ){

					if( this.layout_ ){

						this.layout_.dispose( );
						this.layout_ = undefined;
						goog.dom.removeChildren( goog.dom.getElement( zz.app.Router.LAYOUT_ID ) );
					}

					// Setting up layout.
					this.layout_ = route.layout;
					this.layout_.render( goog.dom.getElement( zz.app.Router.LAYOUT_ID ) );
				}

				// Setting up view.
				this.view_ = route.view;
				this.view_.render( goog.dom.getElement( zz.app.Router.VIEW_ID ) );
			}
		}
		route.callback.apply( route.context, args );
		return true;
	}
	return false;
};

/**
 * History change events listener.
 * @private
 */
zz.app.Router.prototype.onChange_ = function( ){

	var fragment = this.history_.getToken( );
	if( fragment !== this.currentFragment_ ){

		this.dispatchEvent( new zz.events.Routed( this.currentFragment_, fragment ) );
		this.currentFragment_ = fragment;
		var isRouted = goog.array.find( this.routes_, function( route ){

			return this.runRouteIfMatches_( route, fragment );

		}, this );
		if( !isRouted ){

			this.setFragment( this.defaultFragment_ );
		}
	}
};

/**********************************************************************************************************************
 * Prototype public methods section                                                                                   *
 **********************************************************************************************************************/

/**
 * Pass through the fragment for the URL.
 * @param {string} fragment
 */
zz.app.Router.prototype.setFragment = function( fragment ){

	this.history_.setToken( fragment );
};

/**
 * Returns current routed fragment.
 * @return {string}
 */
zz.app.Router.prototype.getFragment = function( ){

	return this.currentFragment_;
};

/**
 * Define route as string or regex.
 * @param {string|RegExp} route
 * @param {zz.mvc.view.BaseView} layout
 * @param {zz.mvc.view.BaseView} view
 * @param {function(string, ...[string])} callback
 * @param {Object=} opt_context
 * @returns {zz.app.Router}
 */
zz.app.Router.prototype.when = function( route, layout, view, callback, opt_context ){

	if( goog.isString( route ) ){

		var parsed = new RegExp( '^' + goog.string.regExpEscape( route )

			.replace( /\\:\w+/g, '([a-zA-Z0-9._-]+)' )
			.replace( /\\\*/g, '(.*)' )
			.replace( /\\\[/g, '(' )
			.replace( /\\\]/g, ')?' )
			.replace( /\\\{/g, '(?:' )
			.replace( /\\\}/g, ')?' ) + '$' );

		var paramsNames = route.match(/\:\w+/ig);
	}
	var completeRoute = {

		params: false,
		route: parsed,
		layout: layout,
		view: view,
		callback: callback,
		context: opt_context
	};
	if( paramsNames ){

		completeRoute.params = [ ];
		goog.array.forEach( paramsNames, function( name ){

			completeRoute.params.push( name.replace( ':', '' ) );
		} );
	}
	this.routes_.push( completeRoute );
	return this;
};

/**
 * Fragment for default path.
 * @param {string} defaultFragment
 * @returns {zz.app.Router}
 */
zz.app.Router.prototype.otherwise = function( defaultFragment ){

	this.defaultFragment_ = defaultFragment;
	return this;
};

/**
 * Bootstrap router.
 */
zz.app.Router.prototype.bootstrap = function( ){

	var fragment = this.history_.getToken( );
	this.currentFragment_ = fragment;
	goog.array.find( this.routes_ || [ ], function( route ){

		return this.runRouteIfMatches_( route, fragment );

	}, this );
};
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
 * @fileoverview Service for modal windows and popups.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.service.Popup' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.object' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Service for modal windows and popups.
 * @constructor
 */
zz.service.Popup = function( ){

	/**
	 * Stack of popups which must be closed by clicking on window document.
	 * @type {Object}
	 * @private
	 */
	this.closable_ = { };

	/**
	 * Service initialization.
	 */
	goog.events.listen( document, goog.events.EventType.CLICK, this.clickListener_, false, this );
};
goog.inherits( zz.service.Popup, goog.events.EventTarget );
goog.addSingletonGetter( zz.service.Popup );

/**********************************************************************************************************************
 * Lifecycle methods                                                                                                  *
 **********************************************************************************************************************/

zz.service.Popup.prototype.disposeInternal = function( ){

	goog.base( 'disposeInternal', this );
	goog.events.unlisten( document, goog.events.EventType.CLICK, this.clickListener_, false, this );
};

/**********************************************************************************************************************
 * Event listeners                                                                                                    *
 **********************************************************************************************************************/

/**
 * Listener for animation end event.
 * @this {zz.service.Popup}
 * @private
 */
zz.service.Popup.prototype.clickListener_ = function( ){

	goog.object.forEach( this.closable_, function( popup ){

		if( popup.isVisible( ) ){

			popup.close( );
		}
	}, this );
};

/**********************************************************************************************************************
 * Public interface                                                                                                   *
 **********************************************************************************************************************/

/**
 * Add closable popup to storage.
 * @param {Object} popup
 */
zz.service.Popup.prototype.addClosable = function( popup ){

	// TODO: Add assertion.
	this.closable_[ goog.getUid( popup ) ] = popup;

};

/**
 * Remove closable popup to storage.
 * @param {Object} popup
 */
zz.service.Popup.prototype.removeClosable = function( popup ){

	delete this.closable_[ goog.getUid( popup ) ];
};
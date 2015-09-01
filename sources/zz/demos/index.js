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
 * @fileoverview Provide zz.demos.App class.
 * @author buntarb@gmail.com (Artem Lytvynov aka buntarb)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.demos.App' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.events' );
goog.require( 'zz.template' );
goog.require( 'zz.model.Set' );
goog.require( 'zz.model.Example1' );
goog.require( 'zz.model.Example2' );
goog.require( 'zz.model.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.App = function( ){ };

/**********************************************************************************************************************
 * Static method section                                                                                              *
 **********************************************************************************************************************/

zz.demos.App.run = function( ){

	var set = goog.global.set = new zz.model.Set( zz.model.Example1, [

		[true, 1, '#1', [
			[false, 0, '?0'],
			[false, 1, '?1'],
			[false, 2, '?2'],
			[false, 3, '?3'],
			[false, 4, '?4']
		]],
		[true, 2, '#2', [
			[false, 0, '?']
		]],
		[true, 3, '#3', [
			[false, 0, '?']
		]],
		[true, 4, '#4', [
			[false, 0, '?']
		]],
		[true, 5, '#5', [
			[false, 0, '?']
		]]
	] );
	goog.events.listen( set[0], zz.model.EventType.ROW_CREATE, function( e ){

		console.log( e );
	} );
	goog.events.listen( set[0], zz.model.EventType.ROW_DELETE, function( e ){

		console.log( e );
	} );
	goog.events.listen( set[0], zz.model.EventType.ROW_UPDATE, function( e ){

		var item = /** {@type zz.model.Example1} */ ( e.target );
		var event = /** {@type zz.model.RowUpdateEvent} */ ( e );
		if( event.changes.stringField ){

			goog.dom.getElement( 'test' ).textContent = item.stringField;
		}
	} );
	goog.dom.getDocument( ).write( zz.template.test( ) );
};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.App.run', zz.demos.App.run );
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

goog.provide( 'zz.demos.app' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.dom' );
goog.require( 'goog.events' );
goog.require( 'zz.template' );
goog.require( 'zz.model.Example1Set' );
goog.require( 'zz.model.EventType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

zz.demos.app = { };

/**********************************************************************************************************************
 * Static method section                                                                                              *
 **********************************************************************************************************************/

zz.demos.app.run = function( ){

	var generate = goog.global.generate = function( ){

		var set = goog.global.set = [];

		for( var i = 0; i < 100; i++ ){

			set[i] = new zz.model.Example1Set( undefined, [

				[true, 1, '#1', [

					[false, 0, '?0'],
					[false, 1, '?1'],
					[false, 2, '?2'],
					[false, 3, '?3'],
					[false, 4, '?4']
				]],
				[true, 2, '#2', [

					[false, 0, '?'],
					[false, 1, '?1'],
					[false, 2, '?2'],
					[false, 3, '?3'],
					[false, 4, '?4']
				]],
				[true, 3, '#3', [

					[false, 0, '?'],
					[false, 1, '?1'],
					[false, 2, '?2'],
					[false, 3, '?3'],
					[false, 4, '?4']
				]],
				[true, 4, '#4', [

					[false, 0, '?'],
					[false, 1, '?1'],
					[false, 2, '?2'],
					[false, 3, '?3'],
					[false, 4, '?4']
				]],
				[true, 5, '#5', [

					[false, 0, '?'],
					[false, 1, '?1'],
					[false, 2, '?2'],
					[false, 3, '?3'],
					[false, 4, '?4']
				]]
			] );

//			var capture = false;
//
//			goog.events.listen( set[i], zz.model.EventType.DATAROW_UPDATE, function( evt ){
//
//				console.log( 'Parent dataset level' );
//				console.log( evt );
//
//			}, capture );
//
//			goog.events.listen( set[i][0], zz.model.EventType.DATAROW_UPDATE, function( evt ){
//
//				console.log( 'Parent datarow level' );
//				console.log( evt );
//
//			}, capture );
//
//			goog.events.listen( set[i][0].exampleField1, zz.model.EventType.DATAROW_UPDATE, function( evt ){
//
//				console.log( 'Child dataset level' );
//				console.log( evt );
//
//			}, capture );
//
//			goog.events.listen( set[i][0].exampleField1[0], zz.model.EventType.DATAROW_UPDATE, function( evt ){
//
//				console.log( 'Child datarow level' );
//				console.log( evt );
//
//			}, capture );
		}
	};

	var clear = goog.global.clear = function( ){

		for( var i = 0; i < 100; i++ ){

			goog.global.set[i] = null;
		}
		goog.global.set = null;
		delete goog.global.set;
	};
};

/**********************************************************************************************************************
 * Public API export section                                                                                          *
 **********************************************************************************************************************/

goog.exportSymbol( 'zz.demos.app.run', zz.demos.app.run );
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
 * @fileoverview Definition of the model Boolean field class.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model.Boolean' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.events.EventTarget' );

goog.require( 'zz.model' );
goog.require( 'zz.model.IField' );
goog.require( 'zz.model.FieldTypes' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Model boolean type field class.
 * @implements {zz.model.IField}
 * @extend {goog.events.EventTarget}
 */
zz.model.Boolean = function( opt_value ){

    goog.events.EventTarget.call( this );

    if( !zz.model.isBooleanType( opt_value ) )

        throw new TypeError( 'Type mismatch. Need to be boolean. Got ' + typeof opt_value + '.' );


};
goog.inherits( zz.model.Boolean, goog.events.EventTarget );

/**********************************************************************************************************************
 * Prototype properties section                                                                                       *
 **********************************************************************************************************************/

/**
 * Field value.
 * @type {boolean}
 * @private
 */
zz.model.Boolean.prototype.value_ = null;
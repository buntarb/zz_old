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
 * @fileoverview Model common function declare.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.model' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.async.run' );
goog.require( 'zz.model.Error' );
goog.require( 'zz.model.Set' );
goog.require( 'zz.model.RowUpdateEvent' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Check is specified field exist in specified item, cal an exception if true.
 * @param {!zz.model.Row} item
 * @param {string} name
 */
zz.model.checkIfFieldExist = function( item, name ){

    if( goog.isDef( item[name] ) ) throw new TypeError( zz.model.Error.FIELD_ALREADY_EXIST );
};

/**
 * Check is specified value is a boolean. Throw an exception if it not.
 * @param {*} value
 */
zz.model.checkBooleanType = function( value ){

    if( !goog.isBoolean( value ) ) {

        throw new TypeError( zz.model.Error.TYPE_MISMATCH_BOOLEAN );
    }
};

/**
 * Check is specified value is a number. Throw an exception if it not.
 * @param {*} value
 */
zz.model.checkNumberType = function( value ){

    if( !goog.isNumber( value ) ) {

        throw new TypeError( zz.model.Error.TYPE_MISMATCH_NUMBER );
    }
};

/**
 * Check is specified value is a string. Throw an exception if it not.
 * @param {*} value
 */
zz.model.checkStringType = function( value ){

    if( !goog.isString( value ) ) {

        throw new TypeError( zz.model.Error.TYPE_MISMATCH_STRING );
    }
};

/**
 * Setting up data item field with boolean type.
 * @param {!zz.model.Row} item
 * @param {!string} name
 * @param {?*} opt_value
 */
zz.model.setupBooleanField = function( item, name, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkBooleanType( opt_value );

    zz.model.checkIfFieldExist( item, name );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.
    var value = goog.isDef( opt_value ) ? opt_value : null;
    Object.defineProperty( item, name, {

        get: function( ){

			return value;
		},
        set: function( val ){

            zz.model.checkBooleanType( val );
            if( value !== val ){

                value =  val;
                goog.async.run( function( ){

                    item.dispatchEvent( new zz.model.RowUpdateEvent( item, name ) );
                } );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * Setting up data item field with number type.
 * @param {!zz.model.Row} item
 * @param {!string} name
 * @param {?*} opt_value
 */
zz.model.setupNumberField = function( item, name, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkNumberType( opt_value );

    zz.model.checkIfFieldExist( item, name );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.
    var value = goog.isDef( opt_value ) ? opt_value : null;
    Object.defineProperty( item, name, {

        get: function( ){

			return value;
        },
        set: function( val ){

            zz.model.checkNumberType( val );
            if( value !== val ){

                value =  val;
                goog.async.run( function( ){

                    item.dispatchEvent( new zz.model.RowUpdateEvent( item, name ) );
                } );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * Setting up data item field with string type.
 * @param {!zz.model.Row} item
 * @param {!string} name
 * @param {*} opt_value
 */
zz.model.setupStringField = function( item, name, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkStringType( opt_value );

    zz.model.checkIfFieldExist( item, name );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.
    var value = goog.isDef( opt_value ) ? opt_value : null;
    Object.defineProperty( item, name, {

        get: function( ){

			return value;
        },
        set: function( val ){

            zz.model.checkStringType( val );
            if( value !== val ){

                value =  val;
                goog.async.run( function( ){

                    item.dispatchEvent( new zz.model.RowUpdateEvent( item, name ) );
                } );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 *
 * @param {!zz.model.Row} item
 * @param {!string} name
 * @param {!Function} type
 * @param {*} opt_value
 */
zz.model.setupSetField = function( item, name, type, opt_value ){

	zz.model.checkIfFieldExist( item, name );

	// Here we upgrade an object and create 'private' field with closure.
	// TODO: (buntarb) check memory leaks here.
	var value = new zz.model.Set( type, opt_value );
	Object.defineProperty( item, name, {

		get: function( ){

			return value;
		},
		set: function( val ){

			throw new TypeError( zz.model.Error.TYPE_MISMATCH_SET );
		},
		enumerable: true,
		configurable: false
	} );
};
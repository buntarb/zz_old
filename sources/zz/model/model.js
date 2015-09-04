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
goog.require( 'zz.model.DatarowUpdateEvent' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Increment counter for datarows ID's. Used in zz.model.getUniqueDatarowId function.
 * @type {number}
 */
var iCounter = 0;

/**
 * Return unique ID for datarow.
 * @returns {string}
 */
zz.model.getUniqueDatarowId = function( ){

    return 'ID_' + iCounter++;
};

/**
 * Check is specified field exist in specified item, cal an exception if true.
 * @param {!zz.model.Datarow} datarow
 * @param {string} datafield
 */
zz.model.checkIfFieldExist = function( datarow, datafield ){

    if( goog.isDef( datarow[datafield] ) ) throw new TypeError( zz.model.Error.FIELD_EXIST );
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
 * @param {!zz.model.Datarow} datarow
 * @param {!string} datafield
 * @param {?*} opt_value
 */
zz.model.setupBooleanField = function( datarow, datafield, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkBooleanType( opt_value );

    zz.model.checkIfFieldExist( datarow, datafield );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.

    var value = goog.isDef( opt_value ) ? opt_value : null;

    Object.defineProperty( datarow, datafield, {

        get: function( ){

			return value;
		},
        set: function( val ){

            zz.model.checkBooleanType( val );
            if( value !== val ){

				var old_value = value;
				var new_value = val;
                value =  val;
                goog.async.run( function( ){

					datarow.dispatchEvent( new zz.model.DatarowUpdateEvent(

						datarow,
						datafield,
						old_value,
						new_value
					) );
                } );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * Setting up data item field with number type.
 * @param {!zz.model.Datarow} datarow
 * @param {!string} datafield
 * @param {?*} opt_value
 */
zz.model.setupNumberField = function( datarow, datafield, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkNumberType( opt_value );

    zz.model.checkIfFieldExist( datarow, datafield );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.

    var value = goog.isDef( opt_value ) ? opt_value : null;

    Object.defineProperty( datarow, datafield, {

        get: function( ){

			return value;
        },
        set: function( val ){

            zz.model.checkNumberType( val );
            if( value !== val ){

				var old_value = value;
				var new_value = val;
				value =  val;
				goog.async.run( function( ){

					datarow.dispatchEvent( new zz.model.DatarowUpdateEvent(

						datarow,
						datafield,
						old_value,
						new_value
					) );
				} );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * Setting up data item field with string type.
 * @param {!zz.model.Datarow} datarow
 * @param {!string} datafield
 * @param {*} opt_value
 */
zz.model.setupStringField = function( datarow, datafield, opt_value ){

    if( goog.isDef( opt_value) )

        zz.model.checkStringType( opt_value );

    zz.model.checkIfFieldExist( datarow, datafield );

    // Here we upgrade an object and create 'private' field with closure.
    // TODO: (buntarb) check memory leaks here.

    var value = goog.isDef( opt_value ) ? opt_value : null;

    Object.defineProperty( datarow, datafield, {

        get: function( ){

			return value;
        },
        set: function( val ){

            zz.model.checkStringType( val );
            if( value !== val ){

				var old_value = value;
				var new_value = val;
				value =  val;
				goog.async.run( function( ){

					datarow.dispatchEvent( new zz.model.DatarowUpdateEvent(

						datarow,
						datafield,
						old_value,
						new_value
					) );
				} );
            }
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * @param {!zz.model.Datarow} datarow
 * @param {!string} datafield
 * @param {!Function} datatype
 * @param {*} opt_value
 */
zz.model.setupDatasetField = function( datarow, datafield, datatype, opt_value ){

	zz.model.checkIfFieldExist( datarow, datafield );

	// Here we upgrade an object and create 'private' field with closure.
	// TODO: (buntarb) check memory leaks here.
    if( goog.typeOf( datatype ) === 'function' && goog.isDef( datatype.prototype.Datarow_ ) ){

        var value = new datatype( datarow, opt_value );
        Object.defineProperty( datarow, datafield, {

            get: function( ){

                return value;
            },
            set: function( ){

                throw new TypeError( zz.model.Error.TYPE_MISMATCH_DATASET_RESET );
            },
            enumerable: true,
            configurable: false
        } );
    }else{

        throw new TypeError( zz.model.Error.TYPE_MISMATCH_DATASET );
    }
};
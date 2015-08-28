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
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Returns true if the specified value is a boolean.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isBooleanType = function( value ){

    return goog.isBoolean( value );
};

/**
 * Setting up data item field with boolean type.
 * @param {!zz.model.BaseItem} item
 * @param {string} name
 * @param {*} opt_value
 */
zz.model.setupBooleanField = function( item, name, opt_value ){

    if( !zz.model.isBooleanType( opt_value ) ){

        throw new TypeError( 'Type mismatch. Boolean expected.' );
    }
    if( goog.isDef( item[name] ) ){

        throw new TypeError( 'Specified field already exist in data item.' );
    }
    var value = null;
    Object.defineProperty( item, name, {

        get: function( ){ return value; },
        set: function( v ){

            if( !zz.model.isBooleanType( opt_value ) ) {

                throw new TypeError('Type mismatch. Boolean expected.');
            }
            value =  v;
        },
        enumerable: true,
        configurable: false
    } );
};

/**
 * Returns true if the specified value is a number.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isNumberType = function( value ){

    return goog.isNumber( value );
};

/**
 * Returns true if the specified value is a string.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isStringType = function( value ){

    return goog.isString( value );
};

/**
 * Returns true if the specified value is a date.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isDateType = function( value ){

    //
};

/**
 * Returns true if the specified value is a time.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isTimeType = function( value ){

    //
};

/**
 * Returns true if the specified value is a datetime.
 * @param {*} value
 * @returns {boolean}
 */
zz.model.isDatetimeType = function( value ){

    //
};
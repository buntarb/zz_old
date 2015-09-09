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
 * @fileoverview Binding constants.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.BindType' );
goog.provide( 'zz.ui.ModelBindingType' );
goog.provide( 'zz.ui.ControlBindingType' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Constants for binding level.
 * @enum {string}
 */
zz.ui.BindType = {

    UI_TO_MODEL: 'UI-TO-MODEL',
    MODEL_TO_UI: 'MODEL-TO-UI',
    TWO_WAY_BINDING: 'TWO-WAY'
};

/**
 * Constants for model binding level.
 * @enum {string}
 */
zz.ui.ModelBindingType = {

    ROW: 'ROW',
    SET: 'SET',
    TOP: 'TOP'
};

/**
 * Constants for control binding level.
 * @enum {string}
 */
zz.ui.ControlBindingType = {

    CONTROL: 'CONTROL',
    PARENT: 'PARENT',
    TOP: 'TOP'
};
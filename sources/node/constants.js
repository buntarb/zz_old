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
 * @fileoverview Constants.
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

/**********************************************************************************************************************
 * Constants                                                                                                          *
 **********************************************************************************************************************/

/**
 * Defaults
 * @type {Object}
 */
var DEFAULTS = {

	LOCALE: 'en'
};

/**
 * Project path.
 * @type {Object}
 */
var PATH = {

	ROOT: '/var/www/zz',
	TOOLS: '/bin',
	MESSAGES: '/messages',
	TEMPLATES: '/templates',
	STYLESHEETS: '/stylesheets',
	SOURCES: {

		ROOT: '/sources/zz',
		TEMPLATE: '/sources/zz/_template'
	}
};

/**
 * Google Closure Tools binary files.
 * @type {Object}
 */
var TOOLS = {

	COMPILER: PATH.ROOT + PATH.TOOLS + '/compiler/compiler.jar',
	MESSAGES: PATH.ROOT + PATH.TOOLS + '/messages/SoyMsgExtractor.jar',
	TEMPLATES: PATH.ROOT + PATH.TOOLS + '/templates/SoyToJsSrcCompiler.jar',
	STYLESHEETS: PATH.ROOT + PATH.TOOLS + '/stylesheets/closure-stylesheets.jar'
};

/**********************************************************************************************************************
 * Exports                                                                                                            *
 **********************************************************************************************************************/

module.exports = {

	DEFAULTS: DEFAULTS,
	PATH: PATH,
	TOOLS: TOOLS
};
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
 * @fileoverview Provide zz.ui.mdl.Tooltip class.
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

/**********************************************************************************************************************
 * Provide section                                                                                                    *
 **********************************************************************************************************************/

goog.provide( 'zz.ui.mdl.Tooltip' );

/**********************************************************************************************************************
 * Dependencies section                                                                                               *
 **********************************************************************************************************************/

goog.require( 'goog.array' );
goog.require( 'goog.style' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Material ripple fx class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Control}
 * @constructor
 */
zz.ui.mdl.Tooltip = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};
goog.inherits( zz.ui.mdl.Tooltip, goog.ui.Component );
goog.tagUnsealableClass( zz.ui.mdl.Tooltip );

/**********************************************************************************************************************
 * Static properties section                                                                                          *
 **********************************************************************************************************************/

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 */
zz.ui.mdl.Tooltip.CONST = { };

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.Tooltip.CSS = {

	IS_ACTIVE: goog.getCssName( 'is-active' )
};

/**
 * Default CSS class to be applied to the root element of component.
 * @type {string}
 */
zz.ui.mdl.Tooltip.CSS_CLASS = goog.getCssName( 'mdl-tooltip' );

/**********************************************************************************************************************
 * Properties section                                                                                                 *
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * Life cycle methods                                                                                                 *
 **********************************************************************************************************************/

/**
 * @override
 */
zz.ui.mdl.Tooltip.prototype.createDom = function( ){

	goog.base( this, 'createDom' );
};

/**
 * @override
 */
zz.ui.mdl.Tooltip.prototype.decorateInternal = function( element ){

	goog.base( this, 'decorateInternal', element );

	if( element ){

		var forElId = element.getAttribute( 'for' );
		if( forElId ){

			this.forElement_ = goog.dom.getElement( forElId );
		}
		if( this.forElement_ ){

			// Tabindex needs to be set for `blur` events to be emitted
			if( !this.forElement_.hasAttribute( 'tabindex' ) ){

				this.forElement_.setAttribute( 'tabindex', '0' );
			}
		}
	}
};

/**
 * @override
 */
zz.ui.mdl.Tooltip.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	if( this.forElement_ ){

		this.getHandler( ).listenWithScope(

			this.forElement_, [

				goog.events.EventType.MOUSEENTER,
				goog.events.EventType.MOUSEDOWN,
				goog.events.EventType.TOUCHSTART
			],
			this.handleMouseEnter_,
			false,
			this
		);
		this.getHandler( ).listenWithScope(

			this.forElement_, [

				goog.events.EventType.MOUSELEAVE,
				goog.events.EventType.BLUR
			],
			this.handleMouseLeave_,
			false,
			this
		);
	}
};

/**
 * @override
 **/
zz.ui.mdl.Tooltip.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**
 * Downgrade the component.
 * @private
 */
zz.ui.mdl.Tooltip.prototype.mdlDowngrade = function( ){

	this.dispose( );
};

/**********************************************************************************************************************
 * Event listeners/handlers section                                                                                   *
 **********************************************************************************************************************/

/**
 * Handle mouseenter for tooltip.
 * @param {goog.events.BrowserEvent} event
 * @private
 */
zz.ui.mdl.Tooltip.prototype.handleMouseEnter_ = function( event ){

	event.stopPropagation( );

	var props = event.target.getBoundingClientRect( );
	var left = props.left + ( props.width / 2 );
	var marginLeft = -1 * ( this.getElement( ).offsetWidth / 2 );

	if( left + marginLeft < 0 ){

		goog.style.setStyle( this.getElement( ), {

			left: '0',
			marginLeft: '0'
		} );

	}else{

		goog.style.setStyle( this.getElement( ), {

			left: left + 'px',
			marginLeft: marginLeft + 'px'
		} );
	}
	goog.style.setStyle( this.getElement( ), {

		top: props.top + props.height + 10 + 'px'
	} );
	goog.dom.classlist.add( this.getElement( ), zz.ui.mdl.Tooltip.CSS.IS_ACTIVE );
	this.getHandler( ).listenWithScope(

		this.getDomHelper( ).getWindow( ), [

			goog.events.EventType.SCROLL,
			goog.events.EventType.TOUCHMOVE
		],
		this.handleMouseLeave_,
		false,
		this
	);
};

/**
 * Handle mouseleave for tooltip.
 * @param {goog.events.BrowserEvent} event
 * @private
 */
zz.ui.mdl.Tooltip.prototype.handleMouseLeave_ = function( event ) {

	event.stopPropagation( );

	goog.dom.classlist.remove( this.getElement( ), zz.ui.mdl.Tooltip.CSS.IS_ACTIVE );

	this.getHandler( ).unlisten(

		this.getDomHelper( ).getWindow( ), [

			goog.events.EventType.SCROLL,
			goog.events.EventType.TOUCHMOVE
		],
		this.handleMouseLeave_,
		false,
		this
	);
};

/**********************************************************************************************************************
 * Style manipulation methods                                                                                         *
 **********************************************************************************************************************/

/**
 * Returns the CSS class name to be applied to the root element of all sub-views rendered or decorated using this view.
 * The class name is expected to uniquely identify the view class, i.e. no two view classes are expected to share the
 * same CSS class name.
 * @override
 */

zz.ui.mdl.Tooltip.prototype.getCssClass = function( ){

	return zz.ui.mdl.Tooltip.CSS_CLASS;
};

/**********************************************************************************************************************
 * Helpers methods                                                                                                    *
 **********************************************************************************************************************/

/**
 * Set tooltip content to specified text or dom structure.
 * @param {goog.ui.ControlContent} content
 */
zz.ui.mdl.Tooltip.prototype.setContent = function( content ){

	goog.dom.removeChildren( this.getElement( ) );
	if( content ){

		if( goog.isString( content ) ){

			goog.dom.setTextContent( this.getElement( ), content );

		}else{

			/** @this {zz.ui.mdl.Tooltip} */
			var childHandler = function( child ){

				if( child ){

					var doc = goog.dom.getOwnerDocument( this.getElement( ) );
					goog.dom.appendChild( this.getElement( ), goog.isString( child ) ?

						doc.createTextNode( child ) :
						child );
				}
			};
			if( goog.isArray( content ) ){

				// Array of nodes.
				goog.array.forEach(

					content,
					childHandler,
					this );

			}else if( goog.isArrayLike( content ) && !( 'nodeType' in content ) ){

				// NodeList. The second condition filters out TextNode which also has
				// length attribute but is not array like. The nodes have to be cloned
				// because childHandler removes them from the list during iteration.
				goog.array.forEach(

					goog.array.clone( /** @type {!NodeList} */( content ) ),
					childHandler,
					this );

			} else {

				// Node or string.
				childHandler.call( this, content );
			}
		}
	}
};

/**********************************************************************************************************************
 * Register a decorator factory function for goog.ui.Buttons.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.Tooltip.CSS_CLASS, function( ){

	return new zz.ui.mdl.Tooltip( );
} );
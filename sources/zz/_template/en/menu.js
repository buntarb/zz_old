// This file was automatically generated from menu.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.ui.menu.
 */

goog.provide('zz.template.ui.menu');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.menu.default = function(opt_data, opt_ignored) {
  return '<button id="demo-menu-lower-left" class="' + goog.getCssName('mdl-button') + ' ' + goog.getCssName('mdl-js-button') + ' ' + goog.getCssName('mdl-button--icon') + '"><i class="' + goog.getCssName('material-icons') + '">more_vert</i></button><ul id="1" class="' + goog.getCssName('mdl-menu') + ' ' + goog.getCssName('mdl-menu--bottom-left') + ' ' + goog.getCssName('mdl-js-menu') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '" for="demo-menu-lower-left"><li class="' + goog.getCssName('mdl-menu__item') + '">Some Action</li><li class="' + goog.getCssName('mdl-menu__item') + '">Another Action</li><li disabled class="' + goog.getCssName('mdl-menu__item') + '">Disabled Action</li><li class="' + goog.getCssName('mdl-menu__item') + '">Yet Another Action</li></ul>';
};
if (goog.DEBUG) {
  zz.template.ui.menu.default.soyTemplateName = 'zz.template.ui.menu.default';
}

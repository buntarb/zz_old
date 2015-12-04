// This file was automatically generated from checkbox.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.ui.checkbox.
 */

goog.provide('zz.template.ui.checkbox');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.checkbox.default = function(opt_data, opt_ignored) {
  return '<label id="1" class="' + goog.getCssName('mdl-checkbox') + ' ' + goog.getCssName('mdl-js-checkbox') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '" for="checkbox-1"><input type="checkbox" id="checkbox-1" class="' + goog.getCssName('mdl-checkbox__input"') + ' checked><span class="' + goog.getCssName('mdl-checkbox__label') + '">Checkbox</span></label>';
};
if (goog.DEBUG) {
  zz.template.ui.checkbox.default.soyTemplateName = 'zz.template.ui.checkbox.default';
}

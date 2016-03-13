// This file was automatically generated from radio.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.ui.radio.
 */

goog.provide('zz.template.ui.radio');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.radio.default = function(opt_data, opt_ignored) {
  return '<form name="form"><label id="a1" class="' + goog.getCssName('mdl-radio') + ' ' + goog.getCssName('mdl-js-radio') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '"><input type="radio" class="' + goog.getCssName('mdl-radio__button') + '" name="options" value="a"><span class="' + goog.getCssName('mdl-radio__label') + '">1st</span></label><br><br><label id="b1" class="' + goog.getCssName('mdl-radio') + ' ' + goog.getCssName('mdl-js-radio') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '"><input type="radio" class="' + goog.getCssName('mdl-radio__button') + '" name="options" value="b"><span class="' + goog.getCssName('mdl-radio__label') + '">2nd</span></label></form>';
};
if (goog.DEBUG) {
  zz.template.ui.radio.default.soyTemplateName = 'zz.template.ui.radio.default';
}

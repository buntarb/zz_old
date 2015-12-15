// This file was automatically generated from textfield.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.ui.textfield.
 */

goog.provide('zz.template.ui.textfield');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.textfield.default = function(opt_data, opt_ignored) {
  return '<form action="#"><div id="1" class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + '"><input class="' + goog.getCssName('mdl-textfield__input') + '" type="text" id="sample1"><label class="' + goog.getCssName('mdl-textfield__label') + '" for="sample1">Text...</label></div></form><br><form action="#"><div id="2" class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + '"><input class="' + goog.getCssName('mdl-textfield__input') + '" type="text" pattern="-?[0-9]*(\\.[0-9]+)?" id="sample2"><label class="' + goog.getCssName('mdl-textfield__label') + '" for="sample2">Number...</label><span class="' + goog.getCssName('mdl-textfield__error') + '">Input is not a number!</span></div></form>';
};
if (goog.DEBUG) {
  zz.template.ui.textfield.default.soyTemplateName = 'zz.template.ui.textfield.default';
}

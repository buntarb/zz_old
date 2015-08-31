// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.
 */

goog.provide('zz.template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.test = function(opt_data, opt_ignored) {
  return '<div id="test" class="' + goog.getCssName('test') + '">This is test DIV</div>';
};
if (goog.DEBUG) {
  zz.template.test.soyTemplateName = 'zz.template.test';
}

// This file was automatically generated from zz.template.module.user.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.module.user.
 */

goog.provide('zz.template.module.user');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.module.user.users = function(opt_data, opt_ignored) {
  return '<div id="' + goog.getCssName('users-view') + '" class="' + goog.getCssName('users-view') + '"><div class="' + goog.getCssName('users-control') + '"><button class="' + goog.getCssName('mdl-button') + ' ' + goog.getCssName('mdl-js-button') + ' ' + goog.getCssName('mdl-button--fab') + ' ' + goog.getCssName('mdl-js-ripple-effect') + ' ' + goog.getCssName('add-user') + '"><i class="' + goog.getCssName('material-icons') + '">add</i></button><button class="' + goog.getCssName('mdl-button') + ' ' + goog.getCssName('mdl-js-button') + ' ' + goog.getCssName('mdl-button--fab') + ' ' + goog.getCssName('mdl-js-ripple-effect') + ' ' + goog.getCssName('remove-user') + '"><i class="' + goog.getCssName('material-icons') + '">remove</i></button></div><div class="' + goog.getCssName('users-content') + '"></div></div>';
};
if (goog.DEBUG) {
  zz.template.module.user.users.soyTemplateName = 'zz.template.module.user.users';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.module.user.user = function(opt_data, opt_ignored) {
  return '<div id="' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('user-view') + '"><div class="' + goog.getCssName('user-detail') + '"><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('user-number') + '"><input id="' + goog.getCssName('user-number') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__input') + '" type="text"><label for="' + goog.getCssName('user-number') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__label') + '">User #</label></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('user-first-name') + '"><input id="' + goog.getCssName('user-first-name') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__input') + '" type="text"><label for="' + goog.getCssName('user-first-name') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__label') + '">User first name</label></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('user-last-name') + '"><input id="' + goog.getCssName('user-last-name') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__input') + '" type="text"><label for="' + goog.getCssName('user-last-name') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__label') + '">User last name</label></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('user-login') + '"><input id="' + goog.getCssName('user-login') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__input') + '" type="text"><label for="' + goog.getCssName('user-login') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__label') + '">User login</label></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('user-password') + '"><input id="' + goog.getCssName('user-password') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__input') + '" type="password"><label for="' + goog.getCssName('user-password') + '-' + soy.$$escapeHtml(opt_data.id) + '" class="' + goog.getCssName('mdl-textfield__label') + '">User password</label></div><label id="1" class="' + goog.getCssName('mdl-checkbox') + ' ' + goog.getCssName('mdl-js-checkbox') + ' ' + goog.getCssName('mdl-js-ripple-effect') + ' ' + goog.getCssName('user-verified-flag') + '"><input type="checkbox" class="' + goog.getCssName('mdl-checkbox__input') + '"><span class="' + goog.getCssName('mdl-checkbox__label') + '">User verified flag</span></label></div><div class="' + goog.getCssName('user-phones') + '"></div></div>';
};
if (goog.DEBUG) {
  zz.template.module.user.user.soyTemplateName = 'zz.template.module.user.user';
}

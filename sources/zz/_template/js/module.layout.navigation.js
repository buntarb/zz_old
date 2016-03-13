// This file was automatically generated from navigation.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.module.layout.
 */

goog.provide('zz.template.module.layout');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.module.layout.default = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-header') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Fixed header</span><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><nav class="' + goog.getCssName('mdl-navigation') + ' ' + goog.getCssName('mdl-layout--large-screen-only') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="javascript:void(0);">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="javascript:void(0);">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="javascript:void(0);">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="javascript:void(0);">Link</a></nav></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="/#/1">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="/#/2">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="/#/3">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="/#/4">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '" id="view"></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.module.layout.default.soyTemplateName = 'zz.template.module.layout.default';
}

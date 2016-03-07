// This file was automatically generated from navigation.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.template.ui.navigation.
 */

goog.provide('zz.template.ui.navigation');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.default = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Default simple layout</span><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.default.soyTemplateName = 'zz.template.ui.navigation.default';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.noHeader = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-drawer') + '"><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">No header</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '"></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.noHeader.soyTemplateName = 'zz.template.ui.navigation.noHeader';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.fixedHeader = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-header') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Fixed header</span><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><nav class="' + goog.getCssName('mdl-navigation') + ' ' + goog.getCssName('mdl-layout--large-screen-only') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '"></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.fixedHeader.soyTemplateName = 'zz.template.ui.navigation.fixedHeader';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.fixedHeaderAndDrawer = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-drawer') + ' ' + goog.getCssName('mdl-layout--fixed-header') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--expandable') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('mdl-textfield--align-right') + '"><label class="' + goog.getCssName('mdl-button') + ' ' + goog.getCssName('mdl-js-button') + ' ' + goog.getCssName('mdl-button--icon') + '" for="fixed-header-drawer-exp"><i class="' + goog.getCssName('material-icons') + '">search</i></label><div class="' + goog.getCssName('mdl-textfield__expandable-holder') + '"><input class="' + goog.getCssName('mdl-textfield__input') + '" type="text" name="sample" id="fixed-header-drawer-exp"></div></div></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '"></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.fixedHeaderAndDrawer.soyTemplateName = 'zz.template.ui.navigation.fixedHeaderAndDrawer';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.scrollingHeader = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + '"><header class="' + goog.getCssName('mdl-layout__header') + ' ' + goog.getCssName('mdl-layout__header--scroll') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Scrolling header</span><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '"></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.scrollingHeader.soyTemplateName = 'zz.template.ui.navigation.scrollingHeader';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.waterfallHeader = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('demo-layout-waterfall') + ' ' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + '"><header class="' + goog.getCssName('mdl-layout__header') + ' ' + goog.getCssName('mdl-layout__header--waterfall') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><div class="' + goog.getCssName('mdl-textfield') + ' ' + goog.getCssName('mdl-js-textfield') + ' ' + goog.getCssName('mdl-textfield--expandable') + ' ' + goog.getCssName('mdl-textfield--floating-label') + ' ' + goog.getCssName('mdl-textfield--align-right') + '"><label class="' + goog.getCssName('mdl-button') + ' ' + goog.getCssName('mdl-js-button') + ' ' + goog.getCssName('mdl-button--icon') + '" for="waterfall-exp"><i class="' + goog.getCssName('material-icons') + '">search</i></label><div class="' + goog.getCssName('mdl-textfield__expandable-holder') + '"><input class="' + goog.getCssName('mdl-textfield__input') + '" type="text" name="sample" id="waterfall-exp"></div></div></div><div class="' + goog.getCssName('mdl-layout__header-row') + '"><div class="' + goog.getCssName('mdl-layout-spacer') + '"></div><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span><nav class="' + goog.getCssName('mdl-navigation') + '"><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a><a class="' + goog.getCssName('mdl-navigation__link') + '" href="">Link</a></nav></div><main class="' + goog.getCssName('mdl-layout__content') + '"><div class="' + goog.getCssName('page-content') + '"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.waterfallHeader.soyTemplateName = 'zz.template.ui.navigation.waterfallHeader';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.scrollableTabs = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-header') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Scrollable tabs</span></div><div class="' + goog.getCssName('mdl-layout__tab-bar') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '"><a href="#scroll-tab-1" class="' + goog.getCssName('mdl-layout__tab') + ' ' + goog.getCssName('is-active') + '">Tab 1</a><a href="#scroll-tab-2" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 2</a><a href="#scroll-tab-3" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 3</a><a href="#scroll-tab-4" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 4</a><a href="#scroll-tab-5" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 5</a><a href="#scroll-tab-6" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 6</a></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Scrollable tabs</span></div><main class="' + goog.getCssName('mdl-layout__content') + '"><section class="' + goog.getCssName('mdl-layout__tab-panel') + ' ' + goog.getCssName('is-active') + '" id="scroll-tab-1"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="scroll-tab-2"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="scroll-tab-3"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="scroll-tab-4"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="scroll-tab-5"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="scroll-tab-6"><div class="' + goog.getCssName('page-content') + '"></div></section></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.scrollableTabs.soyTemplateName = 'zz.template.ui.navigation.scrollableTabs';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.template.ui.navigation.fixedHeadersAndTabs = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('mdl-layout') + ' ' + goog.getCssName('mdl-js-layout') + ' ' + goog.getCssName('mdl-layout--fixed-header') + ' ' + goog.getCssName('mdl-layout--fixed-tabs') + '"><header class="' + goog.getCssName('mdl-layout__header') + '"><div class="' + goog.getCssName('mdl-layout__header-row') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Simple header with fixed tabs</span></div><div class="' + goog.getCssName('mdl-layout__tab-bar') + ' ' + goog.getCssName('mdl-js-ripple-effect') + '"><a href="#fixed-tab-1" class="' + goog.getCssName('mdl-layout__tab') + ' ' + goog.getCssName('is-active') + '">Tab 1</a><a href="#fixed-tab-2" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 2</a><a href="#fixed-tab-3" class="' + goog.getCssName('mdl-layout__tab') + '">Tab 3</a></div></header><div class="' + goog.getCssName('mdl-layout__drawer') + '"><span class="' + goog.getCssName('mdl-layout-title') + '">Title</span></div><main class="' + goog.getCssName('mdl-layout__content') + '"><section class="' + goog.getCssName('mdl-layout__tab-panel') + ' ' + goog.getCssName('is-active') + '" id="fixed-tab-1"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="fixed-tab-2"><div class="' + goog.getCssName('page-content') + '"></div></section><section class="' + goog.getCssName('mdl-layout__tab-panel') + '" id="fixed-tab-3"><div class="' + goog.getCssName('page-content') + '"></div></section></main></div>';
};
if (goog.DEBUG) {
  zz.template.ui.navigation.fixedHeadersAndTabs.soyTemplateName = 'zz.template.ui.navigation.fixedHeadersAndTabs';
}

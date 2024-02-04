import "../scss/style.scss";
import "./utils/prism.js";
import {iosVhFix} from "./utils/ios-vh-fix.js";
import initPageMenu from "./modules/header/init-page-menu.js";
import initFilter from "./modules/filter/init-filter.js";

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();
  initPageMenu();
  initFilter();
});

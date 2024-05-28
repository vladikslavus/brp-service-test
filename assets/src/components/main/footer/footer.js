
import 'simplebar';  // custom scroll
// import { smartNavbar } from "../../../js/smartnavbar";

import { getScrollbarWidth } from "../../../js/getscrollbarwidth"; // get real scrollbar width for our code
const scrollbarWidth = getScrollbarWidth();

import { magicModals } from "../../../js/magicmodals";

new magicModals({
    container: '.modal-window',
    openBtn: '.modal-btn',
    closeBtn: '.modal-window__close',
    scrollbarWidth: scrollbarWidth,
    speed: 300,
    // smartNavbarInstance: smartNavbar
}).launch();
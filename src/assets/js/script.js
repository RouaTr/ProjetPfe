//  -----------------------------------------------------------------------------------

//     Template Name: axelit Admin
//     Template URI: http://admin.la-themes.com/axelit/theme
//     Description: This is Admin theme
//     Author: la-themes
//     Author URI: https://themeforest.net/user/la-themes

// -----------------------------------------------------------------------------------

// 01. Horizontal Nav js
// 02. Flag  Icon Js
// 03. copy js
// 04. sidebar toggle js
// 05. List page js
// 06. Sidebar scroll js
// 07. Loader JS
// 08. tap on top
// 09. flag dropdown
// 10. hide-show
// 11. dark mode js
// 12. close on click js
// 13. searchbar js
// 14. closeCollapse js
// 15. Modal js

// >>-- 01 Horizontal Nav Js --<<
let navBar = $(".main-nav");
let size = "150px";
let leftsideLimit = -100;
let navbarSize;
let containerWidth;
let maxNavbarLimit;

function setUpHorizontalHeader() {
  navbarSize = navBar.width();
  containerWidth = $(".content-wrapper").width(); // Remplace .simplebar-content
  maxNavbarLimit = -(navbarSize - containerWidth);
  if ($("nav").hasClass("horizontal-sidebar")) {
    $(".menu-next").removeClass("d-none");
    $(".menu-previous").removeClass("d-none");
  } else {
    navBar.css("marginLeft",0)
    $(".menu-next").addClass("d-none");
    $(".menu-previous").addClass("d-none");
  }
  $(".horizontal-sidebar .show").removeClass("show");
}

$(document).on('click', '.menu-previous', function (e) {
  let layoutOption = getLocalStorageItem("layout-option","ltr");
  let attribute = layoutOption == 'ltr' ? 'marginLeft' : 'marginRight';
  let currentPosition = parseInt(navBar.css(attribute));
  if (currentPosition < 0) {
    navBar.css(`${attribute}`, "+=" + size)
    $(".menu-next").removeClass("d-none");
    $(".menu-previous").removeClass("d-none");
    if (currentPosition >= leftsideLimit) {
      $(this).addClass("d-none");
    }
  }
})

$(document).on('click', '.menu-next', function (e) {
  let layoutOption = getLocalStorageItem("layout-option","ltr");
  let attribute = layoutOption == 'ltr' ? 'marginLeft' : 'marginRight';
  let currentPosition = parseInt(navBar.css(attribute));
  if (currentPosition >= maxNavbarLimit) {
    $(".menu-next").removeClass("d-none");
    $(".menu-previous").removeClass("d-none");
    navBar.css(`${attribute}`, "-=" + size)
    if (currentPosition - parseInt(size) <= maxNavbarLimit) {
      $(this).addClass("d-none");
    }
  }
})

$(function () {
  setUpHorizontalHeader();
  let themeMode = getLocalStorageItem('theme-mode', 'light')
  setTimeout(() => {
    $('body').addClass(`${themeMode}`)
  }, 1000);
});

// >>-- 06 Sidebar scroll js --<< (Suppression de SimpleBar)
$(function () {
  let sidebar = document.getElementById('app-sidebar');
  sidebar.style.overflowY = 'auto'; // Activation du scroll natif
});

const myNav = document.querySelector(".site-header");
const headroom = new Headroom(myNav, {
  "offset": 0,
  "tolerance": 10,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp",
    "top": "top",
    "notTop": "notTop",
    "bottom": "bottom",
    "notBottom": "notBottom"
  }
});
headroom.init();

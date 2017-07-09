function scrollBanner() {
  let scrollPos;
  let headerText = document.querySelector('.banner__title');
  scrollPos = window.scrollY;

  if (scrollPos <= 600) {
      headerText.style.transform =  "translateY(" + (-scrollPos/3) +"px" + ")";
      headerText.style.opacity = 1 - (scrollPos/600);
  }
}

window.addEventListener('scroll', scrollBanner);

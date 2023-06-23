(function () {
  'use strict';

  var card = document.getElementById('card'),
    gloss = card.querySelector('.card__gloss'),
    content = card.querySelector('.card__content'),
    width = window.innerWidth,
    height = window.innerHeight;

  function init() {
    bindMouse();

    // Initial tilt
    light(350, -125);
    tilt(350, -125);
  }

  function bindMouse() {
    document.addEventListener('mousemove', (event) => {
      let x = event.clientX - width / 2,
        y = event.clientY - height / 2;

      light(x, y);
      tilt(x, y);
    });
  }

  function light(x, y) {
    let angle = (Math.atan2(y, x) * 180) / Math.PI - 90;

    gloss.style.background =
      'linear-gradient(' +
      angle +
      'deg, rgba(255, 255, 255,' +
      (y / height) * 0.9 +
      ') 0%, rgba(255, 255, 255, 0) 80%)';
  }

  function tilt(x, y) {
    let force = 80,
      rx = (x / width) * force,
      ry = (y / height) * -force;

    card.style.transform = 'rotateY(' + rx + 'deg) rotateX(' + ry + 'deg)';
    // content.style.transform = 'translateX(' + (rx * .75) + 'px) translateY(' + (ry * .75) + 'px)';
  }

  init();
})();

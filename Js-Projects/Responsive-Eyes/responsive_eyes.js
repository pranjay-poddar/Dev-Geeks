// Eye balls
const eyeBalls = document.getElementsByClassName('ball');
// makes the eyeball move depends where the curser is.
document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';

  for (let i = 0; i < 2; i++) {
    eyeBalls[i].style.left = x;
    eyeBalls[i].style.top = y;
    eyeBalls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};
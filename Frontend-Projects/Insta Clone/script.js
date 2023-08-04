let calcScrollValue = () => {
    let scrollProg = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProg.style.display = "grid";
    } else {
      scrollProg.style.display = "none";
    }
    scrollProg.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProg.style.background = `conic-gradient(#e2336b ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

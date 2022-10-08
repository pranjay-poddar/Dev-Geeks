document.addEventListener("scroll", (e) => {
    if (this.scrollY > 180) {
    // TO CHANGE THE APPEARANCE OF NAVBAR AFTER SCROLL
      document.querySelector(".navbar").style.background = "rgba(0,0,0,1)";
    } else {
      // REMOVING CLASS
      document.querySelector(".navbar").style.background = "unset";
    }
  });
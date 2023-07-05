let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#1260CC ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;
  
    const dark = document.getElementById('checkbox');
    const body = document.querySelector('body');
    const admin = document.getElementById('adminID');
    const para1= document.getElementById('para1');
    const para2= document.getElementById('para2');
    const para3= document.getElementById('para3');
    const para4= document.getElementById('para4');
    
  
   

   
    dark.addEventListener('change',()=>{
      body.classList.toggle('darkMode');
      admin.classList.toggle('bg-dark');
      para1.classList.toggle('para-dark');
      para2.classList.toggle('para-dark');
      para3.classList.toggle('para-dark');
      para4.classList.toggle('para-dark');
      
      
      
    });
  
  
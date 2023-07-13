// =============SEARCH BAR IMPLEMENTATION===============
document.querySelector("#projectContainer").style.display = "none";
search = () => {
  let searchquery = document.querySelector("#searchInput").value ;
  searchquery = searchquery.toLowerCase();

  let results;
  projects.forEach( searchIn = (element) => {
    // console.log( element.title.toLowerCase())
    if (element.title.toLowerCase() == searchquery )  {
      results = element ;
    } 
  });

  // console.log( typeof results) ;
  searchResult( results ) ; 
}
searchResult = (results) => {

  const searchResults = document.querySelector( "#projectContainer") ;

  console.log( results ) ;

  document.querySelector("#projectContainer").style.display = "block";

  searchResults.innerHTML = `<span>Description:&nbsp;${results.description}</span><br><span>GitHub Link:&nbsp;<a href="${results.githublink}">GitHub Link</a></span><br><span>Projects Link:&nbsp;<a href="${results.projectlink}">Project Link</a></span><br>` ;


}

// =====================================================

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


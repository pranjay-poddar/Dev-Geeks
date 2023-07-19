// =============SEARCH BAR IMPLEMENTATION===============
document.querySelector("#projectContainer").style.display = "none";
search = () => {
  let searchquery = document.querySelector("#searchInput").value;
  searchquery = searchquery.toLowerCase();

  let results;
  projects.forEach(searchIn = (element) => {
    // console.log( element.title.toLowerCase())
    if (element.title.toLowerCase().includes(searchquery)) {
      results = element;
    }
  });

  // console.log( typeof results) ;
  searchResult(results);
}

searchResult = (results) => {
  if (results == undefined) {
    searchResults.style.display = "flex";
    searchResults.innerHTML = `<h2 style="text-align:center">Result not found</h2>`;

  }

  else {
    const searchResults = document.querySelector("#projectContainer");

    searchResults.style.display = "flex";
    searchResults.style.backgroundColor = "black";
    searchResults.style.color = "white";
    searchResults.style.borderRadius = "5px";


    searchResults.innerHTML = `<h4 style="width:20%;">${results.title.toUpperCase()}</h4>
  <span style="width:70%;">${results.description}<br><br> Tags:<br>${results.tags}</span>
  <button class="btn btn-primary" style="width:30%;">
  <a style="color:white;text-decoration:none;" href="${results.githublink}">GitHub Link</a>
  </button>` ;

    const res = document.querySelector("span");
    for (let i = 0; i < res.length; i++) {
      res.style.display = "none";
      res.style.flexDirection = "row";
    }


  }




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


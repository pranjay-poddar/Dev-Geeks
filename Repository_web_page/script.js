function searchProjects() {
  // Get the input element and the search query
  var input = document.getElementById("searchInput");
  var query = input.value.toLowerCase();

  console.log( query );

  // Get the container where the projects will be displayed
  var container = document.getElementById("projectContainer");
  container.innerHTML = ""; // Clear the container

  // Filter the projects based on the search query
  var filteredProjects = projects.filter(function (project) {
    return project.name.toLowerCase().includes(query);
  });

  // Display the filtered projects in the container
  filteredProjects.forEach(function (project) {
    var projectElement = document.createElement("div");
    projectElement.innerHTML = project.name;
    container.appendChild(projectElement);
  });
}

document.getElementById("seachForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  searchProjects();
});

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


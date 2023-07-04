// Get the liquid element and the button element
const liquidElement = document.querySelector(".coffee-medium__liquid");
const liquidButton = document.querySelector(".coffee-button");
const smoke = document.querySelector(".coffee-medium__smoke");
// Add event listener to the button
liquidButton.addEventListener("click", function () 
{
  // Toggle the class to pause or play the animation
  if (liquidElement.classList.contains("coffee-medium__liquid--paused")) 
  {
    liquidElement.classList.remove("coffee-medium__liquid--paused");
    smoke.classList.remove("coffee-medium__smoke--paused");
  } 
  else 
  {
    liquidElement.classList.add("coffee-medium__liquid--paused");
    smoke.classList.add("coffee-medium__smoke--paused");
  }
});
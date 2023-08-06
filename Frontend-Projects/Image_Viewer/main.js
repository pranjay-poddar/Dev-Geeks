const imageContainer = document.getElementById("imageContainer");
const imageLink = document.getElementById("imageLink");

imageContainer.addEventListener("click",()=>{showImage()});


function checkImage(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
      status = request.status;
      if (request.status == 200){
        imageContainer.innerHTML = `<img src="${url}" id="image" alt="Image">`;

      } 
      else {
        alert('Please enter a valid Image URL');
      }
    }
}

function showImage() {
    let imageURL = imageLink.value;
    if(imageURL!=="")
        checkImage(imageURL)
    else
        alert('Please enter an Image URL');
}

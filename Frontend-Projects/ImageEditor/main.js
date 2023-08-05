const imageContainer = document.getElementById("imageContainer");
const imageLink = document.getElementById("imageLink");

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

document.getElementById('blur').addEventListener('input', function () {
  const value = this.value;
  document.getElementById('image').style.filter = `blur(${value}px)`;
});

document.getElementById('brightness').addEventListener('input', function () {
  const value = this.value;
  document.getElementById('image').style.filter = `brightness(${value}%)`;
});

document.getElementById('opacity').addEventListener('input', function () {
  const value = this.value;
  document.getElementById('image').style.opacity = value / 100;
});

document.getElementById('contrast').addEventListener('input', function () {
  const value = this.value;
  document.getElementById('image').style.filter = `contrast(${value}%)`;
});

document.getElementById('greyscale').addEventListener('input', function () {
  const value = this.value;
  document.getElementById('image').style.filter = `grayscale(${value}%)`;
});

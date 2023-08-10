const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".close-icon");

// API key, paginations, searchTerm variables
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
    // Converting received img to blob, creating its download link, & downloading it
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img, alt,profile) => {
    // Showing lightbox and setting img source, name, and button attribute
    const lightboxImg = lightbox.querySelector("img");
    const lightboxPhotographer = lightbox.querySelector("span");
    const lightboxAlt = lightbox.querySelector(".lightbox-alt");
    lightboxImg.src = img;
    lightboxPhotographer.innerHTML = `Photographer Profile:<button><a href=" ${profile}"></a>${name}</button>`;
    lightboxAlt.innerText = `Description : ${alt}`;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  };
  
  
const hideLightbox = () => {
    // Hiding lightbox on close icon click
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
    // Making li of all fetched images and adding them to the existing image wrapper
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
          <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}', '${img.alt}', '${img.photographer_url}')" src="${img.src.large2x}" alt="img">
          <div class="details">
            <div class="photographer">
                <p>${img.width}*${img.height}</p>
                <i class="uil uil-camera"></i><span>${img.photographer}</span>
            </div>
            <button onclick="downloadImg('${img.src.large2x}');">
              <i class="uil uil-import"></i>
            </button>
          </div>
        </li>`
      ).join("");
      
}

const getImages = (apiURL) => {
    // Fetching images by API call with authorization header
    searchInput.blur();
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    // If searchTerm has some value then call API with search term else call default API
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
    // If the search input is empty, set the search term to null and return from here
    if (e.target.value === "") return searchTerm = null;
    // If pressed key is Enter, update the current page, search term & call the getImages
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));

const textElement = document.getElementById("typing-text");
const texts = ["Journey through a tapestry of stunning visuals...", 
"Unleash the power of visual inspiration...",
"Explore a world of captivating images..."];
let textIndex = 0;
let charIndex = 0;

function typeText() {
  textElement.textContent += texts[textIndex][charIndex];
  charIndex++;

  if (charIndex >= texts[textIndex].length) {
    clearInterval(typingInterval);
    setTimeout(resetText, 1000); // Delay before resetting the text
  }
}

function resetText() {
  textElement.textContent = "";
  charIndex = 0;
  textIndex = (textIndex + 1) % texts.length;
  typingInterval = setInterval(typeText, 100); // Adjust typing speed as needed
}

let typingInterval = setInterval(typeText, 100); // Adjust typing speed as needed

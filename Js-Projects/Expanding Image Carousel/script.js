const imageInputFromUser = document.querySelectorAll(".uploaded-image");
var uploadedImageByUser = "";

for(let i=0; i<imageInputFromUser.length; i++){
    imageInputFromUser[i].addEventListener("change" , function(){
        const reader = new FileReader();
        reader.addEventListener("load",function(){
            uploadedImageByUser = reader.result;
            let divToStoreUploadedImage = document.querySelectorAll(".image");
            divToStoreUploadedImage[i].style.backgroundImage = `url(${uploadedImageByUser})`;
        });
        reader.readAsDataURL(this.files[0]);
    });
}


const allImages = document.querySelectorAll(".image");
// let previousActiveClass = document.querySelectorAll(".active");
for(let i=0; i<allImages.length ; i++){
    allImages[i].addEventListener("click",function(){
        removePreviousActiveClass();
        allImages[i].classList.add("active");
        
        
    });
}

function removePreviousActiveClass(){
    for(let i=0; i<allImages.length; i++){
        allImages[i].classList.remove("active");
    }
}
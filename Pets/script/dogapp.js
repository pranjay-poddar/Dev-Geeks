// const dogImageArray =[
//     "../image/dogsimages/Dog/Dog/australian-shepherd.jpg",
//     "../image/dogsimages/Dog/Dog/beagle1.jpg",
//     "../image/dogsimages/Dog/Dog/bichon-frise.jpg",
//     "../image/dogsimages/Dog/Dog/border-collie.jpg",
//     "../image/dogsimages/Dog/Dog/boxer.jpg",
//     "../image/dogsimages/Dog/Dog/bulldog1.jpg",
//     "../image/dogsimages/Dog/Dog/Chihuahua.jpg",
//     "../image/dogsimages/Dog/Dog/cocker-spaniel.jpg",
//     "../image/dogsimages/Dog/Dog/dachshund.jpg",
//     "../image/dogsimages/Dog/Dog/doberman-pinscher.jpg",
//     "../image/dogsimages/Dog/Dog/french-bulldog.jpg",
//     "../image/dogsimages/Dog/Dog/germanshepherd1.jpg",
//     "../image/dogsimages/Dog/Dog/golden-retriever.jpg",
//     "../image/dogsimages/Dog/Dog/great-dane.jpg",
//     "../image/dogsimages/Dog/Dog/labrador1.jpg",
//     "../image/dogsimages/Dog/Dog/rottweiler.jpg",
//     "../image/dogsimages/Dog/Dog/poodle4.jpg",
//     "../image/dogsimages/Dog/Dog/yorkshire-terrier.jpg"
// ];
// const dogNameArray =[
//     "Australian Shepherd",
//     "Beagle",
//     "Bichon Frise",
//     "boxer",
//     "Bulldog",
//     "Chihuahua",
//     "Cocker Spaniel",
//     "Dachshund",
//     "Doberman Pinscher",
//     "French Bulldog",
//     "German Shepherd",
//     "Golden Retriever"
// ];
// const dogImgSrcArray =[
//     "dog-img-1",
//     "dog-img-2",
//     "dog-img-3",
//     "dog-img-4",
//     "dog-img-5",
//     "dog-img-6",
//     "dog-img-7",
//     "dog-img-8",
//     "dog-img-9",
//     "dog-img-10",
//     "dog-img-11",
//     "dog-img-12"
// ];
// const txtIdNameArray=[
//     "dog-txt1",
//     "dog-txt2",
//     "dog-txt3",
//     "dog-txt4",
//     "dog-txt5",
//     "dog-txt6",
//     "dog-txt7",
//     "dog-txt8",
//     "dog-txt9",
//     "dog-txt10",
//     "dog-txt11",
//     "dog-txt12"

// ];

// function randomImg() {
//     for(i = 0; i < dogImgSrcArray.length; i++ ){
//         let randomNumber = Math.floor(Math.random() * dogImageArray.length);

//         let imgId = dogImgSrcArray[i];
//         let imgPath = dogImageArray[randomNumber];

//         let imgName =txtIdNameArray[i]
//         let imgNameTo =txtIdNameArray[randomNumber]

//         document.getElementById(imgId).src = imgPath;
//         document.getElementById(imgName).innerHTML= imgNameTo

//         dogImageArray.splice(randomNumber,1)

// }

// }

const dogImageArray = [
  "../image/dogsimages/Dog/Dog/australian-shepherd.jpg",
  "../image/dogsimages/Dog/Dog/beagle1.jpg",
  "../image/dogsimages/Dog/Dog/bichon-frise.jpg",
  "../image/dogsimages/Dog/Dog/border-collie.jpg",
  "../image/dogsimages/Dog/Dog/boxer.jpg",
  "../image/dogsimages/Dog/Dog/Chihuahua.jpg",
  "../image/dogsimages/Dog/Dog/cocker-spaniel.jpg",
  "../image/dogsimages/Dog/Dog/dachshund.jpg",
  "../image/dogsimages/Dog/Dog/doberman-pinscher.jpg",
  "../image/dogsimages/Dog/Dog/french-bulldog.jpg",
  "../image/dogsimages/Dog/Dog/great-dane.jpg",
  "../image/dogsimages/Dog/Dog/labrador1.jpg",
  "../image/dogsimages/Dog/Dog/rottweiler.jpg",
  "../image/dogsimages/Dog/Dog/yorkshire-terrier.jpg",
];
const dogNameArray = [
  "Australian Shepherd",
  "Beagle",
  "Bichon Frise",
  "Border Collie",
  "Boxer",
  "Chihuahua",
  "Cocker Spaniel",
  "Dachshund",
  "Doberman Pinscher",
  "French Bulldog",
  "Great Dane",
  "Labrador",
  "Rottweiler",
  "Yorkshire Terrier"
];
const dogImgSrcArray = [
  "dog-img5",
  "dog-img6",
  "dog-img7",
  "dog-img8",
  "dog-img9",
  "dog-img10",
  "dog-img11",
  "dog-img12",
];
const txtIdNameArray = [
  "dog-txt5",
  "dog-txt6",
  "dog-txt7",
  "dog-txt8",
  "dog-txt9",
  "dog-txt10",
  "dog-txt11",
  "dog-txt12",
];

function randomImg() {
  for (i = 0; i < dogImgSrcArray.length; i++) {
    let randomNumber = Math.floor(Math.random() * dogImageArray.length);
    let imgId = dogImgSrcArray[i];
    let imgPath = dogImageArray[randomNumber];

    let imgName = txtIdNameArray[i];
    let imgNameTo = dogNameArray[randomNumber];

    document.getElementById(imgId).src = imgPath;

    document.getElementById(imgName).innerHTML = imgNameTo;

    dogImageArray.splice(randomNumber, 1);
    dogNameArray.splice(randomNumber, 1);

  }
}

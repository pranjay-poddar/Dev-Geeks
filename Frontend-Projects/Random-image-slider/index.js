const slides = document.querySelectorAll(".slide")
var counter = 0;
// console.log(slides)
slides.forEach(
    (slide, index) => {
        slide.style.top = `${index * 100}%`
    }
)

const goPrev = () => {
    if(counter<=0){
        counter=4;
    }
    counter--
    slideImage()
}
var counter1=1;
const goNext = () => {
    if(counter>=3){
        counter=-1;
    }
    counter++;
    const main=document.getElementById("main");
const image1=document.getElementById("image1");
const image2=document.getElementById("image2");
const image3=document.getElementById("image3");
const image4=document.getElementById("image4");
let random=Math.floor(Math.random()*90)
console.log(random)
image1.src=`https://picsum.photos/id/${random}/1000/500`
image2.src=`https://picsum.photos/id/${random}/1000/500`
image3.src=`https://picsum.photos/id/${random}/1000/500`
image4.src=`https://picsum.photos/id/${random}/1000/500`
counter1++;
    slideImage()
}

const slideImage = () => {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateY(-${counter * 100}%)`
        }
    )
}


const slides = document.querySelectorAll(".slide")
var counter = 0;
// console.log(slides)
slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`
    }
)

const slideImage = () => {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
}
const input1=document.getElementById("input1");
const button1=document.getElementById("button1");
const first=document.getElementById("first");
var previous=0;
button1.addEventListener("click",function(){
    
    console.log(input1.value);
if(input1.value=="" ){
  
    alert("Please enter the type of image you want eg water,nature etc,.")
}else if(input1.value==previous ){
  
    alert("Please enter some different text")
}else{
    first.src=`https://source.unsplash.com/1000x500/?${input1.value}`;
}
previous=input1.value;
})



const btn=document.querySelector('.hamburger');
const img_button=document.getElementById('siderbar-img');
const side=document.querySelector('.siderbar');


btn.addEventListener('click',function () {
   if (side.classList.contains('show-sidebar')) {
    side.classList.remove('show-sidebar');
   }
   else{
    side.classList.add('show-sidebar');
   }
//    instead of if else use toggle
})


img_button.addEventListener('click',function(){
    side.classList.remove('show-sidebar');
})
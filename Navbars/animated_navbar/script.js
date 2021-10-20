
$(window).scroll(function(){
    if($(document).scrollTop() > 100){
      $('nav').addClass('animate');
    }else{
      $('nav').removeClass('animate');
    }
  })

//Day Mode
$(document).ready(function(){
    $('.mode').change(function(){
      if($(this).prop('checked')){
        $('.header').css('background-image', "url('CSS/images/daya.jpg')");
        $('.fwall').css('background-image', "url('CSS/images/dayb.jpg')");
        $('footer-brand').css('background-color', "white");
        $('.logo').css('background-image', "url('CSS/images/logo2.png')");
        $('body').css('background-color', "white");
        $('.mirado').css('color', "white");
        $('.card-body').css('background-color', "white");
        $('h3').css('color', "black");
        $('p').css('color', "black");
      }
      else{
        $('.header').css('background-image', "url('CSS/images/night.jpg')");
        $('.fwall').css('background-image', "url('CSS/images/Mountain.jpg')");
        $('.logo').css('background-image', "url('CSS/images/logo and text.png')");
        $('body').css('background-color', "black");
        $('.card-body').css('background-color', "black");
        $('h3').css('color', "white");
        $('p').css('color', "white");
      }
    });
  });
  $('.navbar-toggler-icon').click(function(){
  var get = $('.map');
  var gett = $('.maplink');
  get.remove();
  gett.remove();
  });
  
  // $(document).ready(function(){
  //     $('.mode').change(function(){
  //       if($(this).prop('checked')){
  //         $('.header').css('background-image', "url('CSS/images/daya.jpg')");
  //         $('.fwall').css('background-image', "url('CSS/images/dayb.jpg')");
  //         $('.footer-brand').style('background-image', "url('CSS/images/logo and text dark.png')");
  //         $('body').css('background-color', "white");
  //         $('.mirado').css('color', "white");
  //         $('.card-body').css('background-color', "white");
  
  //         // $('h5').css('color', "black");
  //         $('h3').css('color', "black");
  //         $('p').css('color', "black");
  //         $('.card-deck a').css('color', "gray");
  //         $('.footer p').css('color', "black");
  //         $(".footer").css({"top": "900px"});
  //       }
  //       else{
  //         $('.header').css('background-image', "url('CSS/images/night.jpg')");
  //         $('.fwall').css('background-image', "url('CSS/images/Mountain.jpg')");
  //         $('.foot').style('background-image', "url('CSS/images/logo and text.png')");
  //         $('body').css('background-color', "black");
  //         $('.card-body').css('background-color', "black");
  //         $('h3').css('color', "white");
  //         $('p').css('color', "white");
  //       }
  //     });
  // });
  // $('.navbar-toggler-icon').click(function(){
  //   var get = $('.map');
  //   var gett = $('.maplink');
  //   get.remove();
  //   gett.remove();
  // });
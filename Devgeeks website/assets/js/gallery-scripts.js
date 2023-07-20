/* $('.gallery-menu').click(() => {
    $('.gallery-menu ul button').removeClass('active');
    $(this).addClass('active');
    
    
    return  false;
}); */

$(document).ready(() => {
  let popup_btn = $(".popup-btn");
  popup_btn.magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
    image: {
      // options for image content type
      titleSrc: "title",
    },
  });

  $(".gallery-menu button").on("click", (e) => {
    $(".gallery-menu button").removeClass("active");
    $(e.target).addClass("active");
    let selector = $(e.target).attr("data-filter");
    $(".gallery-item").isotope({ filter: selector });

    return false;
  });
});

$(".heading").click(function () {
    $(".card").css({ "visibility": "visible" });
});

$('.bttn').click(
    function () {
        var newli = $('input[name=listarea]').val();
        $('ol').append('<li>' + newli + '</li>');
        $(".searcharea").val('');
        $(".list_section").css({ "visibility": "visible" });
    });

$("input[name=listarea]").keyup(function (e) {
    if (e.keyCode == 13) {
        $(".bttn").click();
    }
});

$(document).on('dblclick', 'li', function () {
    $(this).toggleClass('del').fadeOut('slow');
});

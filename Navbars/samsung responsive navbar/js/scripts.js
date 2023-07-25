$(document).ready(function () {
	$('ul li').click(function () {
		$('.dd').slideUp();
		var data = '.' + $(this).attr('data-cat');
		$(data).slideDown();
		$(data).mouseleave(function () {
			$(this).slideUp();
		});
	});
	$(window).resize(function () {
		$('.side-menu').hide(500);
		$('.dd').slideUp();
	});
	$('.fa-magnifying-glass').click(function () {
		$('.search').slideDown();
	});

	$('.cross').click(function () {
		$('.search').slideUp();
	});
	$('.cross-ham').click(function () {
		$('.side-menu').hide(500);
	});
	$('.fa-bars').click(function () {
		$('.side-menu').show(500);
	});

	$('.input-menu').focus(function () {
		$('.search').slideDown();
		$('.side-menu').hide(500);
		$('.menu').hide(500);
	});

	$('.x').click(function () {
		var a = '.' + $(this).attr('data-fe');
		var cross = a + '-cross';
		var back = a + '-back';

		$(a).show(500);
		$('.side-menu').hide(500);

		$(cross).click(function () {
			$(a).hide(500);
			$('.side-menu').hide(500);
		});
		$(back).click(function () {
			$(a).hide(500);
			$('.side-menu').show(500);
		});
	});
});

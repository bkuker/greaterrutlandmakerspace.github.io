$('body').scrollspy({
	target : '.navbar-fixed-top'
})

$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});

$(function() {
	$('body').on('click', '.page-scroll a', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop : $($anchor.attr('href')).offset().top
		}, 1500, 'easeOutExpo');
		event.preventDefault();
	});
});

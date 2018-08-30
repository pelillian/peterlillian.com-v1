(function ($) {
	'use strict';
	$(document).ready(function () {
		var $main = $('#main'),
			transition = 'fade',
			smoothState;

		// this code fixes the back and forward buttons upon refresh
		var current = $('#swap').data('current');
		if (current === 0) {
			transition = 'moveright';
		} else {
			transition = 'moveleft';
		}
		smoothState = $main.smoothState({
			onBefore: function ($anchor, $container) {
				var current = $anchor.data('current'),
					target = $anchor.data('target');
				if (current === target) {
					transition = 'fade';
				} else if (current < target) {
					transition = 'moveright';
				} else {
					transition = 'moveleft';
				}
				// back and forward buttons don't trigger onBefore
			},
			onStart: {
				duration: 500,
				render: function (url, $container) {
					$main.attr('data-transition', transition);
					//					$main.append(transition);
					$main.addClass('is-exiting');
				}
			},
			onReady: {
				duration: 0,
				render: function ($container, $newContent) {
					var current = $('#swap').data('current');
					var target = $newContent.data('current');
					if (target === 5) {
						location.reload(true);
					} else {
						$container.html($newContent);
						$container.removeClass('is-exiting');

						// this code fixes the back and forward buttons

						if (current === target) {
							transition = 'fade';
						} else if (current > target) {
							transition = 'moveright';
						} else {
							transition = 'moveleft';
						}
					}
				}
			}
		}).data('smoothState');
	});
}(jQuery));

window.onload = function () {
	//	var folder = $(".swiper-container").data('folder');
	if ($('.swiper-container').length > 0) {
		var swiper = new Swiper('.swiper-container', {
			zoom: true,
			loop: true,
			//		pagination: '.swiper-pagination',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});
		$(".swiper-container").append("<style>* {overflow-x: visible;}</style>");
	}
	//	
	//	// I think that this ajax code adds about one second to page load time. FIX IT
	//	$.ajax({
	//		url: folder,
	//		success: function (data) {
	//			$(data).find("a").attr("href", function (i, val) {
	//				if (val.match(/\.(jpe?g|png|gif|svg)$/)) {
	////					swiper.appendSlide(folder + val);
	//					swiper.appendSlide("<div class='swiper-slide'><div class='swiper-zoom-container'><img class='big-img' src='" + folder + val + "'></div></div>");
	//				}
	//			});
	//		}
	//	});
	//	
	//	$(".swiper-container").append("<style>* {overflow-x: visible;}</style>");
	//	// call update in the loop? would this be faster idk
	//	swiper.update();
	//	
	//	swiper.slideTo(1, 0, false);
};
(function ($) {
	'use strict';
	$(document).ready(function () {
		var loading = $('.gallery-loading');
		if ( loading.length && (! $('#main-swiper').hasClass("loaded")) ) {
			console.log('main-swiper');
			loading.html('<div class="la-line-scale la-dark"><div></div><div></div><div></div><div></div><div></div></div>');
		} else {
			loading.html('Swipe to view images...');
		}

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
	var loading = $('.gallery-loading');
	loading.fadeOut(function(){
		loading.html('Swipe to view images...');
		$('#main-swiper').addClass('loaded');
		loading.fadeIn();
	});
};


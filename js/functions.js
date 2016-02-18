;(function($, window, document, undefined) {
	'use strict';
	
	// Initial Variables
	var $win = $(window);
	var $doc = $(document);
	var isFullPageInitialized = false;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf('android') > -1;
	var $wrapper, $apps, $appsList;

	function initFullPage() {
		isFullPageInitialized = true;

		$wrapper.fullpage({
			css3: true,
			navigation: true,
			navigationPosition: 'left',
			controlArrows: false,
			resize: true,
			onLeave: function(index, newIndex, direction) {
				var $currentSection = $('.section').eq(newIndex - 1);
				var lastSectionIndex = $('.section:last-child').index() + 1;

				$('.section-scroll').toggleClass('hidden', lastSectionIndex === newIndex);

				$apps
					.toggleClass('apps-visible', $currentSection.data('apps'))
					.toggleClass('apps-rotated', $currentSection.data('apps-rotate'));

				$appsList.css({
					'transform': 'translateY(-' + $currentSection.data('app-index') * 100 + '%)'
				});
			}
		});
	};

	function buildFullPage() {
		// Fullpage init
		// http://alvarotrigo.com/fullPage/
		if ( $win.width() < 768 ) {
			$('.section-mobile-only').addClass('section').appendTo($wrapper);
		} else {
			$('.section-mobile-only').removeClass('section').insertAfter($wrapper);
		};

		if ( isFullPageInitialized ) {
			$.fn.fullpage.destroy('all');
		};

		initFullPage();
	};

	$doc.ready(function() {
		// Variables Assignment
		$wrapper = $('#wrapper');
		$apps = $('#apps');
		$appsList = $('#appsList');

		// Fullsize images as backgrounds
		$('.fullsize').each(function() {
			var $img = $(this);

			$img.addClass('hidden').parent().addClass('wrapper-fullsize').css('background-image', 'url(' + $img.attr('src') + ')');
		});

		buildFullPage();

		// Scroll to next section
		$('.section-scroll').on('click', function(event) {
			event.preventDefault();

			$.fn.fullpage.moveSectionDown();
		});

		$win.on('resize', function() {
			buildFullPage();
		});

		if ( isAndroid ) {
			$('html').addClass('android-os');
		};
	});
})(jQuery, window, document);

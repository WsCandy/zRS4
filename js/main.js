;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 500,
		delay: 6000,
		transition: 'slide',
		// direction: 'reverse',
		pager: '.zRS__pager',
		visibleSlides: 3,
		slideSpacing: 0.5,
		slideBy: 1,
		setVisibleSlides: {

			500: 1

		},
		controls: ['.zRS__nav--next', '.zRS__nav--prev'],
		infinite: false
		// keyboardControls: false

	});

	console.log(slider);

})(window);
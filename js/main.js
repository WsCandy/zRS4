;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 500,
		delay: 6000,
		transition: 'slide',
		// direction: 'reverse',
		pager: '.zRS__pager',
		visibleSlides: 1,
		slideSpacing: 1,
		slideBy: 2,
		controls: ['.zRS__nav--next', '.zRS__nav--prev'],
		// keyboardControls: false

	});

	console.log(slider);

})(window);
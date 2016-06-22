;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 500,
		delay: 5000,
		transition: 'slide',
		// direction: 'reverse',
		pager: '.zRS__pager',
		visibleSlides: 2,
		slideSpacing: 1,
		slideBy: 1,
		controls: ['.zRS__nav--next', '.zRS__nav--prev'],
		// keyboardControls: false

	});

	console.log(slider);

})(window);
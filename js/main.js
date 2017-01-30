;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 750,
		delay: 5000,
		transition: 'slide',
		//direction: 'reverse',
		pager: '.zRS__pager',
		visibleSlides: 2,
		slideSpacing: 0,
		slideBy: 1,
		setVisibleSlides: {

			500: 1

		},
		controls: ['.zRS__nav--next', '.zRS__nav--prev'],
		alignment: 0.5,
		infinite: false,
		verbose: true,
		//freeStyle: true,
		// friction: 0.1
		//drag: false
		//keyboardControls: false

	});

	//
	//cont.addEventListener('after', function(e) {
	//
	//	console.log(e.detail);
	//
	//});

})(window);
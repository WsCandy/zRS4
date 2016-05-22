;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 500,
		delay: 5000,
		direction: 'reverse',
		pager: '.zRS__pager',
		controls: ['.zRS__nav--next', '.zRS__nav--prev'],
		// keyboardControls: false

	});

})(window);
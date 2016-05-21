;(function(window) {

	var cont = document.getElementById('zRS');

	cont.addEventListener('play', function(e) {

		console.log('play');

	});

	window.slider = new zRS(cont, {

		speed: 500,
		delay: 500,
		direction: 'reverse',
		pager: '.zRS__pager',
		controls: ['.zRS__nav--next', '.zRS__nav--prev']

	});

})(window);
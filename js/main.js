;(function(window) {

	var cont = document.getElementById('zRS');

	cont.addEventListener('play', function(e) {

		console.log('play');

	});

	window.slider = new zRS(cont, {

		speed: 500,
		pager: '.zRS__pager',
		controls: ['.zRS__nav--next', '.zRS__nav--prev']

	});

})(window);
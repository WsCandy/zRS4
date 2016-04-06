;(function(window) {

	var cont = document.getElementById('zRS');

	window.slider = new zRS(cont, {

		speed: 500,
		pager: '.zRS__pager',
		controls: ['.zRS__nav--next', '.zRS__nav--prev']

	});

})(window);
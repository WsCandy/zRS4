;(function(window) {

	var cont = document.getElementById('zRS');

	cont.addEventListener('load', function() {

		alert('loaded');

	});

	window.slider = new zRS(cont, {

		transition: 'fade'

	});

})(window);
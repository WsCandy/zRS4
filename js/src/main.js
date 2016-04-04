;(function(window) {

	var cont = document.getElementById('zRS');

	cont.addEventListener('load', function(e) {

		console.log(this);

	});

	cont.addEventListener('before', function(e) {

		// console.log(e.detail);

	});

	cont.addEventListener('after', function(e) {

		console.log(e.detail);

	});

	window.slider = new zRS(cont, {

		speed: 500

	});

})(window);
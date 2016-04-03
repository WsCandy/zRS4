;(function(window) {

	var cont = document.getElementById('zRS');

	cont.addEventListener('load', function(e) {

		console.log(this);

	});

	cont.addEventListener('before', function(e) {

		console.log(e.detail);

	});

	window.slider = new zRS(cont, {

		transition: 'awdaw',
		delay: 1000

	});

})(window);
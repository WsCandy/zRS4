;(function(window) {

	document.getElementById('zRS').addEventListener('load', function() {

		alert('loaded');

	});

	window.slider = new zRS('#zRS', {

		//transition: 'slide'

	});

})(window);
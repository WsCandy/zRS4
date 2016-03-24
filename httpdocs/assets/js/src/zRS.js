var zRS = function(element, options) {

	var version = '4.0.1';

	var ins = this;
	var defaults = {

		option: 1,
		example: 2

	};
	var settings = defaults;
	var modules = {

		setUp: {

			init: function() {

				if(modules.setUp.setContainer() === false) {

					modules.util.log('Initialisation aborted, please make sure your selectors are correct', 'error');

					return;

				}

				modules.setUp.setOptions(options);

			},

			setOptions: function(update) {

				if(!update) {

					return;

				}

				if(typeof update !== 'object') {

					modules.util.log('Please provide an object to this method', 'warn');
					return;

				}

				for(var option in defaults) {

					if(defaults.hasOwnProperty(option)) {

						if(update[option] === undefined) {

							settings[option] = defaults[option];
							continue;

						}

						settings[option] = update[option];

					}

				}

			},

			setContainer: function() {

				switch(element[0]) {

					case '.' :

						ins.elements.slider = document.querySelectorAll(element);

					break;

					case '#' :

						ins.elements.slider = document.getElementById(element.substr(1));

					break;

					default:

						return false;

					break;

				}

				console.log(ins.elements.slider);

			}

		},

		controls: {},

		transitions: {},

		util: {

			log: function(message, type) {

				type = type ? type : 'log';

				console[type]('[zRS ' + version + ']: ' + message);

			}

		}

	};

	var __construct = function() {

		modules.setUp.init();

	};

	/**
	 * Public Properties
	 */

	ins.setOptions = modules.setUp.setOptions;
	ins.elements = {};

	/**
	 * Construct
	 */

	__construct();

	window.zRS = zRS;

};

module.exports = zRS;
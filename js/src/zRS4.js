;(function(window) {

	'use strict';

	window.zRS = function(element, options) {

		var version = '4.0.1';

		var ins = this;
		var defaults = {

			option: 1,
			example: 2

		};
		var settings = defaults;
		var modules = {

			setUp: {

				setOptions: function(update) {

					if(!update) { return; }

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

				}

			},

			elements: {},

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

			modules.setUp.setOptions(options);

		};

		/**
		 * Public Properties
		 */

		ins.setOptions = modules.setUp.setOptions;

		/**
		 * Construct
		 */

		__construct();

	};

})(window);
var zRSUtil = require('./zRSUtil');

;(function(window) {

	'use strict';

	class zRS {

		constructor(element, options) {

			this.version = `4.0.1`;
			this.element = element;
			this.elements = {};
			this.defaults = this.settings = {

				option: 1,
				example: 2

			};

			if(this.setContainer() === false) {

				zRSUtil.log(`Initialisation aborted, please make sure your selectors are correct`, `error`);

				return;

			}

			this.setOptions(options);

		}

		setOptions(update) {

			if(!update) {

				return;

			}

			if(typeof update !== 'object') {

				zRSUtil.log(`Please provide an object to this method`, `warn`);

				return;

			}

			for(var option in this.defaults) {

				if(this.defaults.hasOwnProperty(option)) {

					if(update[option] === undefined) {

						this.settings[option] = this.defaults[option];
						continue;

					}

					this.settings[option] = update[option];

				}

			}

		}

		setContainer() {

			switch(this.element[0]) {

				case '.' :

					this.elements.slider = document.querySelectorAll(this.element);

					break;

				case '#' :

					this.elements.slider = document.getElementById(this.element.substr(1));

					break;

				default:

					return false;

					break;

			}

		}

	}

	window.zRS = zRS;

})(window);
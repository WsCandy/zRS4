import zRS_util from './zRS_util';
import zRS_core from './zRS_core';

(function(window) {

	'use strict';

	class zRS {

		static version() {

			return `4.0.1`;

		}

		constructor(element, options = {}) {

			this.element = element;
			this.defaults = this.settings = {

				transition: 'fade',
				inner: '.zRS__inner',
				slides: 'zRS__slide',
				delay: 5000,
				direction: 'forward'

			};

			if(this.setContainer() === false) {

				zRS_util.log(`Cannot find container, stopping initialisation`, `error`);

				return;

			}

			this.setOptions(options);
			this.setObjects();

			return this.core;

		}

		setOptions(update) {

			if(!update) {

				return;

			}

			if(typeof update !== 'object') {

				zRS_util.log(`Please provide an object for this method`, `warn`);

				return;

			}

			for(let [key, value] of zRS_util.interateObj(this.defaults)) {

				if(update[key] === undefined) {

					this.settings[key] = value;
					continue;

				}

				this.settings[key] = update[key];

			}

		}

		setContainer() {

			if(typeof this.element === 'string') {

				switch(this.element[0]) {

					case '.' :

						this.sliders = document.querySelectorAll(this.element);

						break;

					case '#' :

						this.sliders = document.getElementById(this.element.substr(1));

						break;

					default:

						return false;

						break;

				}

			} else if(typeof this.element === 'object') {

				this.sliders = this.element;

			} else {

				return false;

			}

		}

		setObjects() {

			if(this.sliders.length) {

				this.core = [];

				for(let slider of this.sliders) {

					this.core[i] = new zRS_core(slider, this.settings);

				}

			} else {

				this.core = new zRS_core(this.sliders, this.settings);

			}

		}

	}

	window.zRS = zRS;

})(window);
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
				inner: '.zRS__inner'

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

			for(let option in this.defaults) {

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

				for(let i = 0, l = this.sliders.length; i < l; i++) {

					this.core[i] = new zRS_core(this.sliders[i], this.settings);

				}

			} else {

				this.core = new zRS_core(this.sliders, this.settings);

			}

		}

	}

	window.zRS = zRS;

})(window);
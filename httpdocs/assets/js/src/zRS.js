import zRSUtil from './zRSUtil';
import zRSCore from './zRSCore';

(function(window) {

	'use strict';

	class zRS {

		static version() {

			return `4.0.1`;

		}

		constructor(element, options = {}) {

			this.element = element;
			this.defaults = this.settings = {

				option: 1,
				example: 2

			};

			if(this.setContainer() === false) {

				zRSUtil.log(`Cannot find container, stopping initialisation`, `error`);

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

				zRSUtil.log(`Please provide an object for this method`, `warn`);

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

		}

		setObjects() {

			if(this.sliders.length) {

				this.core = [];

				for(let i = 0, l = this.sliders.length; i < l; i++) {

					this.core[i] = new zRSCore(this.settings);

				}

			} else {

				this.core = new zRSCore(this.settings);

			}

		}

	}

	window.zRS = zRS;

})(window);
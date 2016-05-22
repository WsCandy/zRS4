require('core-js/es6/symbol');
require('core-js/es6/promise');

import zRS_util from './zRS_util';
import zRS_core from './zRS_core';

(function(window) {

	'use strict';

	class zRS {

		static version() {

			return `4.0.0`;

		}

		constructor(element, options = {}) {

			this.element = element;
			this.defaults = this.settings = {

				transition: 'fade',
				inner: '.zRS__inner',
				slides: 'zRS__slide',
				controls: [],
				pager: null,
				delay: 5000,
				speed: 1000,
				slideBy: 1,
				direction: 'forward',
				keyboardControls: true

			};

			this.sliders = zRS_util.findElement(this.element);

			if(this.sliders === false) {

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

			for(let key in this.defaults) {

				if(this.defaults.hasOwnProperty(key)) {

					if(update[key] === undefined) {

						this.settings[key] = this.defaults[key];
						continue;

					}

					this.settings[key] = update[key];

				}

			}

			if(this.settings.direction === 'back') {

				this.settings.slideBy = -Math.abs(this.settings.slideBy);

			}

		}

		setObjects() {

			if(this.sliders.length) {

				this.core = [];

				for(let key in this.sliders) {

					if(this.sliders.hasOwnProperty(key)) {

						this.core[key] = new zRS_core(this.sliders[key], this.settings);

					}

				}

			} else {

				this.core = new zRS_core(this.sliders, this.settings);

			}

		}

	}

	window.zRS = zRS;

})(window);
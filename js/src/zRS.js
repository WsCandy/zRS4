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
				pager: null,
				delay: 5000,
				speed: 1000,
				slideBy: 1,
				visibleSlides: 1,
				direction: 'forward'

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

			for(let [key, value] of zRS_util.interateObj(this.defaults)) {

				if(update[key] === undefined) {

					this.settings[key] = value;
					continue;

				}

				this.settings[key] = update[key];

			}

			if(this.settings.direction === 'back') {

				this.settings.slideBy = -Math.abs(this.settings.slideBy);

			}

		}

		setObjects() {

			if(this.sliders.length) {

				this.core = [];

				for(let [key, element] of zRS_util.interateObj(this.sliders)) {

					this.core[key] = new zRS_core(element, this.settings);

				}

			} else {

				this.core = new zRS_core(this.sliders, this.settings);

			}

		}

	}

	window.zRS = zRS;

})(window);
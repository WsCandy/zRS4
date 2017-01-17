'use strict';

require('core-js/es6/symbol');
require('core-js/es6/promise');

import zRS_util from './zRS_util';
import zRS_core from './zRS_core';

class zRS {

	static version() {

		return `4.0.0`;

	}

	constructor(element, options = {}) {

		this.element = element;
		this.instances = {};
		this.defaults = this.settings = {

			transition: 'fade',
			inner: '.zRS__inner',
			slides: 'zRS__slide',
			controls: [],
			pager: null,
			delay: 5000,
			speed: 1000,
			slideBy: 1,
			slideSpacing: 0,
			direction: 'forward',
			alignment: 'left',
			keyboardControls: true,
			visibleSlides: 1,
			setVisibleSlides: null,
			drag: true,
			infinite: true,
			verbose: false,
			freeStyle: false

		};

		this.sliders = zRS_util.findElement(document, this.element);

		if(!this.sliders || this.sliders.length === 0) {

			return;

		}

		this.setOptions(options);
		this.setObjects();

		return this.instances;

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

		if(this.settings.direction === 'reverse') {

			this.settings.slideBy = -Math.abs(this.settings.slideBy);

		}

		

	}

	setObjects() {

		if(this.sliders.length) {

			for(let i = 0, l = this.sliders.length; i < l; i++) {

				let id = this.sliders[i].getAttribute('id') || i;

				this.instances[id] = new zRS_core(this.sliders[i], this.settings);

			}

		} else {

			this.instances = new zRS_core(this.sliders, this.settings);

		}

	}

}

window.zRS = zRS;

export default zRS;
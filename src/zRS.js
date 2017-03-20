//@flow

'use strict';

import zRS_util from './zRS_util';
import zRS_core from './zRS_core';

type Settings = {

	transition: string,
	inner: string,
	slides: string,
	controls: Array<HTMLElement>,
	pager: Array<string> | null,
	delay: number,
	speed: number,
	slideBy: number,
	slideSpacing: number,
	direction: string,
	keyboardControls: boolean,
	alignment: number | string,
	visibleSlides: number,
	setVisibleSlides: null | {[key: number] : number},
	drag: boolean,
	infinite: boolean,
	verbose: boolean,
	freeStyle: boolean,
	friction: number

};

type Instances = zRS_core | {[key: any] : zRS_core};

class zRS {

	element: string | Array<HTMLElement> | HTMLElement;
	defaults: Settings;
	settings: Settings;
	sliders: boolean | Array<HTMLElement> | HTMLElement;
	instances: Instances;

	static version() {

		return `4.1.1`;

	}

	constructor(element: string | Array<HTMLElement> | HTMLElement, options: {} = {}): Instances {

		this.element = element;
		this.instances = {};
		this.defaults = this.settings = {

			transition: 'fade',
			inner: '.zRS__inner',
			slides: 'zRS__slide',
			controls: [],
			pager: null,
			delay: 5000,
			speed: 750,
			slideBy: 1,
			slideSpacing: 0,
			direction: 'forward',
			keyboardControls: true,
			alignment: 0,
			visibleSlides: 1,
			setVisibleSlides: null,
			drag: true,
			infinite: true,
			verbose: false,
			freeStyle: false,
			friction: 0.35

		};

		this.sliders = zRS_util.findElement(document, this.element);

		if(!this.sliders || this.sliders.length === 0) {

			return;

		}

		this.setOptions(options);
		this.setObjects();

		return this.instances;

	}

	setOptions(update: {}): void {

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

		this.manipulateOptions();

	}

	manipulateOptions(): void {

		if(this.settings.direction === 'reverse') {

			this.settings.slideBy = -Math.abs(this.settings.slideBy);

		}

		if(this.settings.transition === 'fade') {

			this.settings.visibleSlides = 1;

		}

		if(typeof this.settings.alignment === 'string') {

			switch(this.settings.alignment) {

				case 'right' :

					this.settings.alignment = 1;

					break;

				case 'center' :

					this.settings.alignment = 0.5;

					break;

				default :

					this.settings.alignment = 0;

					break;

			}

		}

		if(typeof this.settings.alignment !== 'number') {

			zRS_util.log('Alignment setting needs to be either an int or a string. Transition will not function correctly until rectified.', 'error', this.settings.verbose);

			return;

		}

		this.settings.alignment = Math.min(this.settings.alignment, 1);
		this.settings.alignment = Math.max(this.settings.alignment, 0);

	}

	setObjects(): void {

		if(typeof this.sliders === 'object' && this.sliders.length > 0) {

			for(let i = 0, l = this.sliders.length; i < l; i++) {

				let slider: HTMLElement = this.sliders[i],
					id = slider.getAttribute('id') || i;

				this.instances[id] = new zRS_core(slider, this.settings);

			}

		} else {

			this.instances = new zRS_core(this.sliders, this.settings);

		}

	}

}

export default zRS;
import zRS_util from './zRS_util';

class zRS_fade {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;

		this.setup();

	}

	setup() {

		this.styleSlides();

	}

	styleSlides() {

		for(let [key, element] of zRS_util.interateObj(this.elements.slides)) {

			element.style.width = '100%';
			element.style.top = '0';
			element.style.left = '0';

			if(key === '0') {
				
				element.style.position = 'relative';
				element.style.zIndex = 1;
				element.style.opacity = 1;

				continue;

			}

			element.style.position = 'absolute';
			element.style.zIndex = 0;
			element.style.opacity = 0;

		}

	}

	next() {

		console.log('next');

	}

	prev() {

		console.log('prev');

	}

}

export default zRS_fade;
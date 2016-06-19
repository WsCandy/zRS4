import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.animations = {};

		this.styleSlides();

	}

	styleSlides() {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

		}

	}

	animate(key, element, opacity = 0, prevSlide, speed) {

		zRS_util.dispatchEvent({

			name: 'after',
			event: this.events.after,
			element: this.elements.slider

		});

	}

	handle(nextSlide, prevSlide, speed) {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

			

		}

	}

}

export default zRS_slide;
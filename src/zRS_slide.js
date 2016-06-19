import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.animations = {};
		this.maxTransform = this.elements.slides.length * 100;

		this.setUp();
		this.styleSlides();

	}

	setUp() {

		this.elements.slider.style.overflow = 'hidden';
		this.elements.inner.style.overflow = null;

	}

	styleSlides() {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

			if(i !== 0) {

				element.style.position = 'absolute';

			}

			element.style.top = 0;
			element.style.left = `${(100 / this.options.visibleSlides) * i}%`;
			element.style.zIndex = 1;

			element.style.width = `${100 / this.options.visibleSlides}%`;

		}

	}

	animate(nextSlide, prevSlide, speed) {

		this.animations[0] = zRS_util.animationFrame(() => {

			this.elements.inner.style.transform = `translate3d(-${10}%, 0, 0)`;

			// if(Math.min(position, 100 * nextSlide) !== (100 * nextSlide)) {
			//
			// 	this.animate(nextSlide, prevSlide, speed);
			//
			// 	return;
			//
			// }

			this.events.after = zRS_util.createEvent('after', {

				current: parseInt(nextSlide),
				currentSlide: this.elements.slides[nextSlide],
				prev: parseInt(prevSlide),
				prevSlide: this.elements.slides[prevSlide]

			});

			zRS_util.dispatchEvent({

				name: 'after',
				event: this.events.after,
				element: this.elements.slider

			});

		});

	}

	handle(nextSlide, prevSlide, speed) {

		this.animate(nextSlide, prevSlide, speed);

	}

}

export default zRS_slide;
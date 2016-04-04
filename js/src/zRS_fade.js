import zRS_util from './zRS_util';

class zRS_fade {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.animations = {};

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
			element.style.opacity = 1;

			if(key === '0') {

				element.style.position = 'relative';
				element.style.zIndex = 2;

				continue;

			}

			element.style.position = 'absolute';
			element.style.zIndex = 0;

		}

	}

	animate(key, element, opacity = 0, prevSlide) {

		opacity += ((1000 / 60) / this.options.speed);

		this.animations[key] = requestAnimationFrame(() => {

			element.style.opacity = Math.min(opacity, 1);

			if(Math.min(opacity, 1) !== 1) {

				this.animate(key, element, opacity, prevSlide);

				return;

			}

			this.events.after = zRS_util.createEvent('after', {

				current : parseInt(key),
				currentSlide : this.elements.slides[key],
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

	handle(nextSlide, prevSlide) {

		for(let [key, element] of zRS_util.interateObj(this.elements.slides)) {

			if(element === this.elements.slides[prevSlide]) {

				element.style.zIndex = 1;
				continue;

			}

			if(element === this.elements.slides[nextSlide]) {

				element.style.zIndex = 2;

				this.animate(key, element, 0, prevSlide);

				continue;

			}

			element.style.zIndex = 0;

		}

	}

}

export default zRS_fade;
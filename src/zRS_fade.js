import zRS_util from './zRS_util';

class zRS_fade {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.lazy = data.lazy;
		this.animations = {};

		this.styleSlides();

	}

	styleSlides() {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

			element.style.width = '100%';
			element.style.top = '0';
			element.style.left = '0';
			element.style.opacity = 1;
			element.style.transform = 'translateZ(0)';

			if(i === 0) {

				element.style.position = 'relative';
				element.style.zIndex = 2;

				continue;

			}

			element.style.position = 'absolute';
			element.style.zIndex = 0;
			element.style.opacity = 0;

		}

	}

	animate(key, element, opacity = 0, prevSlide, speed) {

		opacity += ((1000 / 60) / speed);

		this.animations[key] = zRS_util.animationFrame(() => {

			element.style.opacity = Math.min(opacity, 1);

			if(Math.min(opacity, 1) !== 1) {

				this.animate(key, element, opacity, prevSlide, speed);

				return;

			}

			this.elements.slides[prevSlide].style.opacity = 0;

			this.event = zRS_util.createEvent('after', {

				current : parseInt(key),
				currentSlide : this.elements.slides[key],
				prev: parseInt(prevSlide),
				prevSlide: this.elements.slides[prevSlide]

			});

			zRS_util.dispatchEvent({

				name: 'after',
				event: this.event,
				element: this.elements.slider

			});

		});

	}

	handle(nextSlide, prevSlide, speed) {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

			if(element === this.elements.slides[prevSlide]) {

				element.style.zIndex = 1;
				element.style.position = 'absolute';
				continue;

			}

			if(element === this.elements.slides[nextSlide]) {

				element.style.zIndex = 2;
				element.style.position = 'relative';
				this.animate(i, element, 0, prevSlide, speed);

				continue;

			}

			element.style.zIndex = 0;

		}

	}

}

export default zRS_fade;
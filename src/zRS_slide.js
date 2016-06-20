import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.maxTransform = this.elements.slides.length * 100;
		this.currentPos = 0;
		this.remaining = 0;
		this.distance = 0;

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

	calculatePosition(speed) {

		let increment = ((1000 / 60) / speed) * this.distance;

		this.remaining -= increment;
		this.currentPos += increment;

		if(this.direction !== 'forward') {

			this.remaining = Math.min(0, this.remaining);
			this.currentPos = Math.abs(this.currentPos) >= this.maxTransform ? Math.abs(this.currentPos) - this.maxTransform : this.currentPos;

		} else {

			this.remaining = Math.max(0, this.remaining);
			this.currentPos = this.currentPos > 0 ? -Math.abs(this.maxTransform) : this.currentPos;

		}

		this.positionInner();

	}

	positionInner() {

		this.elements.inner.style.transform = `translate3d(${this.currentPos}%, 0, 0)`;

	}
	
	animate(nextSlide, prevSlide, speed) {

		this.animation = zRS_util.animationFrame(() => {

			this.calculatePosition(speed);
			this.coordinateSlides(nextSlide);

			if(this.remaining !== 0) {

				this.animate(nextSlide, prevSlide, speed);

				return;

			}

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

	coordinateSlides(nextSlide) {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			if(this.elements.slides[i] !== this.elements.slides[nextSlide]) {

				this.elements.slides[i].style.position = 'absolute';
				continue;

			}

			this.elements.slides[i].style.position = 'relative';

		}

		if(Math.abs(this.currentPos) > 100) {

			this.elements.slides[0].style.left = `${this.maxTransform}%`;

		} else {

			this.elements.slides[0].style.left = 0;

		}

	}

	handle(nextSlide, prevSlide, speed, steps) {

		cancelAnimationFrame(this.animation);

		if(steps >= 0) {

			this.remaining -= 100;
			this.direction = 'reverse';

		} else {

			this.remaining += 100;
			this.direction = 'forward';

		}

		this.distance = this.remaining;

		this.animate(nextSlide, prevSlide, speed);

	}

}

export default zRS_slide;
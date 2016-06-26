import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.minTransform = -Math.abs(this.elements.slides.length * ((100 / this.options.visibleSlides) + this.options.slideSpacing));
		this.currentPos = 0;
		this.remaining = 0;
		this.distance = 0;

		this.setUp();
		this.styleSlides();

	}

	setUp() {

		this.elements.inner.style.overflow = null;
		this.elements.slider.style.overflow = 'hidden';
		this.elements.inner.style.transform = 'translate3d(0%, 0, 0)';

	}

	styleSlides() {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			let element = this.elements.slides[i];

			if(i !== 0) {

				element.style.position = 'absolute';

			} else {

				element.style.position = 'relative';

			}

			element.style.top = 0;
			element.style.left = `${((100 / this.options.visibleSlides) + this.options.slideSpacing) * i}%`;
			element.style.zIndex = 1;
			element.style.width = `${(100 / this.options.visibleSlides) - (this.options.visibleSlides > 1 ? this.options.slideSpacing : 0)}%`;

		}

	}

	calculatePosition(speed) {

		let increment = ((1000 / 60) / speed) * this.distance;

		increment = this.distance < 0 ? Math.max(increment, this.distance) : Math.min(increment, this.distance);

		this.remaining -= increment;
		this.remaining = this.distance < 0 ? Math.min(0, this.remaining) : Math.max(0, this.remaining);

		if(increment === this.distance) {

			this.currentPos += increment;

		}

		if(this.remaining === 0) {

			this.currentPos = Math.round(this.currentPos / ((100 / this.options.visibleSlides) + this.options.slideSpacing)) * ((100 / this.options.visibleSlides) + this.options.slideSpacing);
			this.positionInner();

			return;

		}

		this.currentPos += increment;

		if(this.options.infinite === true) {

			this.currentPos = this.currentPos <= this.minTransform ? this.currentPos - this.minTransform : this.currentPos;
			this.currentPos = this.currentPos > 0 ? this.currentPos + this.minTransform : this.currentPos;

		}

		this.positionInner();

	}

	coordinateSlides(nextSlide) {

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			if(this.elements.slides[i] !== this.elements.slides[nextSlide]) {

				this.elements.slides[i].style.position = 'absolute';
				continue;

			}

			this.elements.slides[i].style.position = 'relative';

		}

		if(this.options.infinite === true) {

			for(let i = 0; i < this.options.visibleSlides; i++) {

				if(Math.abs(this.currentPos) > (i + 1) * ((100 / this.options.visibleSlides) + this.options.slideSpacing)) {

					this.elements.slides[i].style.left = `${Math.abs(this.minTransform - (((100 / this.options.visibleSlides) + this.options.slideSpacing) * i))}%`;

				} else {

					this.elements.slides[i].style.left = `${(i * ((100 / this.options.visibleSlides) + this.options.slideSpacing))}%`;

				}

			}

		}

	}

	positionInner() {

		this.elements.inner.style.transform = `translate3d(${this.currentPos}%, 0, 0)`;

	}

	animate(nextSlide, prevSlide, speed) {

		this.animation = zRS_util.animationFrame(() => {

			if(this.remaining === 0) {

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

				return;

			}

			this.calculatePosition(speed);
			this.coordinateSlides(nextSlide);
			this.animate(nextSlide, prevSlide, speed);

		});

	}

	handle(nextSlide, prevSlide, speed, steps) {

		steps = steps * -1;

		cancelAnimationFrame(this.animation);

		this.remaining += (((100 / this.options.visibleSlides) + this.options.slideSpacing) * steps);
		this.target = Math.round((this.currentPos + this.remaining) / ((100 / this.options.visibleSlides) + this.options.slideSpacing)) * ((100 / this.options.visibleSlides) + this.options.slideSpacing);

		if(this.options.infinite !== true) {

			if(this.target < (this.minTransform + (100 / this.options.visibleSlides))) {

				this.remaining -= this.minTransform;

			} else if(this.target > 0) {

				this.remaining += this.minTransform;

			}

		}

		this.distance = this.remaining;
		this.animate(nextSlide, prevSlide, speed);

	}

}

export default zRS_slide;
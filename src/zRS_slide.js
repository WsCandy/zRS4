import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.slideWidth = (100 / this.options.visibleSlides) + (this.options.slideSpacing / (Math.max((this.options.visibleSlides - 1), 1)));
		this.minTransform = -Math.abs(this.elements.slides.length * this.slideWidth);
		this.currentPos = 0;
		this.remaining = 0;
		this.distance = 0;
		this.buffer = 0;

		this.setUp();
		this.styleSlides();

	}

	setUp() {

		this.elements.inner.style.overflow = null;
		this.elements.slider.style.overflow = 'hidden';
		this.elements.inner.style.transform = 'translateX(0%)';

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
			element.style.left = `${ this.slideWidth * i}%`;
			element.style.zIndex = 1;
			element.style.width = `${(100 / this.options.visibleSlides) - (this.options.visibleSlides > 1 ? this.options.slideSpacing : 0)}%`;

		}

	}

	calculatePosition(speed) {

		// let increment = (((1000 / 60) / speed) * ((this.remaining - this.buffer) * 5));

		let increment = ((1000 / 60) / speed) * this.distance;

		increment = this.distance < 0 ? Math.max(increment, this.distance) : Math.min(increment, this.distance);

		this.remaining -= increment;
		this.remaining = this.distance < 0 ? Math.min(0, this.remaining) : Math.max(0, this.remaining);

		if(increment === this.distance) {

			this.currentPos += increment;

		}

		if(this.remaining === 0) {

			this.currentPos = Math.round(this.currentPos / this.slideWidth) * this.slideWidth;
			this.positionInner(true);

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

				if(Math.abs(this.currentPos) > (i + 1) * this.slideWidth) {

					this.elements.slides[i].style.left = `${Math.abs(this.minTransform - (this.slideWidth * i))}%`;

				} else {

					this.elements.slides[i].style.left = `${i * this.slideWidth}%`;

				}

			}

		}

	}

	positionInner(tX = false) {

		if(tX === false) {

			this.elements.inner.style.transform = `translate3d(${this.currentPos}%, 0, 0)`;

		} else {

			this.elements.inner.style.transform = `translateX(${this.currentPos}%)`;

		}

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

		this.buffer = steps < 0 ? 0.2 : -0.2;

		cancelAnimationFrame(this.animation);

		this.remaining += this.slideWidth * steps;
		this.target = Math.round((this.currentPos + this.remaining) / this.slideWidth) * this.slideWidth;

		if(this.options.infinite !== true) {

			if(Math.floor(this.target) < Math.floor(this.minTransform + this.slideWidth)) {

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
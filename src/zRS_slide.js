import zRS_util from './zRS_util';

class zRS_slide {

	constructor(data) {

		this.elements = data.elements;
		this.options = data.options;
		this.events = data.events;
		this.slideWidth = (100 / this.options.visibleSlides) + (this.options.slideSpacing / (Math.max((this.options.visibleSlides - 1), 1)));
		this.minTransform = -Math.abs((this.elements.slides.length - (this.options.infinite ? 0 : 1)) * this.slideWidth);
		this.landingPoint = 0;
		this.currentPos = 0;
		this.startPos = 0;
		this.remaining = 0;
		this.distance = 0;
		this.target = 0;
		this.increment = 0;
		this.startSlide = 0;
		this.startTime = Date.now();

		if(this.options.alignment === 'center') {

			this.currentPos += ((this.slideWidth * 0.5) * (this.options.visibleSlides - 1));

		}

		this.currentPos = this.fixInfinitePosition(this.currentPos);

		this.setUp();
		this.styleSlides();

	}

	setUp() {

		this.elements.inner.style.overflow = null;
		this.elements.slider.style.overflow = 'hidden';
		this.elements.inner.style.transform = 'translateX(0%)';
		this.positionInner(true);

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
			element.style.left = `${this.slideWidth * i}%`;
			element.style.zIndex = 1;
			element.style.width = `${(100 / this.options.visibleSlides) - (this.options.visibleSlides > 1 ? this.options.slideSpacing : 0)}%`;

		}

		this.coordinateSlides(0);

	}

	calculatePosition(speed) {

		this.currentPos = Math.round(zRS_slide.easeOut(Date.now() - this.startTime, this.startPos, this.distance, speed) * 1000) / 1000;
		this.remaining = Math.round((this.startPos + this.distance - this.currentPos) * 1000) / 1000;

		this.currentPos = this.fixInfinitePosition();

		if(Math.floor(this.remaining * 100) / 100 === 0) {

			this.remaining = 0;
			this.currentPos = Math.round(this.currentPos * 100) / 100;
			this.positionInner(true);

			return;

		}

		this.positionInner();

	}

	fixInfinitePosition(position = null) {

		position = position != null ? position : this.currentPos;

		if(this.options.infinite === true) {

			let over = Math.abs(Math.round(position / this.minTransform)) + 1;

			do {

				position <= this.minTransform ? position -= this.minTransform : null;
				position >= 0 ? position += this.minTransform : null;

				over--

			} while (over >= 0);

		}

		return position;

	}

	static easeOut(time, start, change, duration) {

		let ts = (time /= duration) * time,
			tc = ts * time;

		return start + change * (tc + -3 * ts + 3 * time);

	}

	coordinateSlides(nextSlide) {

		if(this.options.infinite === true) {

			for(let i = 0; i < this.options.visibleSlides; i++) {

				if(Math.abs(this.currentPos) > (i + 1) * this.slideWidth) {

					this.elements.slides[i].style.left = `${Math.abs(this.minTransform - (this.slideWidth * i))}%`;

				} else {

					this.elements.slides[i].style.left = `${i * this.slideWidth}%`;

				}

			}

		}

		if (!nextSlide) {

			return;

		}

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			if(this.elements.slides[i] !== this.elements.slides[nextSlide]) {

				this.elements.slides[i].style.position = 'absolute';
				continue;

			}

			this.elements.slides[i].style.position = 'relative';

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

	slideByPosition(position = null) {

		if(position !== null) {

			return Math.abs(Math.round(position / this.slideWidth));

		}

		return Math.abs(Math.round(this.currentPos / this.slideWidth));

	}

	normaliseTarget(target) {

		let over = Math.round(target / this.elements.slides.length);

		do {

			if(target >= this.elements.slides.length) {

				target = (target - this.elements.slides.length);

			} else if(target < 0) {

				target = (target + this.elements.slides.length);

			}

			over--;

		} while (over > 0);

		return target

	}

	calculateLandingPoint(snap = false) {

		this.distance = this.remaining;
		this.startPos = this.currentPos;

		if(this.options.alignment === 'center') {

			this.distance -= ((this.slideWidth * 0.5) * (this.options.visibleSlides - 1));

		}

		if(this.options.infinite === true) {

			this.landingPoint = this.fixInfinitePosition(this.startPos + this.distance);

			this.target = this.normaliseTarget(this.slideByPosition(this.landingPoint));

			if(this.options.freeStyle === false || snap === true) {

				let slidePos = -Math.abs(this.target * this.slideWidth);

				this.remaining += (slidePos - this.landingPoint);

				if(this.target === 0 && -Math.abs((slidePos - this.landingPoint) + this.slideWidth) <= this.minTransform) {

					this.remaining += this.minTransform

				}

			}

		} else {

			this.landingPoint = this.startPos + this.distance;

			if(this.landingPoint > 0) {

				this.target = 0;

			} else if (this.landingPoint < this.minTransform) {

				this.target = this.elements.slides.length - 1;

			} else {

				this.target = this.slideByPosition(this.landingPoint);

			}

			if(this.target === 0 || this.target === this.elements.slides.length - 1 || this.options.freeStyle === false || snap === true) {

				let slidePos = -Math.abs(this.target * this.slideWidth);

				this.remaining += (slidePos - this.landingPoint);

			}

		}

		this.distance = this.remaining;

	}

	handle(nextSlide, prevSlide, speed, steps) {

		steps = steps * -1;

		this.remaining += this.slideWidth * steps;

		this.calculateLandingPoint(true);

		this.startTime = Date.now();
		this.animate(nextSlide, prevSlide, speed);

	}

	touchStart(e) {

		zRS_util.cancelAnimationFrame(this.animation);

		this.startPos = this.currentPos;
		this.startSlide = this.normaliseTarget(this.slideByPosition());

	}

	touchMove(e, percent, lastPercent) {

		let ratio = 1;
		let pos = this.currentPos;

		if(this.options.alignment === 'center') {

			pos += (this.slideWidth * 0.5);

		}

		if(this.currentPos > (this.slideWidth * this.options.visibleSlides) / 2 && this.options.infinite === false) {

			ratio = Math.max(0, 1 - (pos / 95));

		}

		if(this.currentPos < -(this.slideWidth * (this.elements.slides.length - 1)) && this.options.infinite === false) {

			ratio = Math.max(0, 1 + (pos - (this.minTransform + ((this.options.visibleSlides - 1) * this.slideWidth))) / 95);

		}

		this.increment = (percent - lastPercent) * ratio;
		this.currentPos -= this.increment;

		if(this.options.infinite === true) {

			if(this.currentPos < this.minTransform) {

				this.currentPos -= this.minTransform;

			} else if(this.currentPos >= 0) {

				this.currentPos += this.minTransform;

			}

		}

		const slideIndex = this.slideByPosition();
		const loadSlide = this.normaliseTarget(slideIndex + (percent > 0 ? this.options.visibleSlides : -1));

		zRS_util.loadImages(this.elements.slides[loadSlide], null);

		this.coordinateSlides();
		this.positionInner();

	}

	touchEnd(e, momentum) {

		this.startSlide = this.startSlide === this.target ? this.startSlide : this.target;
		this.remaining -= momentum;

		this.calculateLandingPoint();
		this.startTime = Date.now();
		this.animate(this.target, this.startSlide, this.options.speed);

		this.events.before = zRS_util.createEvent('before', {

			current: parseInt(this.startSlide),
			currentSlide: this.elements.slides[this.startSlide],
			target: parseInt(this.target),
			targetSlide: this.elements.slides[this.target]

		});

		zRS_util.dispatchEvent({

			name: 'before',
			event: this.events.before,
			element: this.elements.slider

		});

	}

}

export default zRS_slide;
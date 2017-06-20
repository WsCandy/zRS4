import zRS_util from './zRS_util';
import zRS_touch from './zRS_touch';
import zRS_public from './zRS_public';
import zRS_lazy from './zRS_lazy';
import Promise from 'core-js/es6/promise';

class zRS_core {

	constructor(element, options) {

		try {

			this.zRS_trans = require(`./zRS_${options.transition}`).default;

		} catch(error) {

			zRS_util.log(`The transition '${options.transition}' doesn't exist, falling back to fade.`, `warn`, this.options.verbose);
			this.zRS_trans = require(`./zRS_fade`).default;

		}

		this.options = options;
		this.timer = null;
		this.events = {};
		this.currentSlide = 0;
		this.defaultVisible = this.options.visibleSlides;
		this.elements = {
			slider: element,
			inner: null,
			slides: null,
			pager: null,
			controls: [],
			anchors: []
		};

		if(this.indexElements() !== true) {
			return;
		}

		this.createEvents();
		this.styleElements();

		this.lazy = new zRS_lazy({

			options: this.options,
			elements: this.elements

		});

		this.transition = new this.zRS_trans({

			elements: this.elements,
			options: this.options,
			lazy: this.lazy

		});

		this.setVisibleSlides();

		if(this.elements.slides.length > this.options.visibleSlides) {
			this.play();
			this.bindings();
			this.setUpPager();
			this.setUpControls();
		}

		this.bindResize();
		this.loadInitialSlides();

		const loadEvent = zRS_util.createEvent('load', {
			slides: this.elements.slides,
			current: this.currentSlide,
			currentSlide: this.elements.slides[this.currentSlide]
		});

		zRS_util.dispatchEvent({
			name: 'load',
			event: loadEvent,
			element: this.elements.slider
		});

		return new zRS_public(this);
	}

	indexElements() {

		this.elements.inner = zRS_util.findElement(this.elements.slider, this.options.inner);
		this.elements.inner = this.elements.inner.length ? this.elements.inner[0] : this.elements.inner;

		if(!this.elements.inner) {

			zRS_util.log(`Cannot find ${this.options.inner} inner element, stopping initialisation`, 'error', this.options.verbose);

			return false;

		}

		this.elements.pager = zRS_util.findElement(this.elements.slider, this.options.pager);

		for(let i = 0, l = this.options.controls.length; i < l; i++) {

			this.elements.controls.push(zRS_util.findElement(this.elements.slider, this.options.controls[i]));

		}

		if(this.elements.inner.children.length <= 0) {

			zRS_util.log(`Cannot find any slides, stopping initialisation`, 'error', this.options.verbose);

			return false;

		}

		this.elements.slides = this.elements.inner.children;

		return true;

	}

	setUpControls() {

		if(this.options.controls.length === 0) {

			return;

		}

		for(let i = 0, l = this.elements.controls.length; i < l; i++) {

			let control;

			if(!this.elements.controls[i]) {

				zRS_util.log(`Cannot find control ${this.options.controls[i]}, please double check your reference.`, 'warn', this.options.verbose);

				continue;

			}

			control = this.elements.controls[i].length ? this.elements.controls[i][0] : this.elements.controls[i];

			control.addEventListener('mousedown', (e) => {
				e.preventDefault();
				e.stopPropagation();
			});

			control.addEventListener('mouseup', (e) => {
				e.preventDefault();
				e.stopPropagation();
			});

			control.addEventListener('click', (e) => {

				let forwardControl = this.elements.controls[0].length ? this.elements.controls[0][0] : this.elements.controls[0],
					step = e.target === forwardControl ? this.options.slideBy : -this.options.slideBy;

				e.preventDefault();

				this.resetTimer();
				this.handleTransition(step);

			});

		}

		if(this.options.infinite === false) {

			this.toggleControlClasses();

		}

	}

	toggleControlClasses() {

		let back = this.elements.controls[1] && this.elements.controls[1].length ? this.elements.controls[1][0] : this.elements.controls[1],
			next = this.elements.controls[0] && this.elements.controls[0].length ? this.elements.controls[0][0] : this.elements.controls[0];

		if(this.currentSlide === (this.elements.slides.length - 1)) {

			zRS_util.addClass(next, 'zRS--inactive');

		} else {

			zRS_util.removeClass(next, 'zRS--inactive');

		}

		if(this.currentSlide === 0) {

			zRS_util.addClass(back, 'zRS--inactive');

		} else {

			zRS_util.removeClass(back, 'zRS--inactive');

		}

	}

	setUpPager() {

		if(!this.options.pager) {

			return;

		}

		if(!this.elements.pager) {

			zRS_util.log(`Cannot find pager container ${this.options.pager}, please double check your reference.`, 'warn', this.options.verbose);

			return;

		}

		let pager = this.elements.pager.length ? this.elements.pager[0] : this.elements.pager;

		if(!pager.children.length) {

			for(let i = 0, l = this.elements.slides.length; i < l; i++) {

				let anchor = document.createElement('a');
				anchor.href = 'javascript:void(0);';

				if(i === 0) {

					zRS_util.addClass(anchor, 'is-active');

				}

				zRS_util.addClass(anchor, 'zRS__anchor');

				this.elements.anchors.push(anchor);

				pager.appendChild(anchor);

				anchor.addEventListener('mousedown', (e) => {

					e.stopPropagation();

				});

				anchor.addEventListener('click', (e) => {

					e.preventDefault();
					this.transTo(i);

				});

			}

		} else {

			if(pager.children.length !== this.elements.slides.length) {

				zRS_util.log(`Please make sure your pager contains ${this.elements.slides.length} children to use customer pager elements.`, 'warn', this.options.verbose);

				return;

			}

			for(let i = 0, l = pager.children.length; i < l; i++) {

				if(i === 0) {

					zRS_util.addClass(pager.children[i], 'is-active');

				}

				this.elements.anchors.push(pager.children[i]);

				pager.children[i].addEventListener('mousedown', (e) => {

					e.stopPropagation();

				});

				pager.children[i].addEventListener('click', (e) => {

					e.preventDefault();
					this.transTo(i);

				});

			}

		}

	}

	resetPager() {

		for(let i = 0, l = this.elements.anchors.length; i < l; i++) {

			if(i !== 0) {

				zRS_util.removeClass(this.elements.anchors[i], 'is-active');

			} else {

				zRS_util.addClass(this.elements.anchors[i], 'is-active');

			}

		}

	}

	styleElements() {

		this.elements.inner.style.width = '100%';
		this.elements.inner.style.overflow = 'hidden';
		this.elements.inner.style.position = 'relative';

		for(let i = 0, l = this.elements.slides.length; i < l; i++) {

			zRS_util.addClass(this.elements.slides[i], this.options.slides);

		}

	}

	createEvents() {

		this.events.play = zRS_util.createEvent('play');
		this.events.pause = zRS_util.createEvent('pause');

	}

	bindResize() {
		window.addEventListener('resize', () => {
			zRS_util.animationFrame(() => {
				this.lazy.loadImages(this.elements.slides[this.currentSlide]);
				this.setVisibleSlides();
			});
		});
	}

	bindings() {

		new zRS_touch(this);

		window.addEventListener('blur', () => {

			if(this.transition.animation) {
				zRS_util.cancelAnimationFrame(this.transition.animation);
			}

			this.pause();

		});

		window.addEventListener('focus', () => {

			if(this.transition.animation) {
				this.handleTransition(0);
			}

			this.play();

		});

		this.elements.slider.addEventListener('before', (e) => {

			this.currentSlide = e.detail.target;

			zRS_util.removeClass(this.elements.anchors[e.detail.current], 'is-active');
			zRS_util.addClass(this.elements.anchors[e.detail.target], 'is-active');

			if(this.options.controls.length !== 0 && this.options.infinite === false) {

				this.toggleControlClasses();

			}

		});

		if(this.options.keyboardControls === true) {

			this.elements.slider.tabIndex = 0;
			this.elements.slider.style.outline = 'none';

			this.elements.slider.addEventListener('keydown', (e) => {

				this.resetTimer();

				if(e.which === 37) {

					this.handleTransition(-1);

				} else if(e.which === 39) {

					this.handleTransition(1);

				}

			});

		}

	}

	loadInitialSlides() {

		if(this.options.transition === 'fade') {

			this.lazy.loadImages(this.elements.slides[0]);

			return;

		}

		if(this.options.alignment !== 0 && this.options.alignment !== 1) {

			this.lazy.loadImages(this.elements.slides[0]);

			let slidesPerSide = Math.floor(this.options.visibleSlides / 2);

			for(let i = 0, b = 0, l = slidesPerSide; i < l; i++, b--) {

				if (!this.elements.slides[zRS_util.targetSlide(i + 1, this.elements.slides.length)]) {
					continue;
				}

				this.lazy.loadImages(this.elements.slides[zRS_util.targetSlide(i + 1, this.elements.slides.length)]);

				if(this.options.infinite === false) {

					break;

				}

				this.lazy.loadImages(this.elements.slides[zRS_util.targetSlide(b - 1, this.elements.slides.length)]);

			}

		} else if(this.options.alignment === 0) {

			for(let i = 0, l = this.options.visibleSlides; i < l; i++) {

				if (!this.elements.slides[zRS_util.targetSlide(i, this.elements.slides.length)]) {
					continue;
				}

				this.lazy.loadImages(this.elements.slides[zRS_util.targetSlide(i, this.elements.slides.length)]);
			}

		} else {

			for(let i = 0, l = -this.options.visibleSlides; i > l; i--) {

				if(i < 0 && this.options.infinite === false) {
					break;
				}

				if (!this.elements.slides[zRS_util.targetSlide(i, this.elements.slides.length)]) {
					continue;
				}

				this.lazy.loadImages(this.elements.slides[zRS_util.targetSlide(i, this.elements.slides.length)]);

			}

		}

	}

	setVisibleSlides() {

		if(typeof this.options.setVisibleSlides !== 'object' || typeof this.transition.visible === 'undefined') {
			return;
		}

		for(let size in this.options.setVisibleSlides) {
			if(this.options.setVisibleSlides.hasOwnProperty(size)) {
				if(document.documentElement.clientWidth <= size) {

					this.updateVisible(this.options.setVisibleSlides[size]);
					return;
				} else {
					this.updateVisible(this.defaultVisible);
				}
			}
		}
	}

	play() {

		if(this.elements.slides.length <= 1) {
			return;
		}

		this.resetTimer();

		zRS_util.dispatchEvent({

			name: 'play',
			event: this.events.play,
			element: this.elements.slider

		});

	}

	updateVisible(visible = 1) {

		if(visible > this.elements.slides.length) {
			zRS_util.log('Cannot show more slides than total number of slides.', 'warn', this.options.verbose);
			return;
		}

		if(this.options.visibleSlides === visible) {
			return;
		}

		this.options.visibleSlides = visible;
		this.currentSlide = 0;

		this.resetPager();

		zRS_util.dispatchEvent({
			name: 'visibleSlides',
			event: zRS_util.createEvent('visibleSlides', {
				visible: visible
			}),
			element: this.elements.slider
		});

		for(let i = 0; i < visible; i++) {

			this.lazy.loadImages(this.elements.slides[i]);

		}

	}

	transTo(slide, speed = this.options.speed) {

		let difference = slide - this.currentSlide;

		if(!this.elements.slides[slide]) {

			zRS_util.log(`Slide ${slide} doesn't exist, please amend the method call.`, 'warn', this.options.verbose);

			return;

		}

		if(difference === 0) {
			return;
		}

		this.resetTimer();
		this.handleTransition(difference, speed);

	}

	resetTimer() {

		clearInterval(this.timer);

		if(this.options.delay < 0) {

			return;

		}

		this.timer = setInterval(() => {

			let slideBy = this.options.slideBy;

			this.handleTransition(slideBy);

		}, this.options.delay);

	}

	pause() {

		clearInterval(this.timer);

		zRS_util.dispatchEvent({

			name: 'pause',
			event: this.events.pause,
			element: this.elements.slider

		});

	}

	handleTransition(steps = null, speed = this.options.speed) {

		steps = steps !== null ? steps : this.options.slideBy;

		let current = this.currentSlide,
			promises = [],
			target = current + steps;

		target = zRS_util.targetSlide(target, this.elements.slides.length);

		if(this.options.transition !== 'fade') {

			for(let i = current; i < target; i++) {

				promises.push(new Promise((resolve, reject) => {

					this.lazy.loadImages(this.elements.slides[i], {resolve: resolve, reject: reject});

				}));

			}

		}

		for(let i = 0; i < this.options.visibleSlides; i++) {

			let slideIndex = zRS_util.targetSlide(target + i, this.elements.slides.length);

			promises.push(new Promise((resolve, reject) => {

				this.lazy.loadImages(this.elements.slides[slideIndex], {resolve: resolve, reject: reject});

			}));

		}

		Promise.all(promises).then(() => {

			this.transition.handle(this.currentSlide, current, speed, steps);

		});

		zRS_util.dispatchEvent({

			name: 'before',
			event: zRS_util.createEvent('before', {

				current: parseInt(current),
				currentSlide: this.elements.slides[current],
				target: parseInt(target),
				targetSlide: this.elements.slides[target]

			}),
			element: this.elements.slider

		});

	}

}

export default zRS_core;
import zRS_util from './zRS_util';
import zRS_public from './zRS_public';

class zRS_core {

	constructor(element, options) {

		var zRS_trans;

		try {

			zRS_trans = require(`./zRS_${options.transition}`).default;

		} catch(error) {

			zRS_util.log(`The transition '${options.transition}' doesn't exist, falling back to fade.`, `warn`);
			zRS_trans = require(`./zRS_fade`).default;

		}

		this.options = options;
		this.timer = null;
		this.events = {};
		this.currentSlide = 0;
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
		this.setUpPager();
		this.setUpControls();

		this.transition = new zRS_trans({

			events: this.events,
			elements: this.elements,
			options: this.options

		});

		this.play();
		this.bindings();

		for(let i = 0; i < this.options.visibleSlides; i++) {

			zRS_util.loadImages(this.elements.slides[i]);

		}

		zRS_util.dispatchEvent({

			name: 'load',
			event: this.events.load,
			element: this.elements.slider

		});

		return new zRS_public(this);

	}

	indexElements() {

		this.elements.inner = zRS_util.findElement(this.elements.slider, this.options.inner);
		this.elements.inner = this.elements.inner.length ? this.elements.inner[0] : this.elements.inner;

		if(!this.elements.inner) {

			zRS_util.log(`Cannot find ${this.options.inner} inner element, stopping initialisation`, 'error');

			return false;

		}

		this.elements.pager = zRS_util.findElement(this.elements.slider, this.options.pager);

		for(let i = 0, l = this.options.controls.length; i < l; i++) {

			this.elements.controls.push(zRS_util.findElement(this.elements.slider, this.options.controls[i]));

		}

		if(this.elements.inner.children.length <= 0) {

			zRS_util.log(`Cannot find any slides, stopping initialisation`, 'error');

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

				zRS_util.log(`Cannot find control ${this.options.controls[i]}, please double check your reference.`, 'warn');

				continue;

			}

			control = this.elements.controls[i].length ? this.elements.controls[i][0] : this.elements.controls[i];

			control.addEventListener('click', (e) => {

				let forwardControl = this.elements.controls[0].length ? this.elements.controls[0][0] : this.elements.controls[0],
					step = e.target === forwardControl ? 1 : -1;

				e.preventDefault();

				this.resetTimer();
				this.handleTransition(step);

			});

		}

	}

	setUpPager() {

		if(!this.options.pager) {

			return;

		}

		if(!this.elements.pager) {

			zRS_util.log(`Cannot find pager container ${this.options.pager}, please double check your reference.`, 'warn');

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

				anchor.addEventListener('click', (e) => {

					e.preventDefault();
					this.transTo(i);

				});

			}

		} else {

			if(pager.children.length !== this.elements.slides.length) {

				zRS_util.log(`Please make sure your pager contains ${this.elements.slides.length} children to use customer pager elements.`, 'warn');

				return;

			}

			for(let i = 0, l = pager.children.length; i < l; i++) {

				if(i === 0) {

					zRS_util.addClass(pager.children[i], 'is-active');

				}

				this.elements.anchors.push(pager.children[i]);

				pager.children[i].addEventListener('click', (e) => {

					e.preventDefault();
					this.transTo(i);

				});

			}

		}

		this.elements.slider.addEventListener('before', (e) => {

			zRS_util.removeClass(this.elements.anchors[e.detail.current], 'is-active');
			zRS_util.addClass(this.elements.anchors[e.detail.target], 'is-active');

		});

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

		this.events.load = zRS_util.createEvent('load');
		this.events.play = zRS_util.createEvent('play');
		this.events.pause = zRS_util.createEvent('pause');

	}

	bindings() {

		window.addEventListener('blur', () => {

			this.pause();

		});

		window.addEventListener('focus', () => {

			this.play();

		});

		window.addEventListener('resize', () => {

			zRS_util.animationFrame(() => {

				zRS_util.loadImages(this.elements.slides[this.currentSlide]);

			});

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

	transTo(slide, speed = this.options.speed) {

		let difference = slide - this.currentSlide;

		if(!this.elements.slides[slide]) {

			zRS_util.log(`Slide ${slide} doesn't exist, please amend the method call.`, 'warn');

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

	targetSlide(slide) {

		let target = slide;

		if(slide >= this.elements.slides.length) {

			target = (slide - this.elements.slides.length);

		} else if(slide < 0) {

			target = (slide + this.elements.slides.length);

		}

		return target;

	}

	handleTransition(steps = 1, speed = this.options.speed) {

		steps = steps * this.options.slideBy;
		
		let current = this.currentSlide,
			promises = [];

		this.currentSlide += steps;
		this.currentSlide = this.targetSlide(this.currentSlide);

		this.events.before = zRS_util.createEvent('before', {

			current: parseInt(current),
			currentSlide: this.elements.slides[current],
			target: parseInt(this.currentSlide),
			targetSlide: this.elements.slides[this.currentSlide]

		});

		zRS_util.dispatchEvent({

			name: 'before',
			event: this.events.before,
			element: this.elements.slider

		});

		for(let i = 0; i < this.options.visibleSlides; i++) {

			let slideIndex = this.targetSlide(this.currentSlide + i);

			promises[i] = new Promise((resolve, reject) => {

				zRS_util.loadImages(this.elements.slides[slideIndex], {resolve: resolve, reject: reject});

			});

		}

		Promise.all(promises).then(() => {

			this.transition.handle(this.currentSlide, current, speed, steps);

		});

	}

}

export default zRS_core;
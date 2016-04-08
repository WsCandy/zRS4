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
		
		this.createEvents();
		this.indexElements();
		this.styleElements();
		this.setUpPager();
		this.setUpControls();

		this.transition = new zRS_trans({

			events: this.events,
			elements : this.elements,
			options: this.options

		});

		this.play();
		this.bindings();

		zRS_util.loadImages(this.elements.slides[this.currentSlide]);

		zRS_util.dispatchEvent({

			name: 'load',
			event: this.events.load,
			element: this.elements.slider

		});

		return new zRS_public(this);
		
	}

	indexElements() {

		this.elements.inner = this.elements.slider.querySelectorAll(this.options.inner)[0];

		if(!this.elements.inner) {

			zRS_util.log(`Cannot find ${this.options.inner} inner element, please check your markup`, 'warn');

			return;

		}

		this.elements.pager = zRS_util.findElement(this.options.pager);

		for(let control of this.options.controls) {

			this.elements.controls.push(zRS_util.findElement(control));

		}

		this.elements.slides = this.elements.inner.children;

	}

	setUpControls() {

		let index = 0;

		if(this.options.controls.length === 0) {

			return;

		}

		for(let control of this.elements.controls) {

			if(!control) {

				zRS_util.log(`Cannot find control ${this.options.controls[index]}, please double check your reference.`, 'warn');

				index++;

				continue;

			}

			control = control.length ? control[0] : control;

			control.addEventListener('click', (e) => {

				let forwardControl = this.elements.controls[0].length ? this.elements.controls[0][0] : this.elements.controls[0],
					step = e.target === forwardControl ? 1 : -1;

				e.preventDefault();

				this.resetTimer();
				this.handleTransition(step);

			});

			index++;

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

			for(let [key, element] of zRS_util.iterateObj(pager.children)) {

				key = parseInt(key);

				if(key === 0) {

					zRS_util.addClass(element, 'is-active');

				}

				this.elements.anchors.push(element);

				element.addEventListener('click', (e) => {

					e.preventDefault();
					this.transTo(key);

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

			window.requestAnimationFrame(() => {
				
				zRS_util.loadImages(this.elements.slides[this.currentSlide]);

			});


		});

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

	transTo(slide) {

		let difference = slide - this.currentSlide;

		if(!this.elements.slides[slide]) {

			zRS_util.log(`Slide ${slide} doesn't exist, please amend the method call.`, 'warn');

			return;

		}

		if(difference === 0) {

			return;

		}

		this.resetTimer();
		this.handleTransition(difference);

	}

	resetTimer() {

		clearInterval(this.timer);

		this.timer = setInterval(() => {

			this.handleTransition(this.options.slideBy);

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

	handleTransition(steps = 1) {

		let current = this.currentSlide;

		this.currentSlide += steps;

		if(this.currentSlide >= this.elements.slides.length) {

			this.currentSlide -= this.elements.slides.length;

		} else if(this.currentSlide < 0) {

			this.currentSlide += this.elements.slides.length;

		}

		this.events.before = zRS_util.createEvent('before', {

			current : parseInt(current),
			currentSlide : this.elements.slides[current],
			target: parseInt(this.currentSlide),
			targetSlide: this.elements.slides[this.currentSlide]

		});

		zRS_util.dispatchEvent({

			name: 'before',
			event: this.events.before,
			element: this.elements.slider

		});

		zRS_util.loadImages(this.elements.slides[this.currentSlide]);

		this.transition.handle(this.currentSlide, current);

	}

}

export default zRS_core;
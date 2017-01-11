import zRS_util from './zRS_util';

class zRS_touch {

	constructor(core) {

		this.core = core;
		this.isTouch = ("ontouchstart" in document.documentElement);
		this.scrolling = false;
		this.scrollTimer = null;
		this.active = false;
		this.moved = false;
		this.startPos = 0;
		this.initialDirection = '';
		this.buffer = 0.025;

		if(!this.core.transition.touchMove || !this.core.transition.touchEnd || !this.core.transition.touchStart) {

			zRS_util.log('The active transition is missing touch handlers, is this intended? Touch is now disabled.', 'warn', this.core.options.verbose);

			return;

		}

		this.bindings();
		this.setScrolling();

	}

	bindings() {

		if(!this.isTouch && this.core.options.drag === true) {
			this.core.elements.slider.addEventListener('mousedown', (e) => {
				this.activate(e);
			});
		}

		document.addEventListener('mousemove', (e) => {
			this.move(e);
		});

		document.addEventListener('mouseup', (e) => {
			this.deactivate(e)
		});

	}

	activate(e) {

		e.preventDefault();

		this.active = true;
		this.startPos = e.pageX;

		this.core.transition.touchStart(e);

		console.log("Start");

	}

	move(e) {

		if(this.scrolling === true || this.active === false) {

			return;

		}

		let percent = 0;
		let moved = this.startPos - e.pageX;
		let perFor = ((this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;
		let perBac = ((-this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;

		if(moved < 0 && this.moved === false) {

			percent = perFor;
			this.initialDirection = 'forward';

		} else if(moved > 0 && this.moved === false) {

			percent = perBac;
			this.initialDirection = 'back';

		} else {

			if(this.initialDirection === 'forward') {

				percent = perFor;

			} else {

				percent = perBac;

			}

		}

		if(Math.abs(moved) < this.core.elements.slider.clientWidth * this.buffer && this.moved === false) {

			return;

		}

		if(this.moved === false) {

			zRS_util.addClass(this.core.elements.slider, 'zRS--active');
			this.core.pause();

		}

		this.moved = true;
		this.core.transition.touchMove(e, percent);

	}

	deactivate(e) {

		if(this.active === false || this.moved === false) {

			this.active = false;

			return;

		}

		this.active = this.moved = false;
		zRS_util.removeClass(this.core.elements.slider, 'zRS--active');

		this.core.transition.touchEnd(e);
		this.core.play();

	}

	setScrolling() {

		if(!this.isTouch) {

			return;

		}

		window.addEventListener('scroll', () => {

			zRS_util.animationFrame(() => {

				this.scrolling = true;
				clearTimeout(this.scrollTimer);

				this.scrollTimer = setTimeout(() => {

					this.scrolling = false;

				}, 200);

			});

		});

	}

}

export default zRS_touch
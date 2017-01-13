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
		this.lastPos = 0;
		this.currentPos = 0;
		this.initialDirection = '';
		this.buffer = 0.025;
		this.startTime = 0;
		this.lastTime = 0;
		this.velocity = 0;

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

		this.active = true;
		this.startPos = this.currentPos = e.pageX;
		this.core.transition.touchStart(e);
		this.startTime = this.lastTime = Date.now();

	}

	move(e) {

		if(this.scrolling === true || this.active === false) {

			return;

		}

		e.preventDefault();

		let percent = 0;
		let moved = this.startPos - e.pageX;
		let perFor = ((this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;
		let perBac = ((-this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;
		this.currentPos = e.pageX;

		if(Math.abs(moved) < this.core.elements.slider.clientWidth * this.buffer && this.moved === false) {

			return;

		}

		if(moved < 0 && this.moved === false) {

			percent = perFor;
			this.initialDirection = 'forward';

		} else if(moved > 0 && this.moved === false) {

			percent = perBac;
			this.initialDirection = 'back';

		} else {

			percent = this.initialDirection === 'forward' ? perFor : perBac;

		}

		if(this.moved === false) {

			zRS_util.addClass(this.core.elements.slider, 'zRS--active');
			this.core.pause();

		}

		this.moved = true;

		const distance = this.currentPos - this.lastPos;
		const time = Date.now() - this.lastTime;
		const velocity = distance / time;

		this.velocity = velocity === 0 ? this.velocity : velocity;

		this.lastPos = e.pageX;
		this.lastTime = Date.now();

		this.core.transition.touchMove(e, percent);

	}

	deactivate(e) {

		if(this.active === false) {

			this.active = false;

			return;

		}

		const distance = this.startPos - e.pageX;
		const time = Date.now() - this.startTime;
		this.velocity -= distance / time;

		let momentum = (7 * this.velocity) * -1;

		if(Date.now() - this.lastTime > 100) {

			momentum = 0;

		}

		this.active = this.moved = false;

		zRS_util.removeClass(this.core.elements.slider, 'zRS--active');

		this.core.transition.touchEnd(e, momentum);
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
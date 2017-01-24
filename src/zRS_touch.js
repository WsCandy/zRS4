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
		this.lastPercent = 0;
		this.initialDirection = '';
		this.buffer = 0.025;
		this.startTime = 0;
		this.lastTime = 0;
		this.dragging = false;
		this.velocity = 0;
		this.friction = core.options.friction;

		if(!this.core.transition.touchMove || !this.core.transition.touchEnd || !this.core.transition.touchStart) {

			zRS_util.log('The active transition is missing touch handlers, is this intended? Touch is now disabled.', 'warn', this.core.options.verbose);

			return;

		}

		if(!window.requestAnimationFrame) {

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

		this.core.elements.slider.addEventListener('touchstart', (e) => {
			this.activate(e);
		});

		document.addEventListener('touchmove', (e) => {
			this.move(e);
		});

		document.addEventListener('touchend', (e) => {
			this.deactivate(e);
		});

		this.core.elements.slider.addEventListener('after', (e) => {
			this.core.play();
			this.dragging = false;
		});

		const links = this.core.elements.inner.querySelectorAll('a');

		for(let i = 0, l = links.length; i < l; i++) {

			links[i].addEventListener('click', (e) => {

				if(this.dragging === true) {

					e.preventDefault();

				}

			});

		}

	}

	activate(e) {

		let posX = typeof e.pageX === 'undefined' ? e.touches[0].pageX : e.pageX;

		if(e.which === 3) {
			e.preventDefault();
			return;
		}

		this.active = true;
		this.startPos = this.currentPos = this.lastPos = posX;
		this.lastPercent = 0;
		this.velocity = 0;
		this.core.transition.touchStart(e);
		this.startTime = this.lastTime = Date.now();

	}

	move(e) {

		let posX = typeof e.pageX === 'undefined' ? e.touches[0].pageX : e.pageX;

		let moved = this.startPos - posX;

		if(this.scrolling === true || this.active === false) {

			return;

		}

		let percent = 0;
		let perFor = ((this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;
		let perBac = ((-this.core.elements.slider.clientWidth * this.buffer) + moved) / this.core.elements.slider.clientWidth * 100;
		this.currentPos = posX;

		if(!this.isTouch) {

			e.preventDefault();

		}

		if(Math.abs(moved) < this.core.elements.slider.clientWidth * this.buffer && this.moved === false) {

			return;

		}

		e.preventDefault();

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

		this.moved = this.dragging = true;

		const distance = this.currentPos - this.lastPos;
		const time = Date.now() - this.lastTime;
		const velocity = distance / time;

		this.velocity = velocity === 0 ? this.velocity : velocity;

		this.velocity /= this.core.elements.slider.clientWidth;
		this.velocity *= 100;

		this.lastPos = posX;
		this.lastTime = Date.now();

		this.core.transition.touchMove(e, percent, this.lastPercent);
		this.lastPercent = percent;

	}

	deactivate(e) {

		if(this.active === false || this.lastPos === this.startPos) {

			this.active = this.moved = false;
			this.core.transition.touchEnd(e, 0, 300);

			return;

		}

		let time = Date.now() - this.startTime;

		let distance = (this.startPos / this.core.elements.slider.clientWidth) - (this.lastPos / this.core.elements.slider.clientWidth);
			distance *= 100;

		let averageSpeed = distance / time;
			averageSpeed *= 100;

		let stoppingDistance = (Math.pow(this.velocity, 2)) / (2 * (this.friction));
			stoppingDistance *= 100;

		if(distance < 35) {

			stoppingDistance += (Math.abs(averageSpeed) * 1.65);

		}

		if(distance < 0) {

			stoppingDistance *= -1;

		}

		let stoppingTime = Math.abs((2 * stoppingDistance) / this.velocity);
			stoppingTime = Math.max(300, stoppingTime);
			stoppingTime = Math.round(stoppingTime);
			stoppingTime = Math.min(stoppingTime, this.core.options.speed);

		this.active = this.moved = false;

		zRS_util.removeClass(this.core.elements.slider, 'zRS--active');

		this.core.transition.touchEnd(e, stoppingDistance, stoppingTime);
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
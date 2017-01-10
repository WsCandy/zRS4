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

		if(!this.core.transition.touchMove || !this.core.transition.touchEnd) {

			zRS_util.log('The active transition is missing touch handlers, is this intended? Touch is disabled.', 'warn', this.core.options.verbose);

			return;

		}

		console.log(core);

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

	move(e) {

		if(this.scrolling === true || this.active === false) {

			return;

		}

		let moved = this.startPos - e.pageX;

		if(Math.abs(moved) < 20) {

			return;

		}

		if(this.moved === false) {

			zRS_util.addClass(this.core.elements.slider, 'zRS--active');
			this.core.pause();

		}

		this.moved = true;
		this.core.transition.touchMove(e);

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
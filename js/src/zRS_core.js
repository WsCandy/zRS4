import zRS_util from './zRS_util';

class zRS_core {

	constructor(element, options) {

		const zRS_trans = require(`./zRS_${options.transition}`).default;

		this.options = options;
		this.timer = null;
		this.events = {};
		this.elements = {

			slider: element,
			inner: null,
			slides: null,
			pager: null

		};

		this.createEvents();
		this.indexElements();
		this.styleElements();

		this.transition = new zRS_trans({

			events: this.events,
			elements : this.elements,
			options: this.options

		});

		this.play();
		this.bindings();

		zRS_util.dispatchEvent({

			name: 'load',
			event: this.events.load,
			element: this.elements.slider

		});
		
	}

	indexElements() {

		this.elements.inner = this.elements.slider.querySelectorAll(this.options.inner)[0];

		if(!this.elements.inner) {

			zRS_util.log(`Cannot find ${this.options.inner} inner element, please check your markup`, 'warn');

			return;

		}

		this.elements.slides = this.elements.inner.children;

	}

	styleElements() {

		this.elements.inner.style.width = '100%';
		this.elements.inner.style.overflow = 'hidden';
		this.elements.inner.style.position = 'relative';

		for(let [key, element] of zRS_util.interateObj(this.elements.slides)) {

			element.style.display = 'block';
			zRS_util.addClass(element, this.options.slides);

		}

	}

	createEvents() {

		this.events.load = zRS_util.createEvent('load');
		this.events.beforeTrans = zRS_util.createEvent('beforeTrans');
		this.events.afterTrans = zRS_util.createEvent('afterTrans');
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

	}

	play() {

		clearInterval(this.timer);

		this.timer = setInterval(this.options.direction === 'forward' ? this.transition.next : this.transition.prev, this.options.delay);

		zRS_util.dispatchEvent({

			name: 'play',
			event: this.events.play,
			element: this.elements.slider

		});

	}

	pause() {

		clearInterval(this.timer);

		zRS_util.dispatchEvent({

			name: 'pause',
			event: this.events.pause,
			element: this.elements.slider

		});

	}

}

export default zRS_core;
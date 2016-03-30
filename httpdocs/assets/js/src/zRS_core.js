import zRS_util from './zRS_util';

class zRS_core {

	constructor(element, options) {

		var zRS_trans = require(`./zRS_${options.transition}`).default;

		this.options = options;
		this.events = {};
		this.elements = {

			slider: element,
			inner: null,
			slides: null,
			pager: null

		};

		this.createEvents();
		this.indexElements();
		this.transition = new zRS_trans(this.elements, this.options);

		zRS_util.dispatchEvent({

			name: 'load',
			event: this.events.load,
			element: this.elements.slider

		});

	}

	indexElements() {

		this.elements.inner = this.elements.slider.querySelectorAll(this.options.inner)[0];
		this.elements.slides = this.elements.inner.children;

		console.log(this.elements);

	}

	createEvents() {

		this.events.load = zRS_util.createEvent('load');

	}

}

export default zRS_core;
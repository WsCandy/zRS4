class zRS_util {

	static log(message, type = `log`) {

		console[type](`[zRS - ${zRS.version()}]: ${message}`);

	}

	static createEvent(name, detail = {}) {

		var event;

		if(document.createEvent) {

			event = document.createEvent('CustomEvent');
			event.initCustomEvent(name, false, false, detail);

		}

		return event;

	}

	static dispatchEvent(data) {

		if(data.element.dispatchEvent) {

			data.element.dispatchEvent(data.event);

		} else if(data.element.fireEvent) {

			data.element.fireEvent(data.name, data.event);

		}

	}

	static addClass(element, className) {

		if(element.classList) {

			element.classList.add(className);

		} else {

			element.className += ` ${className}`;

		}

	}

	static removeClass(element, className) {

		if(element.classList) {

			element.classList.remove(className);

		} else {

			element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, `gi`), ' ').trim();

		}

	}

	static iterateObj(obj) {

		let index = 0,
			propKeys = Object.keys(obj);

		return {

			[Symbol.iterator]() {

				return this;

			},
			next() {

				if(index < propKeys.length) {

					let key = propKeys[index];

					index++;

					return {value: [key, obj[key]]};

				} else {

					return {

						done: true

					};

				}

			}

		}

	}

	static findElement(element) {

		if(typeof element === 'string') {

			switch(element[0]) {

				case '.' :

					let selector = document.querySelectorAll(element);

					return selector.length > 0 ? selector : false;

				case '#' :

					return document.getElementById(element.substr(1));

				default:

					return false;

			}

		} else if(typeof element === 'object') {

			return element;

		} else {

			return false;

		}

	}

	static loadImages(slide, promise) {

		let images = [],
			promises = [],
			children = slide.querySelectorAll('*');

		if(slide.hasAttribute('zRS-srcset') || slide.hasAttribute('zRS-src')) {

			images.push(slide);

		}

		for(let i = 0, l = children.length; i < l; i++) {

			if(children[i].hasAttribute('zRS-srcset') || children[i].hasAttribute('zRS-src')) {

				images.push(children[i]);

			}

		}

		for(let i = 0, l = images.length; i < l; i++) {

			let src;

			promises[i] = new Promise((resolve, reject) => {

				if(images[i].hasAttribute('zRS-srcset')) {

					src = this.determineSize(images[i], images[i].getAttribute('zRS-srcset'));

					this.determineSize(images[i], images[i].getAttribute('zRS-srcset'));

				} else {

					src = images[i].getAttribute('zRS-src');

				}

				this.swapSrc({

					image: images[i],
					src: src,
					promise: {

						resolve: resolve,
						reject: reject

					}

				});

			});

		}

		Promise.all(promises).then(() => {

			if(promise) {

				promise.resolve();

			}

		});

		if(images.length === 0) {

			promise.resolve();

		}

	}

	static swapSrc(data) {

		let img;

		if(data.src === data.image.getAttribute(`src`) || `url("${data.src}")` === data.image.style.backgroundImage) {

			if(data.promise) {

				data.promise.resolve();

			}

			return;

		}

		img = new Image();

		img.addEventListener('load', () => {

			if(data.image.nodeName !== 'IMG') {

				data.image.style.backgroundImage = `url("${data.src}")`;

			} else {

				data.image.src = data.src;

			}

			if(data.promise) {

				data.promise.resolve();

			}

		});

		img.src = data.src;

	};

	static determineSize(element, srcset) {

		let src = [null, 0],
			largest;

		srcset = srcset.split(', ');
		largest = srcset[0].split(' ');

		for(let image of srcset) {

			image = image.split(' ');

			if(parseInt(image[1]) > parseInt(largest[1])) {

				largest = image;

			}

			if(element.clientWidth <= parseInt(image[1])) {

				src = image;

			}

		}

		if(src[0] === null) {

			src = largest;

		}

		return src[0];

	}

}

export default zRS_util;
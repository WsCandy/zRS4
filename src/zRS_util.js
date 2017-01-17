let lastTime = 0;

class zRS_util {

	static log(message, type = `log`, verbose = false) {

		if(verbose === true) {

			console[type](`[zRS - ${zRS.version()}]: ${message}`);

		}

	}

	static createEvent(name, detail = {}) {

		let event = null;

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

	static addClass(elements = null, className) {

		if(elements === null) {

			return;

		}

		let add = function(element, className) {

			if(element.classList) {

				element.classList.add(className);

			} else {

				element.className += ` ${className}`;

			}

		};

		if(typeof elements.length === 'undefined') {

			add(elements, className);

		} else {

			for(let i = 0, l = elements.length; i < l; i++) {

				add(elements[i], className);

			}

		}

	}

	static removeClass(elements = null, className) {

		if(elements === null) {

			return;

		}

		let remove = function(element, className) {

			if(element.classList) {

				element.classList.remove(className);

			} else {

				element.className = elements.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, `gi`), ' ').trim();

			}

		};

		if(typeof elements.length === 'undefined') {

			remove(elements, className);

		} else {

			for(let i = 0, l = elements.length; i < l; i++) {

				remove(elements[i], className);

			}

		}

	}

	static findElement(parent, element) {

		if(typeof element === 'string') {

			switch(element[0]) {

				case '.' :

					let selector = parent.querySelectorAll(element);

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

		if(images.length === 0 && promise) {

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

	static animationFrame(anim) {

		if(!window.requestAnimationFrame) {
			
			const currTime = new Date().getTime(),
				  timeToCall = Math.max(0, 16 - (currTime - lastTime));

			lastTime = currTime + timeToCall;

			return setTimeout(anim, timeToCall);

		}

		return requestAnimationFrame(anim);

	}

	static cancelAnimationFrame(anim) {

		if(!window.requestAnimationFrame) {

			clearTimeout(anim);

			return;

		}

		cancelAnimationFrame(anim);

	}

}

export default zRS_util;
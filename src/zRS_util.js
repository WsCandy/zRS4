import zRS from './zRS';

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

	static targetSlide(slide, total) {
		let target = slide;

		if(slide >= total) {

			target = (slide - total);

		} else if(slide < 0) {

			target = (slide + total);

		}

		return target;
	}

}

export default zRS_util;
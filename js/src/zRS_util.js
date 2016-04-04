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

	static interateObj(obj) {

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

					break;

				case '#' :

					return document.getElementById(element.substr(1));

					break;

				default:

					return false;

					break;

			}

		} else if(typeof element === 'object') {

			return element;

		} else {

			return false;

		}

	}

}

export default zRS_util;
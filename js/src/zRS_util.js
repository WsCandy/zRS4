class zRS_util {

	static log(message, type = `log`) {

		console[type](`[zRS - ${zRS.version()}]: ${message}`);

	}

	static createEvent(name) {

		var event;

		if(document.createEvent) {

			event = document.createEvent('Event');
			event.initEvent(name, false, false);

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

		let index = 0;

		let propKeys = Reflect.ownKeys(obj);

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

					return {done: true};

				}

			}

		}

	}

}

export default zRS_util;
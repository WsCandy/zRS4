class zRS_util {

	static log(message, type = `log`) {

		console[type](`[zRS - ${zRS.version()}]: ${message}`);

	}

	static createEvent(name) {

		var event;

		if(document.createEvent) {

			event = new Event(name);

		} else {

			event = document.createEvent('Event');
			event.initEvent('load', false, false);

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

}

export default zRS_util;
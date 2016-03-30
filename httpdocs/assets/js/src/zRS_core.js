import zRS_util from './zRS_util';

class zRS_core {

	constructor(element, options) {

		var zRS_trans = require(`./zRS_${options.transition}`).default;

		this.element = element;
		this.options = options;
		this.transition = new zRS_trans(this.element, this.options);

	}

	setUp() {



	}

}

export default zRS_core;
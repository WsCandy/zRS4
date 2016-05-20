class zRS_public {

	constructor(core) {

		this.next = () => {

			core.handleTransition(1);

		};

		this.prev = () => {

			core.handleTransition(-1);

		};

		this.pause = () => {

			core.pause();

		};

		this.play = () => {

			core.play();

		};

		this.transTo = (slide) => {

			core.transTo(slide);

		};

		this.jumpTo = (slide) => {

			core.transTo(slide, 0);

		};

		this.currentSlide = () => {

			return core.currentSlide;

		}

	}

}

export default zRS_public;
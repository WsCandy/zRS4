import zRS_util from './zRS_util';
import Promise from 'core-js/es6/promise';

class zRS_lazy {

	constructor(data) {

		this.options = data.options;
		this.events = data.events;
		this.elements = data.elements;

	}

	loadImages(slide, promise) {

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

					src = zRS_lazy.determineSize(images[i], images[i].getAttribute('zRS-srcset'));

					zRS_lazy.determineSize(images[i], images[i].getAttribute('zRS-srcset'));

				} else {

					src = images[i].getAttribute('zRS-src');

				}

				this.swapSrc({

					image: images[i],
					src: src,
					slide: slide,
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

	swapSrc(data) {

		let img,
			startTime = Date.now();

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

			zRS_util.dispatchEvent({

				name: 'imgLoad',
				event: zRS_util.createEvent('imgLoad', {

					element: data.image,
					slide: data.slide,
					loadTime: Date.now() - startTime

				}),
				element: this.elements.slider

			});

		});

		img.src = data.src;

	};

	static determineSize(element, srcset) {

		let src = [null, 0],
			largest;

		srcset = srcset.split(', ');
		largest = srcset[0].split(' ');

		for(let image in srcset) {

			if(!srcset.hasOwnProperty(image)) {

				continue;

			}

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

export default zRS_lazy;
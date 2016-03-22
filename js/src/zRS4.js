;(function(window) {

	'use strict';

	window.zRS4 = function(element, options) {

		var ins = this;
		var defaults = {

			option: 'tester'

		};
		var modules = {};
		var objects = {

			setUp: function() {

				this.test = function() {

					console.log('test');

				};

			},

			elements: function() {


			},

			controls: function() {


			},

			transitions: function() {


			}

		};

		var __construct = function() {

			/**
			 * Create modules
			 */

			for(var module in objects) {

				if(objects.hasOwnProperty(module)) {

					modules[module] = new objects[module];

				}

			}

		};

		ins.publicMethods = {


		};

		__construct();

	};

})(window);
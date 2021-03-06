!function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var s = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, e), s.l = !0, s.exports;
    }
    var n = {};
    e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 40);
}([ function(t, e, n) {
    var i = n(29)("wks"), s = n(16), r = n(1).Symbol, o = "function" == typeof r;
    (t.exports = function(t) {
        return i[t] || (i[t] = o && r[t] || (o ? r : s)("Symbol." + t));
    }).store = i;
}, function(t, e) {
    var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n);
}, function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), o = n(24), l = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(o), a = 0, u = function() {
        function t() {
            i(this, t);
        }
        return r(t, null, [ {
            key: "log",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
                !0 === (arguments.length > 2 && void 0 !== arguments[2] && arguments[2]) && console[e]("[zRS - " + l.default.version() + "]: " + t);
            }
        }, {
            key: "createEvent",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null;
                return document.createEvent && (n = document.createEvent("CustomEvent"), n.initCustomEvent(t, !1, !1, e)), 
                n;
            }
        }, {
            key: "dispatchEvent",
            value: function(t) {
                t.element.dispatchEvent ? t.element.dispatchEvent(t.event) : t.element.fireEvent && t.element.fireEvent(t.name, t.event);
            }
        }, {
            key: "addClass",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments[1];
                if (null !== t) {
                    var n = function(t, e) {
                        t.classList ? t.classList.add(e) : t.className += " " + e;
                    };
                    if (void 0 === t.length) n(t, e); else for (var i = 0, s = t.length; i < s; i++) n(t[i], e);
                }
            }
        }, {
            key: "removeClass",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments[1];
                if (null !== t) {
                    var n = function(e, n) {
                        e.classList ? e.classList.remove(n) : e.className = t.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " ").trim();
                    };
                    if (void 0 === t.length) n(t, e); else for (var i = 0, s = t.length; i < s; i++) n(t[i], e);
                }
            }
        }, {
            key: "findElement",
            value: function(t, e) {
                if ("string" != typeof e) return "object" === (void 0 === e ? "undefined" : s(e)) && e;
                switch (e[0]) {
                  case ".":
                    var n = t.querySelectorAll(e);
                    return n.length > 0 && n;

                  case "#":
                    return document.getElementById(e.substr(1));

                  default:
                    return !1;
                }
            }
        }, {
            key: "animationFrame",
            value: function(t) {
                if (!window.requestAnimationFrame) {
                    var e = new Date().getTime(), n = Math.max(0, 16 - (e - a));
                    return a = e + n, setTimeout(t, n);
                }
                return requestAnimationFrame(t);
            }
        }, {
            key: "cancelAnimationFrame",
            value: function(t) {
                function e(e) {
                    return t.apply(this, arguments);
                }
                return e.toString = function() {
                    return t.toString();
                }, e;
            }(function(t) {
                if (!window.requestAnimationFrame) return void clearTimeout(t);
                cancelAnimationFrame(t);
            })
        }, {
            key: "targetSlide",
            value: function(t, e) {
                var n = t;
                return t >= e ? n = t - e : t < 0 && (n = t + e), n;
            }
        } ]), t;
    }();
    e.default = u;
}, function(t, e, n) {
    var i = n(11), s = n(31);
    t.exports = n(6) ? function(t, e, n) {
        return i.f(t, e, s(1, n));
    } : function(t, e, n) {
        return t[e] = n, t;
    };
}, function(t, e, n) {
    var i = n(12);
    t.exports = function(t) {
        if (!i(t)) throw TypeError(t + " is not an object!");
        return t;
    };
}, function(t, e, n) {
    var i = n(1), s = n(3), r = n(7), o = n(16)("src"), l = Function.toString, a = ("" + l).split("toString");
    n(8).inspectSource = function(t) {
        return l.call(t);
    }, (t.exports = function(t, e, n, l) {
        var u = "function" == typeof n;
        u && (r(n, "name") || s(n, "name", e)), t[e] !== n && (u && (r(n, o) || s(n, o, t[e] ? "" + t[e] : a.join(String(e)))), 
        t === i ? t[e] = n : l ? t[e] ? t[e] = n : s(t, e, n) : (delete t[e], s(t, e, n)));
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[o] || l.call(this);
    });
}, function(t, e, n) {
    t.exports = !n(30)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, function(t, e) {
    var n = {}.hasOwnProperty;
    t.exports = function(t, e) {
        return n.call(t, e);
    };
}, function(t, e) {
    var n = t.exports = {
        version: "2.4.0"
    };
    "number" == typeof __e && (__e = n);
}, function(t, e) {
    t.exports = {};
}, function(t, e) {
    var n = {}.toString;
    t.exports = function(t) {
        return n.call(t).slice(8, -1);
    };
}, function(t, e, n) {
    var i = n(4), s = n(42), r = n(43), o = Object.defineProperty;
    e.f = n(6) ? Object.defineProperty : function(t, e, n) {
        if (i(t), e = r(e, !0), i(n), s) try {
            return o(t, e, n);
        } catch (t) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (t[e] = n.value), t;
    };
}, function(t, e) {
    t.exports = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
    };
}, function(t, e, n) {
    var i = n(20);
    t.exports = function(t, e, n) {
        if (i(t), void 0 === e) return t;
        switch (n) {
          case 1:
            return function(n) {
                return t.call(e, n);
            };

          case 2:
            return function(n, i) {
                return t.call(e, n, i);
            };

          case 3:
            return function(n, i, s) {
                return t.call(e, n, i, s);
            };
        }
        return function() {
            return t.apply(e, arguments);
        };
    };
}, function(t, e, n) {
    n(41), n(44), n(56), n(60), t.exports = n(8).Promise;
}, function(t, e, n) {
    var i = n(10), s = n(0)("toStringTag"), r = "Arguments" == i(function() {
        return arguments;
    }()), o = function(t, e) {
        try {
            return t[e];
        } catch (t) {}
    };
    t.exports = function(t) {
        var e, n, l;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = o(e = Object(t), s)) ? n : r ? i(e) : "Object" == (l = i(e)) && "function" == typeof e.callee ? "Arguments" : l;
    };
}, function(t, e) {
    var n = 0, i = Math.random();
    t.exports = function(t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36));
    };
}, function(t, e, n) {
    var i = n(12), s = n(1).document, r = i(s) && i(s.createElement);
    t.exports = function(t) {
        return r ? s.createElement(t) : {};
    };
}, function(t, e) {
    var n = Math.ceil, i = Math.floor;
    t.exports = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? i : n)(t);
    };
}, function(t, e) {
    t.exports = function(t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
    };
}, function(t, e) {
    t.exports = function(t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
    };
}, function(t, e, n) {
    var i = n(51), s = n(19);
    t.exports = function(t) {
        return i(s(t));
    };
}, function(t, e, n) {
    var i = n(29)("keys"), s = n(16);
    t.exports = function(t) {
        return i[t] || (i[t] = s(t));
    };
}, function(t, e, n) {
    var i = n(11).f, s = n(7), r = n(0)("toStringTag");
    t.exports = function(t, e, n) {
        t && !s(t = n ? t : t.prototype, r) && i(t, r, {
            configurable: !0,
            value: e
        });
    };
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, o = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), l = n(2), a = i(l), u = n(25), c = i(u), h = function() {
        function t(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (s(this, t), this.element = e, this.instances = {}, this.defaults = this.settings = {
                transition: "fade",
                inner: ".zRS__inner",
                slides: "zRS__slide",
                controls: [],
                pager: null,
                delay: 5e3,
                speed: 750,
                slideBy: 1,
                slideSpacing: 0,
                direction: "forward",
                keyboardControls: !0,
                alignment: 0,
                visibleSlides: 1,
                setVisibleSlides: null,
                drag: !0,
                infinite: !0,
                verbose: !1,
                freeStyle: !1,
                friction: .35
            }, this.sliders = a.default.findElement(document, this.element), this.sliders && 0 !== this.sliders.length) return this.setOptions(n), 
            this.setObjects(), this.instances;
        }
        return o(t, null, [ {
            key: "version",
            value: function() {
                return "4.1.9";
            }
        } ]), o(t, [ {
            key: "setOptions",
            value: function(t) {
                if (t) {
                    if ("object" !== (void 0 === t ? "undefined" : r(t))) return void a.default.log("Please provide an object for this method", "warn");
                    for (var e in this.defaults) if (this.defaults.hasOwnProperty(e)) {
                        if (void 0 === t[e]) {
                            this.settings[e] = this.defaults[e];
                            continue;
                        }
                        this.settings[e] = t[e];
                    }
                    this.manipulateOptions();
                }
            }
        }, {
            key: "manipulateOptions",
            value: function() {
                if ("reverse" === this.settings.direction && (this.settings.slideBy = -Math.abs(this.settings.slideBy)), 
                "fade" === this.settings.transition && (this.settings.visibleSlides = 1), "string" == typeof this.settings.alignment) switch (this.settings.alignment) {
                  case "right":
                    this.settings.alignment = 1;
                    break;

                  case "center":
                    this.settings.alignment = .5;
                    break;

                  default:
                    this.settings.alignment = 0;
                }
                if ("number" != typeof this.settings.alignment) return void a.default.log("Alignment setting needs to be either an int or a string. Transition will not function correctly until rectified.", "error", this.settings.verbose);
                this.settings.alignment = Math.min(this.settings.alignment, 1), this.settings.alignment = Math.max(this.settings.alignment, 0);
            }
        }, {
            key: "setObjects",
            value: function() {
                if ("object" === r(this.sliders) && this.sliders.length > 0) for (var t = 0, e = this.sliders.length; t < e; t++) {
                    var n = this.sliders[t], i = n.getAttribute("id") || t;
                    this.instances[i] = new c.default(n, this.settings);
                } else this.instances = new c.default(this.sliders, this.settings);
            }
        } ]), t;
    }();
    e.default = h;
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, o = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), l = n(2), a = i(l), u = n(26), c = i(u), h = n(27), f = i(h), d = n(28), v = i(d), m = n(14), p = i(m), g = function() {
        function t(e, i) {
            s(this, t);
            try {
                this.zRS_trans = n(72)("./zRS_" + i.transition + ".js").default;
            } catch (t) {
                a.default.log("The transition '" + i.transition + "' doesn't exist, falling back to fade.", "warn", this.options.verbose), 
                this.zRS_trans = n(39).default;
            }
            if (this.options = i, this.timer = null, this.events = {}, this.currentSlide = 0, 
            this.defaultVisible = this.options.visibleSlides, this.elements = {
                slider: e,
                inner: null,
                slides: null,
                pager: null,
                controls: [],
                anchors: []
            }, !0 === this.indexElements()) {
                this.createEvents(), this.styleElements(), this.lazy = new v.default({
                    options: this.options,
                    elements: this.elements
                }), this.transition = new this.zRS_trans({
                    elements: this.elements,
                    options: this.options,
                    lazy: this.lazy
                }), this.setVisibleSlides(), this.elements.slides.length > this.options.visibleSlides && (this.play(), 
                this.bindings(), this.setUpPager(), this.setUpControls()), this.bindResize(), this.loadInitialSlides();
                var r = a.default.createEvent("load", {
                    slides: this.elements.slides,
                    current: this.currentSlide,
                    currentSlide: this.elements.slides[this.currentSlide]
                });
                return a.default.dispatchEvent({
                    name: "load",
                    event: r,
                    element: this.elements.slider
                }), new f.default(this);
            }
        }
        return o(t, [ {
            key: "indexElements",
            value: function() {
                if (this.elements.inner = a.default.findElement(this.elements.slider, this.options.inner), 
                this.elements.inner = this.elements.inner.length ? this.elements.inner[0] : this.elements.inner, 
                !this.elements.inner) return a.default.log("Cannot find " + this.options.inner + " inner element, stopping initialisation", "error", this.options.verbose), 
                !1;
                this.elements.pager = a.default.findElement(this.elements.slider, this.options.pager);
                for (var t = 0, e = this.options.controls.length; t < e; t++) this.elements.controls.push(a.default.findElement(this.elements.slider, this.options.controls[t]));
                return this.elements.inner.children.length <= 0 ? (a.default.log("Cannot find any slides, stopping initialisation", "error", this.options.verbose), 
                !1) : (this.elements.slides = this.elements.inner.children, !0);
            }
        }, {
            key: "setUpControls",
            value: function() {
                var t = this;
                if (0 !== this.options.controls.length) {
                    for (var e = 0, n = this.elements.controls.length; e < n; e++) {
                        var i = void 0;
                        this.elements.controls[e] ? (i = this.elements.controls[e].length ? this.elements.controls[e][0] : this.elements.controls[e], 
                        i.addEventListener("mousedown", function(t) {
                            t.preventDefault(), t.stopPropagation();
                        }), i.addEventListener("mouseup", function(t) {
                            t.preventDefault(), t.stopPropagation();
                        }), i.addEventListener("click", function(e) {
                            var n = t.elements.controls[0].length ? t.elements.controls[0][0] : t.elements.controls[0], i = e.target === n ? t.options.slideBy : -t.options.slideBy;
                            e.preventDefault(), t.resetTimer(), t.handleTransition(i);
                        })) : a.default.log("Cannot find control " + this.options.controls[e] + ", please double check your reference.", "warn", this.options.verbose);
                    }
                    !1 === this.options.infinite && this.toggleControlClasses();
                }
            }
        }, {
            key: "toggleControlClasses",
            value: function() {
                var t = this.elements.controls[1] && this.elements.controls[1].length ? this.elements.controls[1][0] : this.elements.controls[1], e = this.elements.controls[0] && this.elements.controls[0].length ? this.elements.controls[0][0] : this.elements.controls[0];
                this.currentSlide === this.elements.slides.length - 1 ? a.default.addClass(e, "zRS--inactive") : a.default.removeClass(e, "zRS--inactive"), 
                0 === this.currentSlide ? a.default.addClass(t, "zRS--inactive") : a.default.removeClass(t, "zRS--inactive");
            }
        }, {
            key: "setUpPager",
            value: function() {
                var t = this;
                if (this.options.pager) {
                    if (!this.elements.pager) return void a.default.log("Cannot find pager container " + this.options.pager + ", please double check your reference.", "warn", this.options.verbose);
                    var e = this.elements.pager.length ? this.elements.pager[0] : this.elements.pager;
                    if (e.children.length) {
                        if (e.children.length !== this.elements.slides.length) return void a.default.log("Please make sure your pager contains " + this.elements.slides.length + " children to use customer pager elements.", "warn", this.options.verbose);
                        for (var n = 0, i = e.children.length; n < i; n++) !function(n, i) {
                            0 === n && a.default.addClass(e.children[n], "is-active"), t.elements.anchors.push(e.children[n]), 
                            e.children[n].addEventListener("mousedown", function(t) {
                                t.stopPropagation();
                            }), e.children[n].addEventListener("click", function(e) {
                                e.preventDefault(), t.transTo(n);
                            });
                        }(n);
                    } else for (var n = 0, i = this.elements.slides.length; n < i; n++) !function(n, i) {
                        var s = document.createElement("a");
                        s.href = "javascript:void(0);", 0 === n && a.default.addClass(s, "is-active"), a.default.addClass(s, "zRS__anchor"), 
                        t.elements.anchors.push(s), e.appendChild(s), s.addEventListener("mousedown", function(t) {
                            t.stopPropagation();
                        }), s.addEventListener("click", function(e) {
                            e.preventDefault(), t.transTo(n);
                        });
                    }(n);
                }
            }
        }, {
            key: "resetPager",
            value: function() {
                for (var t = 0, e = this.elements.anchors.length; t < e; t++) 0 !== t ? a.default.removeClass(this.elements.anchors[t], "is-active") : a.default.addClass(this.elements.anchors[t], "is-active");
            }
        }, {
            key: "styleElements",
            value: function() {
                this.elements.inner.style.width = "100%", this.elements.inner.style.overflow = "hidden", 
                this.elements.inner.style.position = "relative";
                for (var t = 0, e = this.elements.slides.length; t < e; t++) a.default.addClass(this.elements.slides[t], this.options.slides);
            }
        }, {
            key: "createEvents",
            value: function() {
                this.events.play = a.default.createEvent("play"), this.events.pause = a.default.createEvent("pause");
            }
        }, {
            key: "bindResize",
            value: function() {
                var t = this;
                window.addEventListener("resize", function() {
                    a.default.animationFrame(function() {
                        t.lazy.loadImages(t.elements.slides[t.currentSlide]), t.setVisibleSlides();
                    });
                });
            }
        }, {
            key: "bindings",
            value: function() {
                var t = this;
                new c.default(this), window.addEventListener("blur", function() {
                    t.transition.animation && a.default.cancelAnimationFrame(t.transition.animation), 
                    t.pause();
                }), window.addEventListener("focus", function() {
                    t.transition.animation && t.handleTransition(0), t.play();
                }), this.elements.slider.addEventListener("before", function(e) {
                    t.currentSlide = e.detail.target, a.default.removeClass(t.elements.anchors[e.detail.current], "is-active"), 
                    a.default.addClass(t.elements.anchors[e.detail.target], "is-active"), 0 !== t.options.controls.length && !1 === t.options.infinite && t.toggleControlClasses();
                }), !0 === this.options.keyboardControls && (this.elements.slider.tabIndex = 0, 
                this.elements.slider.style.outline = "none", this.elements.slider.addEventListener("keydown", function(e) {
                    t.resetTimer(), 37 === e.which ? t.handleTransition(-1) : 39 === e.which && t.handleTransition(1);
                }));
            }
        }, {
            key: "loadInitialSlides",
            value: function() {
                if ("fade" === this.options.transition) return void this.lazy.loadImages(this.elements.slides[0]);
                if (0 !== this.options.alignment && 1 !== this.options.alignment) {
                    this.lazy.loadImages(this.elements.slides[0]);
                    for (var t = Math.floor(this.options.visibleSlides / 2), e = 0, n = 0, i = t; e < i; e++, 
                    n--) if (this.elements.slides[a.default.targetSlide(e + 1, this.elements.slides.length)]) {
                        if (this.lazy.loadImages(this.elements.slides[a.default.targetSlide(e + 1, this.elements.slides.length)]), 
                        !1 === this.options.infinite) break;
                        this.lazy.loadImages(this.elements.slides[a.default.targetSlide(n - 1, this.elements.slides.length)]);
                    }
                } else if (0 === this.options.alignment) for (var s = 0, r = this.options.visibleSlides; s < r; s++) this.elements.slides[a.default.targetSlide(s, this.elements.slides.length)] && this.lazy.loadImages(this.elements.slides[a.default.targetSlide(s, this.elements.slides.length)]); else for (var o = 0, l = -this.options.visibleSlides; o > l && !(o < 0 && !1 === this.options.infinite); o--) this.elements.slides[a.default.targetSlide(o, this.elements.slides.length)] && this.lazy.loadImages(this.elements.slides[a.default.targetSlide(o, this.elements.slides.length)]);
            }
        }, {
            key: "setVisibleSlides",
            value: function() {
                if ("object" === r(this.options.setVisibleSlides) && void 0 !== this.transition.visible) for (var t in this.options.setVisibleSlides) if (this.options.setVisibleSlides.hasOwnProperty(t)) {
                    if (document.documentElement.clientWidth <= t) return void this.updateVisible(this.options.setVisibleSlides[t]);
                    this.updateVisible(this.defaultVisible);
                }
            }
        }, {
            key: "play",
            value: function() {
                this.elements.slides.length <= 1 || (this.resetTimer(), a.default.dispatchEvent({
                    name: "play",
                    event: this.events.play,
                    element: this.elements.slider
                }));
            }
        }, {
            key: "updateVisible",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                if (t > this.elements.slides.length) return void a.default.log("Cannot show more slides than total number of slides.", "warn", this.options.verbose);
                if (this.options.visibleSlides !== t) {
                    this.options.visibleSlides = t, this.currentSlide = 0, this.resetPager(), a.default.dispatchEvent({
                        name: "visibleSlides",
                        event: a.default.createEvent("visibleSlides", {
                            visible: t
                        }),
                        element: this.elements.slider
                    });
                    for (var e = 0; e < t; e++) this.lazy.loadImages(this.elements.slides[e]);
                }
            }
        }, {
            key: "transTo",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options.speed, n = t - this.currentSlide;
                if (!this.elements.slides[t]) return void a.default.log("Slide " + t + " doesn't exist, please amend the method call.", "warn", this.options.verbose);
                0 !== n && (this.resetTimer(), this.handleTransition(n, e));
            }
        }, {
            key: "resetTimer",
            value: function() {
                var t = this;
                clearInterval(this.timer), this.options.delay < 0 || (this.timer = setInterval(function() {
                    var e = t.options.slideBy;
                    t.handleTransition(e);
                }, this.options.delay));
            }
        }, {
            key: "pause",
            value: function() {
                clearInterval(this.timer), a.default.dispatchEvent({
                    name: "pause",
                    event: this.events.pause,
                    element: this.elements.slider
                });
            }
        }, {
            key: "handleTransition",
            value: function() {
                var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options.speed;
                e = null !== e ? e : this.options.slideBy;
                var i = this.currentSlide, s = [], r = i + e;
                if (r = a.default.targetSlide(r, this.elements.slides.length), "fade" !== this.options.transition) for (var o = i; o < r; o++) !function(e) {
                    s.push(new p.default(function(n, i) {
                        t.lazy.loadImages(t.elements.slides[e], {
                            resolve: n,
                            reject: i
                        });
                    }));
                }(o);
                for (var o = 0; o < this.options.visibleSlides; o++) !function(e) {
                    var n = a.default.targetSlide(r + e, t.elements.slides.length);
                    s.push(new p.default(function(e, i) {
                        t.lazy.loadImages(t.elements.slides[n], {
                            resolve: e,
                            reject: i
                        });
                    }));
                }(o);
                p.default.all(s).then(function() {
                    t.transition.handle(t.currentSlide, i, n, e);
                }), a.default.dispatchEvent({
                    name: "before",
                    event: a.default.createEvent("before", {
                        current: parseInt(i),
                        currentSlide: this.elements.slides[i],
                        target: parseInt(r),
                        targetSlide: this.elements.slides[r]
                    }),
                    element: this.elements.slider
                });
            }
        } ]), t;
    }();
    e.default = g;
}, function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), r = n(2), o = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(r), l = function() {
        function t(e) {
            if (i(this, t), this.core = e, this.isTouch = "ontouchstart" in document.documentElement, 
            this.scrolling = !1, this.scrollTimer = null, this.active = !1, this.moved = !1, 
            this.startPos = 0, this.lastPos = 0, this.currentPos = 0, this.lastPercent = 0, 
            this.initialDirection = "", this.buffer = .025, this.startTime = 0, this.lastTime = 0, 
            this.dragging = !1, this.velocity = 0, this.friction = e.options.friction, !this.core.transition.touchMove || !this.core.transition.touchEnd || !this.core.transition.touchStart) return void o.default.log("The active transition is missing touch handlers, is this intended? Touch is now disabled.", "warn", this.core.options.verbose);
            this.bindings(), this.setScrolling();
        }
        return s(t, [ {
            key: "bindings",
            value: function() {
                var t = this;
                this.core.elements.slider.style.cursor = "move", this.core.elements.slider.style.cursor = "grab", 
                this.core.elements.slider.style.cursor = "-webkit-grab", this.isTouch || !0 !== this.core.options.drag || this.core.elements.slider.addEventListener("mousedown", function(e) {
                    e.preventDefault(), t.activate(e), t.core.elements.slider.style.cursor = "grabbing", 
                    t.core.elements.slider.style.cursor = "-webkit-grabbing";
                }), document.addEventListener("mousemove", function(e) {
                    t.move(e);
                }), document.addEventListener("mouseup", function(e) {
                    t.deactivate(e), t.core.elements.slider.style.cursor = "move", t.core.elements.slider.style.cursor = "grab", 
                    t.core.elements.slider.style.cursor = "-webkit-grab";
                }), this.core.elements.slider.addEventListener("touchstart", function(e) {
                    t.activate(e);
                }), document.addEventListener("touchmove", function(e) {
                    t.move(e);
                }), document.addEventListener("touchend", function(e) {
                    t.deactivate(e);
                }), this.core.elements.slider.addEventListener("after", function(e) {
                    t.core.play(), t.dragging = !1;
                });
                for (var e = this.core.elements.inner.querySelectorAll("a"), n = 0, i = e.length; n < i; n++) e[n].addEventListener("click", function(e) {
                    !0 === t.dragging && e.preventDefault();
                });
            }
        }, {
            key: "activate",
            value: function(t) {
                var e = void 0 === t.pageX ? t.touches[0].pageX : t.pageX;
                if (3 === t.which) return void t.preventDefault();
                this.active = !0, this.startPos = this.currentPos = this.lastPos = e, this.lastPercent = 0, 
                this.velocity = 0, this.core.transition.touchStart(t), this.startTime = this.lastTime = Date.now();
            }
        }, {
            key: "move",
            value: function(t) {
                var e = void 0 === t.pageX ? t.touches[0].pageX : t.pageX, n = this.startPos - e;
                if (!0 !== this.scrolling && !1 !== this.active) {
                    var i = 0, s = (this.core.elements.slider.clientWidth * this.buffer + n) / this.core.elements.slider.clientWidth * 100, r = (-this.core.elements.slider.clientWidth * this.buffer + n) / this.core.elements.slider.clientWidth * 100;
                    if (this.currentPos = e, this.isTouch || t.preventDefault(), !(Math.abs(n) < this.core.elements.slider.clientWidth * this.buffer && !1 === this.moved)) {
                        t.preventDefault(), n < 0 && !1 === this.moved ? (i = s, this.initialDirection = "forward") : n > 0 && !1 === this.moved ? (i = r, 
                        this.initialDirection = "back") : i = "forward" === this.initialDirection ? s : r, 
                        !1 === this.moved && (o.default.addClass(this.core.elements.slider, "zRS--active"), 
                        this.core.pause()), this.moved = this.dragging = !0;
                        var l = this.currentPos - this.lastPos, a = Math.max(1, Date.now() - this.lastTime), u = l / a;
                        this.velocity = 0 === u ? this.velocity : u, this.velocity /= this.core.elements.slider.clientWidth, 
                        this.velocity *= 100, this.lastPos = e, this.lastTime = Date.now(), this.core.transition.touchMove(t, i, this.lastPercent), 
                        this.lastPercent = i;
                    }
                }
            }
        }, {
            key: "deactivate",
            value: function(t) {
                if (!1 === this.active || this.lastPos === this.startPos) return this.active = this.moved = !1, 
                void this.core.transition.touchEnd(t, 0, 300);
                var e = Date.now() - this.startTime, n = this.startPos / this.core.elements.slider.clientWidth - this.lastPos / this.core.elements.slider.clientWidth;
                n *= 100;
                var i = n / e;
                i *= 100;
                var s = Math.pow(this.velocity, 2) / (2 * this.friction);
                s *= 100, n < 35 && (s += 1.65 * Math.abs(i)), n < 0 && (s *= -1);
                var r = Math.abs(2 * s / this.velocity);
                r = Math.max(300, r), r = Math.round(r), r = Math.min(r, this.core.options.speed), 
                this.active = this.moved = !1, o.default.removeClass(this.core.elements.slider, "zRS--active"), 
                this.core.transition.touchEnd(t, s, r);
            }
        }, {
            key: "setScrolling",
            value: function() {
                var t = this;
                this.isTouch && window.addEventListener("scroll", function() {
                    o.default.animationFrame(function() {
                        t.scrolling = !0, clearTimeout(t.scrollTimer), t.scrollTimer = setTimeout(function() {
                            t.scrolling = !1;
                        }, 200);
                    });
                });
            }
        } ]), t;
    }();
    e.default = l;
}, function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = function t(e) {
        i(this, t), this.next = function() {
            e.handleTransition(1);
        }, this.prev = function() {
            e.handleTransition(-1);
        }, this.pause = function() {
            e.pause();
        }, this.play = function() {
            e.play();
        }, this.transTo = function(t) {
            e.transTo(t);
        }, this.jumpTo = function(t) {
            e.transTo(t, 0);
        }, this.currentSlide = function() {
            return e.currentSlide;
        }, this.updateVisible = function(t) {
            e.updateVisible(t);
        };
    };
    e.default = s;
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), o = n(2), l = i(o), a = n(14), u = i(a), c = function() {
        function t(e) {
            s(this, t), this.options = e.options, this.events = e.events, this.elements = e.elements;
        }
        return r(t, [ {
            key: "loadImages",
            value: function(e, n) {
                var i = this, s = [], r = [], o = e.querySelectorAll("*");
                (e.hasAttribute("zRS-srcset") || e.hasAttribute("zRS-src")) && s.push(e);
                for (var l = 0, a = o.length; l < a; l++) (o[l].hasAttribute("zRS-srcset") || o[l].hasAttribute("zRS-src")) && s.push(o[l]);
                for (var c = 0, h = s.length; c < h; c++) !function(n, o) {
                    var l = void 0;
                    r[n] = new u.default(function(r, o) {
                        s[n].hasAttribute("zRS-srcset") ? (l = t.determineSize(s[n], s[n].getAttribute("zRS-srcset")), 
                        t.determineSize(s[n], s[n].getAttribute("zRS-srcset"))) : l = s[n].getAttribute("zRS-src"), 
                        i.swapSrc({
                            image: s[n],
                            src: l,
                            slide: e,
                            promise: {
                                resolve: r,
                                reject: o
                            }
                        });
                    });
                }(c);
                u.default.all(r).then(function() {
                    n && n.resolve();
                }), 0 === s.length && n && n.resolve();
            }
        }, {
            key: "swapSrc",
            value: function(t) {
                var e = this, n = void 0, i = Date.now();
                if (t.src === t.image.getAttribute("src") || 'url("' + t.src + '")' === t.image.style.backgroundImage) return void (t.promise && t.promise.resolve());
                n = new Image(), n.addEventListener("load", function() {
                    "IMG" !== t.image.nodeName ? t.image.style.backgroundImage = 'url("' + t.src + '")' : t.image.src = t.src, 
                    t.promise && t.promise.resolve(), l.default.dispatchEvent({
                        name: "imgLoad",
                        event: l.default.createEvent("imgLoad", {
                            element: t.image,
                            slide: t.slide,
                            loadTime: Date.now() - i
                        }),
                        element: e.elements.slider
                    });
                }), n.src = t.src;
            }
        } ], [ {
            key: "determineSize",
            value: function(t, e) {
                var n = [ null, 0 ], i = void 0;
                e = e.split(", "), i = e[0].split(" ");
                for (var s in e) e.hasOwnProperty(s) && (s = s.split(" "), parseInt(s[1]) > parseInt(i[1]) && (i = s), 
                t.clientWidth <= parseInt(s[1]) && (n = s));
                return null === n[0] && (n = i), n[0];
            }
        } ]), t;
    }();
    e.default = c;
}, function(t, e, n) {
    var i = n(1), s = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
    t.exports = function(t) {
        return s[t] || (s[t] = {});
    };
}, function(t, e) {
    t.exports = function(t) {
        try {
            return !!t();
        } catch (t) {
            return !0;
        }
    };
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
        };
    };
}, function(t, e, n) {
    "use strict";
    var i = n(33), s = n(34), r = n(5), o = n(3), l = n(7), a = n(9), u = n(46), c = n(23), h = n(54), f = n(0)("iterator"), d = !([].keys && "next" in [].keys()), v = function() {
        return this;
    };
    t.exports = function(t, e, n, m, p, g, y) {
        u(n, e, m);
        var b, S, w, P = function(t) {
            if (!d && t in x) return x[t];
            switch (t) {
              case "keys":
              case "values":
                return function() {
                    return new n(this, t);
                };
            }
            return function() {
                return new n(this, t);
            };
        }, _ = e + " Iterator", k = "values" == p, E = !1, x = t.prototype, T = x[f] || x["@@iterator"] || p && x[p], j = T || P(p), M = p ? k ? P("entries") : j : void 0, O = "Array" == e ? x.entries || T : T;
        if (O && (w = h(O.call(new t()))) !== Object.prototype && (c(w, _, !0), i || l(w, f) || o(w, f, v)), 
        k && T && "values" !== T.name && (E = !0, j = function() {
            return T.call(this);
        }), i && !y || !d && !E && x[f] || o(x, f, j), a[e] = j, a[_] = v, p) if (b = {
            values: k ? j : P("values"),
            keys: g ? j : P("keys"),
            entries: M
        }, y) for (S in b) S in x || r(x, S, b[S]); else s(s.P + s.F * (d || E), e, b);
        return b;
    };
}, function(t, e) {
    t.exports = !1;
}, function(t, e, n) {
    var i = n(1), s = n(8), r = n(3), o = n(5), l = n(13), a = function(t, e, n) {
        var u, c, h, f, d = t & a.F, v = t & a.G, m = t & a.S, p = t & a.P, g = t & a.B, y = v ? i : m ? i[e] || (i[e] = {}) : (i[e] || {}).prototype, b = v ? s : s[e] || (s[e] = {}), S = b.prototype || (b.prototype = {});
        v && (n = e);
        for (u in n) c = !d && y && void 0 !== y[u], h = (c ? y : n)[u], f = g && c ? l(h, i) : p && "function" == typeof h ? l(Function.call, h) : h, 
        y && o(y, u, h, t & a.U), b[u] != h && r(b, u, f), p && S[u] != h && (S[u] = h);
    };
    i.core = s, a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, 
    t.exports = a;
}, function(t, e, n) {
    var i = n(18), s = Math.min;
    t.exports = function(t) {
        return t > 0 ? s(i(t), 9007199254740991) : 0;
    };
}, function(t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(t, e, n) {
    t.exports = n(1).document && document.documentElement;
}, function(t, e, n) {
    var i, s, r, o = n(13), l = n(67), a = n(37), u = n(17), c = n(1), h = c.process, f = c.setImmediate, d = c.clearImmediate, v = c.MessageChannel, m = 0, p = {}, g = function() {
        var t = +this;
        if (p.hasOwnProperty(t)) {
            var e = p[t];
            delete p[t], e();
        }
    }, y = function(t) {
        g.call(t.data);
    };
    f && d || (f = function(t) {
        for (var e = [], n = 1; arguments.length > n; ) e.push(arguments[n++]);
        return p[++m] = function() {
            l("function" == typeof t ? t : Function(t), e);
        }, i(m), m;
    }, d = function(t) {
        delete p[t];
    }, "process" == n(10)(h) ? i = function(t) {
        h.nextTick(o(g, t, 1));
    } : v ? (s = new v(), r = s.port2, s.port1.onmessage = y, i = o(r.postMessage, r, 1)) : c.addEventListener && "function" == typeof postMessage && !c.importScripts ? (i = function(t) {
        c.postMessage(t + "", "*");
    }, c.addEventListener("message", y, !1)) : i = "onreadystatechange" in u("script") ? function(t) {
        a.appendChild(u("script")).onreadystatechange = function() {
            a.removeChild(this), g.call(t);
        };
    } : function(t) {
        setTimeout(o(g, t, 1), 0);
    }), t.exports = {
        set: f,
        clear: d
    };
}, function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), r = n(2), o = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(r), l = function() {
        function t(e) {
            i(this, t), this.elements = e.elements, this.options = e.options, this.lazy = e.lazy, 
            this.animations = {}, this.styleSlides();
        }
        return s(t, [ {
            key: "styleSlides",
            value: function() {
                for (var t = 0, e = this.elements.slides.length; t < e; t++) {
                    var n = this.elements.slides[t];
                    n.style.width = "100%", n.style.top = "0", n.style.left = "0", n.style.opacity = 1, 
                    n.style.transform = "translateZ(0)", 0 !== t ? (n.style.position = "absolute", n.style.zIndex = 0, 
                    n.style.opacity = 0) : (n.style.position = "relative", n.style.zIndex = 2);
                }
            }
        }, {
            key: "animate",
            value: function(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i = this, s = arguments[3], r = arguments[4];
                n += 1e3 / 60 / r, this.animations[t] = o.default.animationFrame(function() {
                    if (e.style.opacity = Math.min(n, 1), 1 !== Math.min(n, 1)) return void i.animate(t, e, n, s, r);
                    i.elements.slides[s].style.opacity = 0, i.event = o.default.createEvent("after", {
                        current: parseInt(t),
                        currentSlide: i.elements.slides[t],
                        prev: parseInt(s),
                        prevSlide: i.elements.slides[s]
                    }), o.default.dispatchEvent({
                        name: "after",
                        event: i.event,
                        element: i.elements.slider
                    });
                });
            }
        }, {
            key: "handle",
            value: function(t, e, n) {
                for (var i = 0, s = this.elements.slides.length; i < s; i++) {
                    var r = this.elements.slides[i];
                    r !== this.elements.slides[e] ? r !== this.elements.slides[t] ? r.style.zIndex = 0 : (r.style.zIndex = 2, 
                    r.style.position = "relative", this.animate(i, r, 0, e, n)) : (r.style.zIndex = 1, 
                    r.style.position = "absolute");
                }
            }
        } ]), t;
    }();
    e.default = l;
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(24), s = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(i);
    window.zRS = s.default, e.default = s.default;
}, function(t, e, n) {
    "use strict";
    var i = n(15), s = {};
    s[n(0)("toStringTag")] = "z", s + "" != "[object z]" && n(5)(Object.prototype, "toString", function() {
        return "[object " + i(this) + "]";
    }, !0);
}, function(t, e, n) {
    t.exports = !n(6) && !n(30)(function() {
        return 7 != Object.defineProperty(n(17)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, function(t, e, n) {
    var i = n(12);
    t.exports = function(t, e) {
        if (!i(t)) return t;
        var n, s;
        if (e && "function" == typeof (n = t.toString) && !i(s = n.call(t))) return s;
        if ("function" == typeof (n = t.valueOf) && !i(s = n.call(t))) return s;
        if (!e && "function" == typeof (n = t.toString) && !i(s = n.call(t))) return s;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(t, e, n) {
    "use strict";
    var i = n(45)(!0);
    n(32)(String, "String", function(t) {
        this._t = String(t), this._i = 0;
    }, function() {
        var t, e = this._t, n = this._i;
        return n >= e.length ? {
            value: void 0,
            done: !0
        } : (t = i(e, n), this._i += t.length, {
            value: t,
            done: !1
        });
    });
}, function(t, e, n) {
    var i = n(18), s = n(19);
    t.exports = function(t) {
        return function(e, n) {
            var r, o, l = String(s(e)), a = i(n), u = l.length;
            return a < 0 || a >= u ? t ? "" : void 0 : (r = l.charCodeAt(a), r < 55296 || r > 56319 || a + 1 === u || (o = l.charCodeAt(a + 1)) < 56320 || o > 57343 ? t ? l.charAt(a) : r : t ? l.slice(a, a + 2) : o - 56320 + (r - 55296 << 10) + 65536);
        };
    };
}, function(t, e, n) {
    "use strict";
    var i = n(47), s = n(31), r = n(23), o = {};
    n(3)(o, n(0)("iterator"), function() {
        return this;
    }), t.exports = function(t, e, n) {
        t.prototype = i(o, {
            next: s(1, n)
        }), r(t, e + " Iterator");
    };
}, function(t, e, n) {
    var i = n(4), s = n(48), r = n(36), o = n(22)("IE_PROTO"), l = function() {}, a = function() {
        var t, e = n(17)("iframe"), i = r.length;
        for (e.style.display = "none", n(37).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, 
        t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), a = t.F; i--; ) delete a.prototype[r[i]];
        return a();
    };
    t.exports = Object.create || function(t, e) {
        var n;
        return null !== t ? (l.prototype = i(t), n = new l(), l.prototype = null, n[o] = t) : n = a(), 
        void 0 === e ? n : s(n, e);
    };
}, function(t, e, n) {
    var i = n(11), s = n(4), r = n(49);
    t.exports = n(6) ? Object.defineProperties : function(t, e) {
        s(t);
        for (var n, o = r(e), l = o.length, a = 0; l > a; ) i.f(t, n = o[a++], e[n]);
        return t;
    };
}, function(t, e, n) {
    var i = n(50), s = n(36);
    t.exports = Object.keys || function(t) {
        return i(t, s);
    };
}, function(t, e, n) {
    var i = n(7), s = n(21), r = n(52)(!1), o = n(22)("IE_PROTO");
    t.exports = function(t, e) {
        var n, l = s(t), a = 0, u = [];
        for (n in l) n != o && i(l, n) && u.push(n);
        for (;e.length > a; ) i(l, n = e[a++]) && (~r(u, n) || u.push(n));
        return u;
    };
}, function(t, e, n) {
    var i = n(10);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
        return "String" == i(t) ? t.split("") : Object(t);
    };
}, function(t, e, n) {
    var i = n(21), s = n(35), r = n(53);
    t.exports = function(t) {
        return function(e, n, o) {
            var l, a = i(e), u = s(a.length), c = r(o, u);
            if (t && n != n) {
                for (;u > c; ) if ((l = a[c++]) != l) return !0;
            } else for (;u > c; c++) if ((t || c in a) && a[c] === n) return t || c || 0;
            return !t && -1;
        };
    };
}, function(t, e, n) {
    var i = n(18), s = Math.max, r = Math.min;
    t.exports = function(t, e) {
        return t = i(t), t < 0 ? s(t + e, 0) : r(t, e);
    };
}, function(t, e, n) {
    var i = n(7), s = n(55), r = n(22)("IE_PROTO"), o = Object.prototype;
    t.exports = Object.getPrototypeOf || function(t) {
        return t = s(t), i(t, r) ? t[r] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? o : null;
    };
}, function(t, e, n) {
    var i = n(19);
    t.exports = function(t) {
        return Object(i(t));
    };
}, function(t, e, n) {
    for (var i = n(57), s = n(5), r = n(1), o = n(3), l = n(9), a = n(0), u = a("iterator"), c = a("toStringTag"), h = l.Array, f = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], d = 0; d < 5; d++) {
        var v, m = f[d], p = r[m], g = p && p.prototype;
        if (g) {
            g[u] || o(g, u, h), g[c] || o(g, c, m), l[m] = h;
            for (v in i) g[v] || s(g, v, i[v], !0);
        }
    }
}, function(t, e, n) {
    "use strict";
    var i = n(58), s = n(59), r = n(9), o = n(21);
    t.exports = n(32)(Array, "Array", function(t, e) {
        this._t = o(t), this._i = 0, this._k = e;
    }, function() {
        var t = this._t, e = this._k, n = this._i++;
        return !t || n >= t.length ? (this._t = void 0, s(1)) : "keys" == e ? s(0, n) : "values" == e ? s(0, t[n]) : s(0, [ n, t[n] ]);
    }, "values"), r.Arguments = r.Array, i("keys"), i("values"), i("entries");
}, function(t, e, n) {
    var i = n(0)("unscopables"), s = Array.prototype;
    void 0 == s[i] && n(3)(s, i, {}), t.exports = function(t) {
        s[i][t] = !0;
    };
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            value: e,
            done: !!t
        };
    };
}, function(t, e, n) {
    "use strict";
    var i, s, r, o = n(33), l = n(1), a = n(13), u = n(15), c = n(34), h = n(12), f = n(20), d = n(61), v = n(62), m = n(66), p = n(38).set, g = n(68)(), y = l.TypeError, b = l.process, S = l.Promise, b = l.process, w = "process" == u(b), P = function() {}, _ = !!function() {
        try {
            var t = S.resolve(1), e = (t.constructor = {})[n(0)("species")] = function(t) {
                t(P, P);
            };
            return (w || "function" == typeof PromiseRejectionEvent) && t.then(P) instanceof e;
        } catch (t) {}
    }(), k = function(t, e) {
        return t === e || t === S && e === r;
    }, E = function(t) {
        var e;
        return !(!h(t) || "function" != typeof (e = t.then)) && e;
    }, x = function(t) {
        return k(S, t) ? new T(t) : new s(t);
    }, T = s = function(t) {
        var e, n;
        this.promise = new t(function(t, i) {
            if (void 0 !== e || void 0 !== n) throw y("Bad Promise constructor");
            e = t, n = i;
        }), this.resolve = f(e), this.reject = f(n);
    }, j = function(t) {
        try {
            t();
        } catch (t) {
            return {
                error: t
            };
        }
    }, M = function(t, e) {
        if (!t._n) {
            t._n = !0;
            var n = t._c;
            g(function() {
                for (var i = t._v, s = 1 == t._s, r = 0; n.length > r; ) !function(e) {
                    var n, r, o = s ? e.ok : e.fail, l = e.resolve, a = e.reject, u = e.domain;
                    try {
                        o ? (s || (2 == t._h && I(t), t._h = 1), !0 === o ? n = i : (u && u.enter(), n = o(i), 
                        u && u.exit()), n === e.promise ? a(y("Promise-chain cycle")) : (r = E(n)) ? r.call(n, l, a) : l(n)) : a(i);
                    } catch (t) {
                        a(t);
                    }
                }(n[r++]);
                t._c = [], t._n = !1, e && !t._h && O(t);
            });
        }
    }, O = function(t) {
        p.call(l, function() {
            var e, n, i, s = t._v;
            if (z(t) && (e = j(function() {
                w ? b.emit("unhandledRejection", s, t) : (n = l.onunhandledrejection) ? n({
                    promise: t,
                    reason: s
                }) : (i = l.console) && i.error && i.error("Unhandled promise rejection", s);
            }), t._h = w || z(t) ? 2 : 1), t._a = void 0, e) throw e.error;
        });
    }, z = function(t) {
        if (1 == t._h) return !1;
        for (var e, n = t._a || t._c, i = 0; n.length > i; ) if (e = n[i++], e.fail || !z(e.promise)) return !1;
        return !0;
    }, I = function(t) {
        p.call(l, function() {
            var e;
            w ? b.emit("rejectionHandled", t) : (e = l.onrejectionhandled) && e({
                promise: t,
                reason: t._v
            });
        });
    }, C = function(t) {
        var e = this;
        e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), 
        M(e, !0));
    }, R = function(t) {
        var e, n = this;
        if (!n._d) {
            n._d = !0, n = n._w || n;
            try {
                if (n === t) throw y("Promise can't be resolved itself");
                (e = E(t)) ? g(function() {
                    var i = {
                        _w: n,
                        _d: !1
                    };
                    try {
                        e.call(t, a(R, i, 1), a(C, i, 1));
                    } catch (t) {
                        C.call(i, t);
                    }
                }) : (n._v = t, n._s = 1, M(n, !1));
            } catch (t) {
                C.call({
                    _w: n,
                    _d: !1
                }, t);
            }
        }
    };
    _ || (S = function(t) {
        d(this, S, "Promise", "_h"), f(t), i.call(this);
        try {
            t(a(R, this, 1), a(C, this, 1));
        } catch (t) {
            C.call(this, t);
        }
    }, i = function(t) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
        this._n = !1;
    }, i.prototype = n(69)(S.prototype, {
        then: function(t, e) {
            var n = x(m(this, S));
            return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, 
            n.domain = w ? b.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && M(this, !1), 
            n.promise;
        },
        catch: function(t) {
            return this.then(void 0, t);
        }
    }), T = function() {
        var t = new i();
        this.promise = t, this.resolve = a(R, t, 1), this.reject = a(C, t, 1);
    }), c(c.G + c.W + c.F * !_, {
        Promise: S
    }), n(23)(S, "Promise"), n(70)("Promise"), r = n(8).Promise, c(c.S + c.F * !_, "Promise", {
        reject: function(t) {
            var e = x(this);
            return (0, e.reject)(t), e.promise;
        }
    }), c(c.S + c.F * (o || !_), "Promise", {
        resolve: function(t) {
            if (t instanceof S && k(t.constructor, this)) return t;
            var e = x(this);
            return (0, e.resolve)(t), e.promise;
        }
    }), c(c.S + c.F * !(_ && n(71)(function(t) {
        S.all(t).catch(P);
    })), "Promise", {
        all: function(t) {
            var e = this, n = x(e), i = n.resolve, s = n.reject, r = j(function() {
                var n = [], r = 0, o = 1;
                v(t, !1, function(t) {
                    var l = r++, a = !1;
                    n.push(void 0), o++, e.resolve(t).then(function(t) {
                        a || (a = !0, n[l] = t, --o || i(n));
                    }, s);
                }), --o || i(n);
            });
            return r && s(r.error), n.promise;
        },
        race: function(t) {
            var e = this, n = x(e), i = n.reject, s = j(function() {
                v(t, !1, function(t) {
                    e.resolve(t).then(n.resolve, i);
                });
            });
            return s && i(s.error), n.promise;
        }
    });
}, function(t, e) {
    t.exports = function(t, e, n, i) {
        if (!(t instanceof e) || void 0 !== i && i in t) throw TypeError(n + ": incorrect invocation!");
        return t;
    };
}, function(t, e, n) {
    var i = n(13), s = n(63), r = n(64), o = n(4), l = n(35), a = n(65), u = {}, c = {}, e = t.exports = function(t, e, n, h, f) {
        var d, v, m, p, g = f ? function() {
            return t;
        } : a(t), y = i(n, h, e ? 2 : 1), b = 0;
        if ("function" != typeof g) throw TypeError(t + " is not iterable!");
        if (r(g)) {
            for (d = l(t.length); d > b; b++) if ((p = e ? y(o(v = t[b])[0], v[1]) : y(t[b])) === u || p === c) return p;
        } else for (m = g.call(t); !(v = m.next()).done; ) if ((p = s(m, y, v.value, e)) === u || p === c) return p;
    };
    e.BREAK = u, e.RETURN = c;
}, function(t, e, n) {
    var i = n(4);
    t.exports = function(t, e, n, s) {
        try {
            return s ? e(i(n)[0], n[1]) : e(n);
        } catch (e) {
            var r = t.return;
            throw void 0 !== r && i(r.call(t)), e;
        }
    };
}, function(t, e, n) {
    var i = n(9), s = n(0)("iterator"), r = Array.prototype;
    t.exports = function(t) {
        return void 0 !== t && (i.Array === t || r[s] === t);
    };
}, function(t, e, n) {
    var i = n(15), s = n(0)("iterator"), r = n(9);
    t.exports = n(8).getIteratorMethod = function(t) {
        if (void 0 != t) return t[s] || t["@@iterator"] || r[i(t)];
    };
}, function(t, e, n) {
    var i = n(4), s = n(20), r = n(0)("species");
    t.exports = function(t, e) {
        var n, o = i(t).constructor;
        return void 0 === o || void 0 == (n = i(o)[r]) ? e : s(n);
    };
}, function(t, e) {
    t.exports = function(t, e, n) {
        var i = void 0 === n;
        switch (e.length) {
          case 0:
            return i ? t() : t.call(n);

          case 1:
            return i ? t(e[0]) : t.call(n, e[0]);

          case 2:
            return i ? t(e[0], e[1]) : t.call(n, e[0], e[1]);

          case 3:
            return i ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);

          case 4:
            return i ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);
        }
        return t.apply(n, e);
    };
}, function(t, e, n) {
    var i = n(1), s = n(38).set, r = i.MutationObserver || i.WebKitMutationObserver, o = i.process, l = i.Promise, a = "process" == n(10)(o);
    t.exports = function() {
        var t, e, n, u = function() {
            var i, s;
            for (a && (i = o.domain) && i.exit(); t; ) {
                s = t.fn, t = t.next;
                try {
                    s();
                } catch (i) {
                    throw t ? n() : e = void 0, i;
                }
            }
            e = void 0, i && i.enter();
        };
        if (a) n = function() {
            o.nextTick(u);
        }; else if (r) {
            var c = !0, h = document.createTextNode("");
            new r(u).observe(h, {
                characterData: !0
            }), n = function() {
                h.data = c = !c;
            };
        } else if (l && l.resolve) {
            var f = l.resolve();
            n = function() {
                f.then(u);
            };
        } else n = function() {
            s.call(i, u);
        };
        return function(i) {
            var s = {
                fn: i,
                next: void 0
            };
            e && (e.next = s), t || (t = s, n()), e = s;
        };
    };
}, function(t, e, n) {
    var i = n(5);
    t.exports = function(t, e, n) {
        for (var s in e) i(t, s, e[s], n);
        return t;
    };
}, function(t, e, n) {
    "use strict";
    var i = n(1), s = n(11), r = n(6), o = n(0)("species");
    t.exports = function(t) {
        var e = i[t];
        r && e && !e[o] && s.f(e, o, {
            configurable: !0,
            get: function() {
                return this;
            }
        });
    };
}, function(t, e, n) {
    var i = n(0)("iterator"), s = !1;
    try {
        var r = [ 7 ][i]();
        r.return = function() {
            s = !0;
        }, Array.from(r, function() {
            throw 2;
        });
    } catch (t) {}
    t.exports = function(t, e) {
        if (!e && !s) return !1;
        var n = !1;
        try {
            var r = [ 7 ], o = r[i]();
            o.next = function() {
                return {
                    done: n = !0
                };
            }, r[i] = function() {
                return o;
            }, t(r);
        } catch (t) {}
        return n;
    };
}, function(t, e, n) {
    function i(t) {
        return n(s(t));
    }
    function s(t) {
        var e = r[t];
        if (!(e + 1)) throw new Error("Cannot find module '" + t + "'.");
        return e;
    }
    var r = {
        "./zRS_core.js": 25,
        "./zRS_fade.js": 39,
        "./zRS_lazy.js": 28,
        "./zRS_public.js": 27,
        "./zRS_slide.js": 73,
        "./zRS_touch.js": 26,
        "./zRS_util.js": 2
    };
    i.keys = function() {
        return Object.keys(r);
    }, i.resolve = s, t.exports = i, i.id = 72;
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), o = n(2), l = i(o), a = n(14), u = i(a), c = function() {
        function t(e) {
            s(this, t), this.elements = e.elements, this.options = e.options, this.lazy = e.lazy, 
            this.visible = this.options.visibleSlides, this.setSlideWidth(), this.landingPoint = 0, 
            this.currentPos = 0, this.startPos = 0, this.remaining = 0, this.distance = 0, this.target = 0, 
            this.increment = 0, this.startSlide = 0, this.startTime = Date.now(), this.isTouch = "ontouchstart" in document.documentElement, 
            this.animationFrame = void 0 !== window.requestAnimationFrame, this.setStartPos(), 
            this.setUp(), this.styleSlides();
        }
        return r(t, [ {
            key: "setUp",
            value: function() {
                var t = this;
                this.elements.inner.style.overflow = "visible", this.elements.slider.style.overflow = "hidden", 
                this.setSlideWidth(), this.positionInner(!0), this.elements.slider.addEventListener("visibleSlides", function(e) {
                    t.visible = e.detail.visible, t.setSlideWidth(), t.setStartPos(), t.positionInner(!0), 
                    t.styleSlides();
                }), this.elements.slider.addEventListener("after", function(e) {
                    for (var n = [], i = 0; i < t.visible; i++) !function(i) {
                        var s = l.default.targetSlide(e.detail.current + i, t.elements.slides.length);
                        n.push(new u.default(function(e, n) {
                            t.lazy.loadImages(t.elements.slides[s], {
                                resolve: e,
                                reject: n
                            });
                        }));
                    }(i);
                    u.default.all(n).then(function() {
                        for (var n = 0, i = t.elements.slides.length; n < i; n++) t.elements.slides[n] === e.detail.currentSlide ? t.elements.slides[n].style.position = "relative" : t.elements.slides[n].style.position = "absolute";
                    });
                });
            }
        }, {
            key: "setSlideWidth",
            value: function() {
                this.slideWidth = 100 / this.visible + this.options.slideSpacing / Math.max(this.visible - 1, 1), 
                this.minTransform = -Math.abs((this.elements.slides.length - (this.options.infinite ? 0 : 1)) * this.slideWidth);
            }
        }, {
            key: "setStartPos",
            value: function() {
                this.currentPos = this.slideWidth * this.options.alignment * (this.visible - 1), 
                this.currentPos = this.fixInfinitePosition(this.currentPos);
            }
        }, {
            key: "styleSlides",
            value: function() {
                for (var t = 0, e = this.elements.slides.length; t < e; t++) {
                    var n = this.elements.slides[t];
                    n.style.position = 0 !== t ? "absolute" : "relative", n.style.top = 0, n.style.left = this.slideWidth * t + "%", 
                    n.style.zIndex = 1, n.style.width = 100 / this.visible - (this.visible > 1 ? this.options.slideSpacing : 0) + "%";
                }
                this.coordinateSlides();
            }
        }, {
            key: "calculatePosition",
            value: function(e) {
                if (this.currentPos = Math.round(1e3 * t.easeOut(Date.now() - this.startTime, this.startPos, this.distance, e)) / 1e3, 
                this.remaining = Math.round(1e3 * (this.startPos + this.distance - this.currentPos)) / 1e3, 
                this.currentPos = this.fixInfinitePosition(), Math.round(10 * this.remaining) / 10 == 0) return this.remaining = 0, 
                this.currentPos = Math.round(100 * this.currentPos) / 100, void this.positionInner(!0);
                this.positionInner();
            }
        }, {
            key: "fixInfinitePosition",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (t = null !== t ? t : this.currentPos, !0 === this.options.infinite) {
                    var e = Math.abs(Math.round(t / this.minTransform)) + 1;
                    do {
                        t <= this.minTransform && (t -= this.minTransform), t > 0 && (t += this.minTransform), 
                        e--;
                    } while (e >= 0);
                }
                return t;
            }
        }, {
            key: "coordinateSlides",
            value: function() {
                if (!0 === this.options.infinite) for (var t = 0; t < this.options.visibleSlides && !(t >= this.elements.slides.length); t++) Math.abs(this.currentPos) > (t + 1) * this.slideWidth ? this.elements.slides[t].style.left = Math.abs(this.minTransform - this.slideWidth * t) + "%" : this.elements.slides[t].style.left = t * this.slideWidth + "%";
            }
        }, {
            key: "positionInner",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.elements.inner.style.transform = !1 === t ? "translate3d(" + this.currentPos + "%, 0, 0)" : "translateX(" + this.currentPos + "%)", 
                this.elements.inner.style.msTransform = "translateX(" + this.currentPos + "%)";
            }
        }, {
            key: "animate",
            value: function(t, e, n) {
                var i = this;
                l.default.cancelAnimationFrame(this.animation), this.animation = l.default.animationFrame(function() {
                    return 0 === i.remaining ? (i.animation = null, void l.default.dispatchEvent({
                        name: "after",
                        event: l.default.createEvent("after", {
                            current: parseInt(t),
                            currentSlide: i.elements.slides[t],
                            prev: parseInt(e),
                            prevSlide: i.elements.slides[e]
                        }),
                        element: i.elements.slider
                    })) : 0 === n ? (i.currentPos = i.currentPos + i.distance, i.remaining = 0, i.positionInner(!0), 
                    i.coordinateSlides(), void i.animate(t, e, n)) : (i.calculatePosition(n), i.coordinateSlides(), 
                    void i.animate(t, e, n));
                });
            }
        }, {
            key: "slideByPosition",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return t = null === t ? this.currentPos : t, Math.abs(Math.round(t / this.slideWidth));
            }
        }, {
            key: "normaliseTarget",
            value: function(t) {
                var e = Math.round(t / this.elements.slides.length);
                do {
                    t >= this.elements.slides.length ? t -= this.elements.slides.length : t < 0 && (t += this.elements.slides.length), 
                    e--;
                } while (e > 0);
                return t;
            }
        }, {
            key: "calculateLandingPoint",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                if (this.distance = this.remaining, this.startPos = this.currentPos, this.distance -= this.slideWidth * this.options.alignment * (this.options.visibleSlides - 1), 
                !0 === this.options.infinite) {
                    if (this.landingPoint = this.fixInfinitePosition(this.startPos + this.distance), 
                    this.target = null === n ? this.normaliseTarget(this.slideByPosition(this.landingPoint)) : n, 
                    !1 === this.options.freeStyle || !0 === t) {
                        var i = -Math.abs(this.target * this.slideWidth);
                        this.remaining += i - this.landingPoint, 0 === this.target && -Math.abs(i - this.landingPoint + this.slideWidth) <= this.minTransform && (this.remaining += this.minTransform);
                    }
                } else if (this.landingPoint = this.startPos + this.distance, this.target = null === n ? this.normaliseTarget(this.slideByPosition(this.landingPoint)) : n, 
                this.landingPoint > 0 && !1 === e ? this.target = 0 : this.landingPoint < this.minTransform && !1 === e && (this.target = this.elements.slides.length - 1), 
                0 === this.target || this.target === this.elements.slides.length - 1 || !1 === this.options.freeStyle || !0 === t) {
                    var s = -Math.abs(this.target * this.slideWidth);
                    this.remaining += s - this.landingPoint;
                }
                this.distance = this.remaining;
            }
        }, {
            key: "handle",
            value: function(t, e, n, i) {
                i *= -1, this.remaining += this.slideWidth * i, this.calculateLandingPoint(!0, !0, t), 
                this.startTime = Date.now(), this.animate(t, e, n);
            }
        }, {
            key: "touchStart",
            value: function(t) {
                l.default.cancelAnimationFrame(this.animation), this.startPos = this.currentPos, 
                this.startSlide = this.normaliseTarget(this.slideByPosition());
            }
        }, {
            key: "touchMove",
            value: function(t, e, n) {
                var i = 1, s = this.currentPos;
                this.currentPos > (this.slideWidth * this.options.visibleSlides + this.slideWidth * this.options.alignment) / 2 && !1 === this.options.infinite && (i = Math.max(0, 1 - s / 95)), 
                this.currentPos < -(this.slideWidth * (this.elements.slides.length - 1) - this.slideWidth * this.options.alignment) && !1 === this.options.infinite && (i = Math.max(0, 1 + (s - (this.minTransform + (this.options.visibleSlides - 1) * this.slideWidth)) / 95)), 
                this.increment = (e - n) * i, this.currentPos -= this.increment, !0 === this.options.infinite && (this.currentPos < this.minTransform ? this.currentPos -= this.minTransform : this.currentPos >= 0 && (this.currentPos += this.minTransform)), 
                this.coordinateSlides(), this.positionInner();
            }
        }, {
            key: "touchEnd",
            value: function(t, e, n) {
                this.startSlide = this.startSlide === this.target ? this.startSlide : this.target, 
                this.remaining -= e, this.calculateLandingPoint(), this.startTime = Date.now(), 
                this.animate(this.target, this.startSlide, n), l.default.dispatchEvent({
                    name: "before",
                    event: l.default.createEvent("before", {
                        current: parseInt(this.startSlide),
                        currentSlide: this.elements.slides[this.startSlide],
                        target: parseInt(this.target),
                        targetSlide: this.elements.slides[this.target]
                    }),
                    element: this.elements.slider
                });
            }
        } ], [ {
            key: "easeOut",
            value: function(t, e, n, i) {
                var s = (t /= i) * t;
                return e + n * (s * t + -3 * s + 3 * t);
            }
        } ]), t;
    }();
    e.default = c;
} ]);
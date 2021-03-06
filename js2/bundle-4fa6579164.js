/**!
 * lightgallery.js | 1.2.0 | May 20th 2020
 * http://sachinchoolur.github.io/lightgallery.js/
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ?
            self : this).Lightgallery = t()
    }
}((function () {
    return function t(e, n, i) {
        function o(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (r) return r(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[s] = {
                    exports: {}
                };
                e[s][0].call(u.exports, (function (t) {
                    return o(e[s][1][t] || t)
                }), u, u.exports, t, e, n, i)
            }
            return n[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
        return o
    }({
        1: [function (t, e, n) {
            ! function (t, e) {
                if (void 0 !== n) e(n);
                else {
                    var i = {
                        exports: {}
                    };
                    e(i.exports), t.lgUtils = i.exports
                }
            }(this, (function (t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var e = {
                    getAttribute: function (t, e) {
                        return t[e]
                    },
                    setAttribute: function (t, e, n) {
                        t[e] = n
                    },
                    wrap: function (t, e) {
                        if (t) {
                            var n = document.createElement("div");
                            n.className = e, t.parentNode.insertBefore(n, t), t
                                .parentNode.removeChild(t), n.appendChild(t)
                        }
                    },
                    addClass: function (t, e) {
                        t && (t.classList ? t.classList.add(e) : t.className +=
                            " " + e)
                    },
                    removeClass: function (t, e) {
                        t && (t.classList ? t.classList.remove(e) : t.className =
                            t.className.replace(new RegExp("(^|\\b)" + e.split(
                                " ").join("|") + "(\\b|$)", "gi"), " "))
                    },
                    hasClass: function (t, e) {
                        return t.classList ? t.classList.contains(e) : new RegExp(
                            "(^| )" + e + "( |$)", "gi").test(t.className)
                    },
                    setVendor: function (t, e, n) {
                        t && (t.style[e.charAt(0).toLowerCase() + e.slice(1)] =
                            n, t.style["webkit" + e] = n, t.style["moz" + e] =
                            n, t.style["ms" + e] = n, t.style["o" + e] = n)
                    },
                    trigger: function (t, e) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ?
                            arguments[2] : null;
                        if (t) {
                            var i = new CustomEvent(e, {
                                detail: n
                            });
                            t.dispatchEvent(i)
                        }
                    },
                    Listener: {
                        uid: 0
                    },
                    on: function (t, n, i) {
                        var o = this;
                        t && n.split(" ").forEach((function (n) {
                            var r = o.getAttribute(t,
                                "lg-event-uid") || "";
                            e.Listener.uid++, r += "&" + e.Listener
                                .uid, o.setAttribute(t,
                                    "lg-event-uid", r), e.Listener[
                                    n + e.Listener.uid] = i, t.addEventListener(
                                    n.split(".")[0], i, !1)
                        }))
                    },
                    off: function (t, n) {
                        if (t) {
                            var i = this.getAttribute(t, "lg-event-uid");
                            if (i) {
                                i = i.split("&");
                                for (var o = 0; o < i.length; o++)
                                    if (i[o]) {
                                        var r = n + i[o];
                                        if ("." === r.substring(0, 1))
                                            for (var s in e.Listener) e.Listener
                                                .hasOwnProperty(s) && s.split(
                                                    ".").indexOf(r.split(".")[1]) >
                                                -1 && (t.removeEventListener(s.split(
                                                        ".")[0], e.Listener[
                                                        s]), this.setAttribute(
                                                        t, "lg-event-uid", this
                                                        .getAttribute(t,
                                                            "lg-event-uid").replace(
                                                            "&" + i[o], "")),
                                                    delete e.Listener[s]);
                                        else t.removeEventListener(r.split(".")[
                                            0], e.Listener[r]), this.setAttribute(
                                            t, "lg-event-uid", this.getAttribute(
                                                t, "lg-event-uid").replace(
                                                "&" + i[o], "")), delete e.Listener[
                                            r]
                                    }
                            }
                        }
                    },
                    param: function (t) {
                        return Object.keys(t).map((function (e) {
                            return encodeURIComponent(e) + "=" +
                                encodeURIComponent(t[e])
                        })).join("&")
                    }
                };
                t.default = e
            }))
        }, {}],
        2: [function (t, e, n) {
            ! function (e, i) {
                if (void 0 !== n) i(t("./lg-utils"));
                else {
                    i(e.lgUtils), e.lightgallery = {}
                }
            }(this, (function (t) {
                "use strict";
                var e, n = (e = t) && e.__esModule ? e : {
                    default: e
                };
                var i = Object.assign || function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) &&
                            (t[i] = n[i])
                    }
                    return t
                };
                ! function () {
                    if ("function" == typeof window.CustomEvent) return !1;

                    function t(t, e) {
                        e = e || {
                            bubbles: !1,
                            cancelable: !1,
                            detail: void 0
                        };
                        var n = document.createEvent("CustomEvent");
                        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail),
                            n
                    }
                    t.prototype = window.Event.prototype, window.CustomEvent = t
                }(), window.utils = n.default, window.lgData = {
                    uid: 0
                }, window.lgModules = {};
                var o = {
                    mode: "lg-slide",
                    cssEasing: "ease",
                    easing: "linear",
                    speed: 600,
                    height: "100%",
                    width: "100%",
                    addClass: "",
                    startClass: "lg-start-zoom",
                    backdropDuration: 150,
                    hideBarsDelay: 6e3,
                    useLeft: !1,
                    ariaLabelledby: "",
                    ariaDescribedby: "",
                    closable: !0,
                    loop: !0,
                    escKey: !0,
                    keyPress: !0,
                    controls: !0,
                    slideEndAnimatoin: !0,
                    hideControlOnEnd: !1,
                    mousewheel: !1,
                    getCaptionFromTitleOrAlt: !0,
                    appendSubHtmlTo: ".lg-sub-html",
                    subHtmlSelectorRelative: !1,
                    preload: 1,
                    showAfterLoad: !0,
                    selector: "",
                    selectWithin: "",
                    nextHtml: "",
                    prevHtml: "",
                    index: !1,
                    iframeMaxWidth: "100%",
                    download: !0,
                    counter: !0,
                    appendCounterTo: ".lg-toolbar",
                    swipeThreshold: 50,
                    enableSwipe: !0,
                    enableDrag: !0,
                    dynamic: !1,
                    dynamicEl: [],
                    galleryId: 1
                };

                function r(t, e) {
                    if (this.el = t, this.s = i({}, o, e), this.s.dynamic &&
                        "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor ===
                        Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                    return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1,
                        this.hideBartimeout = !1, this.isTouch = "ontouchstart" in
                        document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !
                            1), this.items = [], this.s.dynamic ? this.items = this.s.dynamicEl :
                        "this" === this.s.selector ? this.items.push(this.el) : "" !==
                        this.s.selector ? this.s.selectWithin ? this.items = document.querySelector(
                            this.s.selectWithin).querySelectorAll(this.s.selector) :
                        this.items = this.el.querySelectorAll(this.s.selector) : this.items =
                        this.el.children, this.___slide = "", this.outer = "", this.init(),
                        this
                }
                r.prototype.init = function () {
                    var t = this;
                    t.s.preload > t.items.length && (t.s.preload = t.items.length);
                    var e = window.location.hash;
                    if (e.indexOf("lg=" + this.s.galleryId) > 0 && (t.index =
                            parseInt(e.split("&slide=")[1], 10), n.default.addClass(
                                document.body, "lg-from-hash"), n.default.hasClass(
                                document.body, "lg-on") || (n.default.addClass(
                                document.body, "lg-on"), setTimeout((function () {
                                t.build(t.index)
                            })))), t.s.dynamic) n.default.trigger(this.el,
                        "onBeforeOpen"), t.index = t.s.index || 0, n.default.hasClass(
                        document.body, "lg-on") || (n.default.addClass(document
                        .body, "lg-on"), setTimeout((function () {
                        t.build(t.index)
                    })));
                    else
                        for (var i = 0; i < t.items.length; i++) ! function (e) {
                            n.default.on(t.items[e], "click.lgcustom", (
                                function (i) {
                                    i.preventDefault(), n.default.trigger(
                                            t.el, "onBeforeOpen"), t.index =
                                        t.s.index || e, n.default.hasClass(
                                            document.body, "lg-on") ||
                                        (t.build(t.index), n.default.addClass(
                                            document.body, "lg-on"))
                                }))
                        }(i)
                }, r.prototype.build = function (t) {
                    var e = this;
                    for (var i in e.structure(), window.lgModules) e.modules[i] =
                        new window.lgModules[i](e.el);
                    e.slide(t, !1, !1), e.s.keyPress && e.keyPress(), e.items.length >
                        1 && (e.arrow(), setTimeout((function () {
                            e.enableDrag(), e.enableSwipe()
                        }), 50), e.s.mousewheel && e.mousewheel()), e.counter(), e.closeGallery(),
                        n.default.trigger(e.el, "onAfterOpen"), n.default.on(e.outer,
                            "mousemove.lg click.lg touchstart.lg", (function () {
                                n.default.removeClass(e.outer, "lg-hide-items"),
                                    clearTimeout(e.hideBartimeout), e.hideBartimeout =
                                    setTimeout((function () {
                                        n.default.addClass(e.outer,
                                            "lg-hide-items")
                                    }), e.s.hideBarsDelay)
                            }))
                }, r.prototype.structure = function () {
                    var t, e = "",
                        i = "",
                        o = 0,
                        r = "",
                        s = this;
                    for (document.body.insertAdjacentHTML("beforeend",
                            '<div class="lg-backdrop"></div>'), n.default.setVendor(
                            document.querySelector(".lg-backdrop"),
                            "TransitionDuration", this.s.backdropDuration + "ms"),
                        o = 0; o < this.items.length; o++) e +=
                        '<div class="lg-item"></div>';
                    if (this.s.controls && this.items.length > 1 && (i =
                            '<div class="lg-actions"><button aria-label="Previous slide" class="lg-prev lg-icon">' +
                            this.s.prevHtml +
                            '</button><button aria-label="Next slide" class="lg-next lg-icon">' +
                            this.s.nextHtml + "</button></div>"), ".lg-sub-html" ===
                        this.s.appendSubHtmlTo && (r =
                            '<div role="status" aria-live="polite" class="lg-sub-html"></div>'
                        ), t = '<div tabindex="-1" aria-modal="true" ' + (this.s.ariaLabelledby ?
                            'aria-labelledby="' + this.s.ariaLabelledby + '"' : "") +
                        " " + (this.s.ariaDescribedby ? 'aria-describedby="' + this
                            .s.ariaDescribedby + '"' : "") +
                        ' role="dialog" class="lg-outer ' + this.s.addClass + " " +
                        this.s.startClass + '"><div class="lg" style="width:' +
                        this.s.width + "; height:" + this.s.height +
                        '"><div class="lg-inner">' + e +
                        '</div><div class="lg-toolbar group"><button aria-label="Close gallery" class="lg-close lg-icon"></button></div>' +
                        i + r + "</div></div>", document.body.insertAdjacentHTML(
                            "beforeend", t), this.outer = document.querySelector(
                            ".lg-outer"), this.outer.focus(), this.___slide = this.outer
                        .querySelectorAll(".lg-item"), this.s.useLeft ? (n.default.addClass(
                                this.outer, "lg-use-left"), this.s.mode =
                            "lg-slide") : n.default.addClass(this.outer,
                            "lg-use-css3"), s.setTop(), n.default.on(window,
                            "resize.lg orientationchange.lg", (function () {
                                setTimeout((function () {
                                    s.setTop()
                                }), 100)
                            })), n.default.addClass(this.___slide[this.index],
                            "lg-current"), this.doCss() ? n.default.addClass(this.outer,
                            "lg-css3") : (n.default.addClass(this.outer, "lg-css"),
                            this.s.speed = 0), n.default.addClass(this.outer, this.s
                            .mode), this.s.enableDrag && this.items.length > 1 && n
                        .default.addClass(this.outer, "lg-grab"), this.s.showAfterLoad &&
                        n.default.addClass(this.outer, "lg-show-after-load"), this.doCss()
                    ) {
                        var a = this.outer.querySelector(".lg-inner");
                        n.default.setVendor(a, "TransitionTimingFunction", this.s.cssEasing),
                            n.default.setVendor(a, "TransitionDuration", this.s.speed +
                                "ms")
                    }
                    setTimeout((function () {
                            n.default.addClass(document.querySelector(
                                ".lg-backdrop"), "in")
                        })), setTimeout((function () {
                            n.default.addClass(s.outer, "lg-visible")
                        }), this.s.backdropDuration), this.s.download && this.outer
                        .querySelector(".lg-toolbar").insertAdjacentHTML(
                            "beforeend",
                            '<a id="lg-download" aria-label="Download" target="_blank" download class="lg-download lg-icon"></a>'
                        ), this.prevScrollTop = document.documentElement.scrollTop ||
                        document.body.scrollTop
                }, r.prototype.setTop = function () {
                    if ("100%" !== this.s.height) {
                        var t = window.innerHeight,
                            e = (t - parseInt(this.s.height, 10)) / 2,
                            n = this.outer.querySelector(".lg");
                        t >= parseInt(this.s.height, 10) ? n.style.top = e + "px" :
                            n.style.top = "0px"
                    }
                }, r.prototype.doCss = function () {
                    return !! function () {
                        var t = ["transition", "MozTransition",
                                "WebkitTransition", "OTransition",
                                "msTransition", "KhtmlTransition"],
                            e = document.documentElement,
                            n = 0;
                        for (n = 0; n < t.length; n++)
                            if (t[n] in e.style) return !0
                    }()
                }, r.prototype.isVideo = function (t, e) {
                    var n;
                    if (n = this.s.dynamic ? this.s.dynamicEl[e].html : this.items[
                            e].getAttribute("data-html"), !t && n) return {
                        html5: !0
                    };
                    var i = t.match(
                            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
                        ),
                        o = t.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                        r = t.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                        s = t.match(
                            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
                        );
                    return i ? {
                        youtube: i
                    } : o ? {
                        vimeo: o
                    } : r ? {
                        dailymotion: r
                    } : s ? {
                        vk: s
                    } : void 0
                }, r.prototype.counter = function () {
                    this.s.counter && this.outer.querySelector(this.s.appendCounterTo)
                        .insertAdjacentHTML("beforeend",
                            '<div id="lg-counter" role="status" aria-live="polite"><span id="lg-counter-current">' +
                            (parseInt(this.index, 10) + 1) +
                            '</span> / <span id="lg-counter-all">' + this.items.length +
                            "</span></div>")
                }, r.prototype.addHtml = function (t) {
                    var e, i = null;
                    if (this.s.dynamic ? i = this.s.dynamicEl[t].subHtml : (i = (e =
                                this.items[t]).getAttribute("data-sub-html"), this.s
                            .getCaptionFromTitleOrAlt && !i && (i = e.getAttribute(
                                "title")) && e.querySelector("img") && (i = e.querySelector(
                                "img").getAttribute("alt"))), null != i) {
                        var o = i.substring(0, 1);
                        "." !== o && "#" !== o || (i = this.s.subHtmlSelectorRelative &&
                            !this.s.dynamic ? e.querySelector(i).innerHTML :
                            document.querySelector(i).innerHTML)
                    } else i = "";
                    ".lg-sub-html" === this.s.appendSubHtmlTo ? this.outer.querySelector(
                            this.s.appendSubHtmlTo).innerHTML = i : this.___slide[t]
                        .insertAdjacentHTML("beforeend", i), null != i && ("" ===
                            i ? n.default.addClass(this.outer.querySelector(this.s.appendSubHtmlTo),
                                "lg-empty-html") : n.default.removeClass(this.outer
                                .querySelector(this.s.appendSubHtmlTo),
                                "lg-empty-html")), n.default.trigger(this.el,
                            "onAfterAppendSubHtml", {
                                index: t
                            })
                }, r.prototype.preload = function (t) {
                    var e = 1,
                        n = 1;
                    for (e = 1; e <= this.s.preload && !(e >= this.items.length - t); e++)
                        this.loadContent(t + e, !1, 0);
                    for (n = 1; n <= this.s.preload && !(t - n < 0); n++) this.loadContent(
                        t - n, !1, 0)
                }, r.prototype.loadContent = function (t, e, i) {
                    var o, r, s, a, l, c, u, d = this,
                        f = !1,
                        h = function (t) {
                            for (var e = [], n = [], i = 0; i < t.length; i++) {
                                var o = t[i].split(" ");
                                "" === o[0] && o.splice(0, 1), n.push(o[0]), e.push(
                                    o[1])
                            }
                            for (var s = window.innerWidth, a = 0; a < e.length; a++)
                                if (parseInt(e[a], 10) > s) {
                                    r = n[a];
                                    break
                                }
                        };
                    if (d.s.dynamic) {
                        if (d.s.dynamicEl[t].poster && (f = !0, s = d.s.dynamicEl[t]
                                .poster), c = d.s.dynamicEl[t].html, r = d.s.dynamicEl[
                                t].src, u = d.s.dynamicEl[t].alt, d.s.dynamicEl[t].responsive)
                            h(d.s.dynamicEl[t].responsive.split(","));
                        a = d.s.dynamicEl[t].srcset, l = d.s.dynamicEl[t].sizes
                    } else {
                        if (d.items[t].getAttribute("data-poster") && (f = !0, s =
                                d.items[t].getAttribute("data-poster")), c = d.items[
                                t].getAttribute("data-html"), r = d.items[t].getAttribute(
                                "href") || d.items[t].getAttribute("data-src"), u =
                            d.items[t].getAttribute("title"), d.items[t].querySelector(
                                "img") && (u = u || d.items[t].querySelector("img")
                                .getAttribute("alt")), d.items[t].getAttribute(
                                "data-responsive")) h(d.items[t].getAttribute(
                            "data-responsive").split(","));
                        a = d.items[t].getAttribute("data-srcset"), l = d.items[t].getAttribute(
                            "data-sizes")
                    }
                    var p = !1;
                    d.s.dynamic ? d.s.dynamicEl[t].iframe && (p = !0) : "true" ===
                        d.items[t].getAttribute("data-iframe") && (p = !0);
                    var m = d.isVideo(r, t);
                    if (!n.default.hasClass(d.___slide[t], "lg-loaded")) {
                        if (p) d.___slide[t].insertAdjacentHTML("afterbegin",
                            '<div class="lg-video-cont" style="max-width:' + d.s
                            .iframeMaxWidth +
                            '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                            r +
                            '"  allowfullscreen="true"></iframe></div></div>');
                        else if (f) {
                            var g = "";
                            g = m && m.youtube ? "lg-has-youtube" : m && m.vimeo ?
                                "lg-has-vimeo" : "lg-has-html5", d.___slide[t].insertAdjacentHTML(
                                    "beforeend", '<div class="lg-video-cont ' + g +
                                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                                    s + '" /></div></div>')
                        } else m ? (d.___slide[t].insertAdjacentHTML("beforeend",
                            '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                        ), n.default.trigger(d.el, "hasVideo", {
                            index: t,
                            src: r,
                            html: c
                        })) : (u = u ? 'alt="' + u + '"' : "", d.___slide[t].insertAdjacentHTML(
                            "beforeend",
                            '<div class="lg-img-wrap"><img class="lg-object lg-image" ' +
                            u + ' src="' + r + '" /></div>'));
                        if (n.default.trigger(d.el, "onAferAppendSlide", {
                                index: t
                            }), o = d.___slide[t].querySelector(".lg-object"), l &&
                            o.setAttribute("sizes", l), a) {
                            o.setAttribute("srcset", a);
                            try {
                                picturefill({
                                    elements: [o[0]]
                                })
                            } catch (t) {
                                console.error(
                                    "Make sure you have included Picturefill version 2"
                                )
                            }
                        }
                        ".lg-sub-html" !== this.s.appendSubHtmlTo && d.addHtml(t),
                            n.default.addClass(d.___slide[t], "lg-loaded")
                    }
                    n.default.on(d.___slide[t].querySelector(".lg-object"),
                        "load.lg error.lg", (function () {
                            var e = 0;
                            i && !n.default.hasClass(document.body,
                                "lg-from-hash") && (e = i), setTimeout(
                                (function () {
                                    n.default.addClass(d.___slide[t],
                                            "lg-complete"), n.default
                                        .trigger(d.el,
                                            "onSlideItemLoad", {
                                                index: t,
                                                delay: i || 0
                                            })
                                }), e)
                        })), m && m.html5 && !f && n.default.addClass(d.___slide[
                        t], "lg-complete"), !0 === e && (n.default.hasClass(d.___slide[
                        t], "lg-complete") ? d.preload(t) : n.default.on(d.___slide[
                            t].querySelector(".lg-object"),
                        "load.lg error.lg", (function () {
                            d.preload(t)
                        })))
                }, r.prototype.slide = function (t, e, i) {
                    for (var o = 0, r = 0; r < this.___slide.length; r++)
                        if (n.default.hasClass(this.___slide[r], "lg-current")) {
                            o = r;
                            break
                        } var s = this;
                    if (!s.lGalleryOn || o !== t) {
                        var a = this.___slide.length,
                            l = s.lGalleryOn ? this.s.speed : 0,
                            c = !1,
                            u = !1;
                        if (!s.lgBusy) {
                            var d;
                            if (this.s.download)(d = s.s.dynamic ? !1 !== s.s.dynamicEl[
                                    t].downloadUrl && (s.s.dynamicEl[t].downloadUrl ||
                                    s.s.dynamicEl[t].src) : "false" !== s.items[
                                    t].getAttribute("data-download-url") && (s.items[
                                        t].getAttribute("data-download-url") ||
                                    s.items[t].getAttribute("href") || s.items[
                                        t].getAttribute("data-src"))) ? (document.getElementById(
                                        "lg-download").setAttribute("href", d), n.default
                                    .removeClass(s.outer, "lg-hide-download")) : n.default
                                .addClass(s.outer, "lg-hide-download");
                            if (n.default.trigger(s.el, "onBeforeSlide", {
                                    prevIndex: o,
                                    index: t,
                                    fromTouch: e,
                                    fromThumb: i
                                }), s.lgBusy = !0, clearTimeout(s.hideBartimeout),
                                ".lg-sub-html" === this.s.appendSubHtmlTo &&
                                setTimeout((function () {
                                    s.addHtml(t)
                                }), l), this.arrowDisable(t), e) {
                                var f = t - 1,
                                    h = t + 1;
                                (0 === t && o === a - 1 || t === a - 1 && 0 === o) &&
                                (h = 0, f = a - 1), n.default.removeClass(s.outer.querySelector(
                                        ".lg-prev-slide"), "lg-prev-slide"), n.default
                                    .removeClass(s.outer.querySelector(
                                        ".lg-current"), "lg-current"), n.default.removeClass(
                                        s.outer.querySelector(".lg-next-slide"),
                                        "lg-next-slide"), n.default.addClass(s.___slide[
                                        f], "lg-prev-slide"), n.default.addClass(s.___slide[
                                        h], "lg-next-slide"), n.default.addClass(s.___slide[
                                        t], "lg-current")
                            } else {
                                n.default.addClass(s.outer, "lg-no-trans");
                                for (var p = 0; p < this.___slide.length; p++) n.default
                                    .removeClass(this.___slide[p], "lg-prev-slide"),
                                    n.default.removeClass(this.___slide[p],
                                        "lg-next-slide");
                                t < o ? (u = !0, 0 !== t || o !== a - 1 || i || (u = !
                                    1, c = !0)) : t > o && (c = !0, t !== a - 1 ||
                                    0 !== o || i || (u = !0, c = !1)), u ? (n.default
                                    .addClass(this.___slide[t], "lg-prev-slide"),
                                    n.default.addClass(this.___slide[o],
                                        "lg-next-slide")) : c && (n.default.addClass(
                                        this.___slide[t], "lg-next-slide"), n.default
                                    .addClass(this.___slide[o], "lg-prev-slide")
                                ), setTimeout((function () {
                                    n.default.removeClass(s.outer.querySelector(
                                            ".lg-current"),
                                        "lg-current"), n.default.addClass(
                                        s.___slide[t], "lg-current"
                                    ), n.default.removeClass(s.outer,
                                        "lg-no-trans")
                                }), 50)
                            }
                            s.lGalleryOn ? (setTimeout((function () {
                                    s.loadContent(t, !0, 0)
                                }), this.s.speed + 50), setTimeout((function () {
                                    s.lgBusy = !1, n.default.trigger(s.el,
                                        "onAfterSlide", {
                                            prevIndex: o,
                                            index: t,
                                            fromTouch: e,
                                            fromThumb: i
                                        })
                                }), this.s.speed)) : (s.loadContent(t, !0, s.s.backdropDuration),
                                    s.lgBusy = !1, n.default.trigger(s.el,
                                        "onAfterSlide", {
                                            prevIndex: o,
                                            index: t,
                                            fromTouch: e,
                                            fromThumb: i
                                        })), s.lGalleryOn = !0, this.s.counter &&
                                document.getElementById("lg-counter-current") && (
                                    document.getElementById("lg-counter-current").innerHTML =
                                    t + 1)
                        }
                    }
                }, r.prototype.goToNextSlide = function (t) {
                    var e = this;
                    e.lgBusy || (e.index + 1 < e.___slide.length ? (e.index++, n.default
                            .trigger(e.el, "onBeforeNextSlide", {
                                index: e.index
                            }), e.slide(e.index, t, !1)) : e.s.loop ? (e.index =
                            0, n.default.trigger(e.el, "onBeforeNextSlide", {
                                index: e.index
                            }), e.slide(e.index, t, !1)) : e.s.slideEndAnimatoin &&
                        (n.default.addClass(e.outer, "lg-right-end"),
                            setTimeout((function () {
                                n.default.removeClass(e.outer,
                                    "lg-right-end")
                            }), 400)))
                }, r.prototype.goToPrevSlide = function (t) {
                    var e = this;
                    e.lgBusy || (e.index > 0 ? (e.index--, n.default.trigger(e.el,
                            "onBeforePrevSlide", {
                                index: e.index,
                                fromTouch: t
                            }), e.slide(e.index, t, !1)) : e.s.loop ? (e.index =
                            e.items.length - 1, n.default.trigger(e.el,
                                "onBeforePrevSlide", {
                                    index: e.index,
                                    fromTouch: t
                                }), e.slide(e.index, t, !1)) : e.s.slideEndAnimatoin &&
                        (n.default.addClass(e.outer, "lg-left-end"), setTimeout(
                            (function () {
                                n.default.removeClass(e.outer,
                                    "lg-left-end")
                            }), 400)))
                }, r.prototype.keyPress = function () {
                    var t = this;
                    this.items.length > 1 && n.default.on(window, "keyup.lg", (
                        function (e) {
                            t.items.length > 1 && (37 === e.keyCode && (e.preventDefault(),
                                    t.goToPrevSlide()), 39 === e.keyCode &&
                                (e.preventDefault(), t.goToNextSlide())
                            )
                        })), n.default.on(window, "keydown.lg", (function (e) {
                        !0 === t.s.escKey && 27 === e.keyCode && (e.preventDefault(),
                            n.default.hasClass(t.outer,
                                "lg-thumb-open") ? n.default.removeClass(
                                t.outer, "lg-thumb-open") : t.destroy()
                        )
                    }))
                }, r.prototype.arrow = function () {
                    var t = this;
                    n.default.on(this.outer.querySelector(".lg-prev"), "click.lg",
                        (function () {
                            t.goToPrevSlide()
                        })), n.default.on(this.outer.querySelector(".lg-next"),
                        "click.lg", (function () {
                            t.goToNextSlide()
                        }))
                }, r.prototype.arrowDisable = function (t) {
                    if (!this.s.loop && this.s.hideControlOnEnd) {
                        var e = this.outer.querySelector(".lg-next"),
                            i = this.outer.querySelector(".lg-prev");
                        t + 1 < this.___slide.length ? (e.removeAttribute(
                                "disabled"), n.default.removeClass(e,
                                "disabled")) : (e.setAttribute("disabled",
                                "disabled"), n.default.addClass(e, "disabled")), t >
                            0 ? (i.removeAttribute("disabled"), n.default.removeClass(
                                i, "disabled")) : (i.setAttribute("disabled",
                                "disabled"), n.default.addClass(i, "disabled"))
                    }
                }, r.prototype.setTranslate = function (t, e, i) {
                    this.s.useLeft ? t.style.left = e : n.default.setVendor(t,
                        "Transform", "translate3d(" + e + "px, " + i +
                        "px, 0px)")
                }, r.prototype.touchMove = function (t, e) {
                    var i = e - t;
                    Math.abs(i) > 15 && (n.default.addClass(this.outer,
                        "lg-dragging"), this.setTranslate(this.___slide[
                        this.index], i, 0), this.setTranslate(document.querySelector(
                            ".lg-prev-slide"), -this.___slide[this.index].clientWidth +
                        i, 0), this.setTranslate(document.querySelector(
                            ".lg-next-slide"), this.___slide[this.index].clientWidth +
                        i, 0))
                }, r.prototype.touchEnd = function (t) {
                    var e = this;
                    "lg-slide" !== e.s.mode && n.default.addClass(e.outer,
                        "lg-slide");
                    for (var i = 0; i < this.___slide.length; i++) n.default.hasClass(
                        this.___slide[i], "lg-current") || n.default.hasClass(
                        this.___slide[i], "lg-prev-slide") || n.default.hasClass(
                        this.___slide[i], "lg-next-slide") || (this.___slide[i]
                        .style.opacity = "0");
                    setTimeout((function () {
                        n.default.removeClass(e.outer, "lg-dragging"),
                            t < 0 && Math.abs(t) > e.s.swipeThreshold ?
                            e.goToNextSlide(!0) : t > 0 && Math.abs(t) >
                            e.s.swipeThreshold ? e.goToPrevSlide(!0) :
                            Math.abs(t) < 5 && n.default.trigger(e.el,
                                "onSlideClick");
                        for (var i = 0; i < e.___slide.length; i++) e.___slide[
                            i].removeAttribute("style")
                    })), setTimeout((function () {
                        n.default.hasClass(e.outer, "lg-dragging") ||
                            "lg-slide" === e.s.mode || n.default.removeClass(
                                e.outer, "lg-slide")
                    }), e.s.speed + 100)
                }, r.prototype.enableSwipe = function () {
                    var t = this,
                        e = 0,
                        i = 0,
                        o = !1;
                    if (t.s.enableSwipe && t.isTouch && t.doCss()) {
                        for (var r = 0; r < t.___slide.length; r++) n.default.on(t.___slide[
                            r], "touchstart.lg", (function (i) {
                            n.default.hasClass(t.outer, "lg-zoomed") ||
                                t.lgBusy || (i.preventDefault(), t.manageSwipeClass(),
                                    e = i.targetTouches[0].pageX)
                        }));
                        for (var s = 0; s < t.___slide.length; s++) n.default.on(t.___slide[
                            s], "touchmove.lg", (function (r) {
                            n.default.hasClass(t.outer, "lg-zoomed") ||
                                (r.preventDefault(), i = r.targetTouches[
                                        0].pageX, t.touchMove(e, i), o = !
                                    0)
                        }));
                        for (var a = 0; a < t.___slide.length; a++) n.default.on(t.___slide[
                            a], "touchend.lg", (function () {
                            n.default.hasClass(t.outer, "lg-zoomed") ||
                                (o ? (o = !1, t.touchEnd(i - e)) : n.default
                                    .trigger(t.el, "onSlideClick"))
                        }))
                    }
                }, r.prototype.enableDrag = function () {
                    var t = this,
                        e = 0,
                        i = 0,
                        o = !1,
                        r = !1;
                    if (t.s.enableDrag && !t.isTouch && t.doCss()) {
                        for (var s = 0; s < t.___slide.length; s++) n.default.on(t.___slide[
                            s], "mousedown.lg", (function (i) {
                            n.default.hasClass(t.outer, "lg-zoomed") ||
                                (n.default.hasClass(i.target,
                                    "lg-object") || n.default.hasClass(
                                    i.target, "lg-video-play")) && (i.preventDefault(),
                                    t.lgBusy || (t.manageSwipeClass(),
                                        e = i.pageX, o = !0, t.outer.scrollLeft +=
                                        1, t.outer.scrollLeft -= 1, n.default
                                        .removeClass(t.outer, "lg-grab"),
                                        n.default.addClass(t.outer,
                                            "lg-grabbing"), n.default.trigger(
                                            t.el, "onDragstart")))
                        }));
                        n.default.on(window, "mousemove.lg", (function (s) {
                            o && (r = !0, i = s.pageX, t.touchMove(e, i),
                                n.default.trigger(t.el,
                                    "onDragmove"))
                        })), n.default.on(window, "mouseup.lg", (function (s) {
                            r ? (r = !1, t.touchEnd(i - e), n.default.trigger(
                                t.el, "onDragend")) : (n.default.hasClass(
                                    s.target, "lg-object") || n.default
                                .hasClass(s.target, "lg-video-play")
                            ) && n.default.trigger(t.el,
                                "onSlideClick"), o && (o = !1, n.default
                                .removeClass(t.outer, "lg-grabbing"),
                                n.default.addClass(t.outer,
                                    "lg-grab"))
                        }))
                    }
                }, r.prototype.manageSwipeClass = function () {
                    var t = this.index + 1,
                        e = this.index - 1,
                        i = this.___slide.length;
                    this.s.loop && (0 === this.index ? e = i - 1 : this.index ===
                        i - 1 && (t = 0));
                    for (var o = 0; o < this.___slide.length; o++) n.default.removeClass(
                        this.___slide[o], "lg-next-slide"), n.default.removeClass(
                        this.___slide[o], "lg-prev-slide");
                    e > -1 && n.default.addClass(this.___slide[e], "lg-prev-slide"),
                        n.default.addClass(this.___slide[t], "lg-next-slide")
                }, r.prototype.mousewheel = function () {
                    var t = this;
                    n.default.on(t.outer, "mousewheel.lg", (function (e) {
                        e.deltaY && (e.deltaY > 0 ? t.goToPrevSlide() :
                            t.goToNextSlide(), e.preventDefault())
                    }))
                }, r.prototype.closeGallery = function () {
                    var t = this,
                        e = !1;
                    n.default.on(this.outer.querySelector(".lg-close"), "click.lg",
                        (function () {
                            t.destroy()
                        })), t.s.closable && (n.default.on(t.outer,
                        "mousedown.lg", (function (t) {
                            e = !!(n.default.hasClass(t.target,
                                    "lg-outer") || n.default.hasClass(
                                    t.target, "lg-item") || n.default
                                .hasClass(t.target, "lg-img-wrap"))
                        })), n.default.on(t.outer, "mouseup.lg", (function (
                        i) {
                        (n.default.hasClass(i.target, "lg-outer") ||
                            n.default.hasClass(i.target, "lg-item") ||
                            n.default.hasClass(i.target,
                                "lg-img-wrap") && e) && (n.default.hasClass(
                            t.outer, "lg-dragging") || t.destroy())
                    })))
                }, r.prototype.destroy = function (t) {
                    var e = this;
                    if (t || n.default.trigger(e.el, "onBeforeClose"), document.body
                        .scrollTop = e.prevScrollTop, document.documentElement.scrollTop =
                        e.prevScrollTop, t) {
                        if (!e.s.dynamic)
                            for (var i = 0; i < this.items.length; i++) n.default.off(
                                this.items[i], ".lg"), n.default.off(this.items[
                                i], ".lgcustom");
                        var o = e.el.getAttribute("lg-uid");
                        delete window.lgData[o], e.el.removeAttribute("lg-uid")
                    }
                    for (var r in n.default.off(this.el, ".lgtm"), window.lgModules)
                        e.modules[r] && e.modules[r].destroy(t);
                    this.lGalleryOn = !1, clearTimeout(e.hideBartimeout), this.hideBartimeout = !
                        1, n.default.off(window, ".lg"), n.default.removeClass(
                            document.body, "lg-on"), n.default.removeClass(document
                            .body, "lg-from-hash"), e.outer && n.default.removeClass(
                            e.outer, "lg-visible"), n.default.removeClass(document.querySelector(
                            ".lg-backdrop"), "in"), setTimeout((function () {
                            try {
                                e.outer && e.outer.parentNode.removeChild(e
                                        .outer), document.querySelector(
                                        ".lg-backdrop") && document.querySelector(
                                        ".lg-backdrop").parentNode.removeChild(
                                        document.querySelector(
                                            ".lg-backdrop")), t || n.default
                                    .trigger(e.el, "onCloseAfter"), e.el.focus()
                            } catch (t) {}
                        }), e.s.backdropDuration + 50)
                }, window.lightGallery = function (t, e) {
                    if (t) try {
                        if (t.getAttribute("lg-uid")) try {
                            window.lgData[t.getAttribute("lg-uid")].init()
                        } catch (t) {
                            console.error(
                                "lightGallery has not initiated properly"
                            )
                        } else {
                            var n = "lg" + window.lgData.uid++;
                            window.lgData[n] = new r(t, e), t.setAttribute(
                                "lg-uid", n)
                        }
                    } catch (t) {
                        console.error("lightGallery has not initiated properly")
                    }
                }
            }))
        }, {
            "./lg-utils": 1
        }]
    }, {}, [2])(2)
})),
/**!
 * lg-zoom.js | 1.2.0 | May 20th 2020
 * http://sachinchoolur.github.io/lg-zoom.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ?
            self : this).LgZoom = t()
    }
}((function () {
    return function t(e, n, i) {
        function o(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (r) return r(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[s] = {
                    exports: {}
                };
                e[s][0].call(u.exports, (function (t) {
                    return o(e[s][1][t] || t)
                }), u, u.exports, t, e, n, i)
            }
            return n[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
        return o
    }({
        1: [function (t, e, n) {
            ! function (t, e) {
                if (void 0 !== n) e();
                else {
                    e(), t.lgZoom = {}
                }
            }(this, (function () {
                "use strict";
                var t, e, n = Object.assign || function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = arguments[e];
                            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) &&
                                (t[i] = n[i])
                        }
                        return t
                    },
                    i = {
                        scale: 1,
                        zoom: !0,
                        actualSize: !0,
                        enableZoomAfter: 300,
                        useLeftForZoom: (t = !1, e = navigator.userAgent.match(
                                /Chrom(e|ium)\/([0-9]+)\./), e && parseInt(e[2], 10) <
                            54 && (t = !0), t)
                    },
                    o = function (t) {
                        return this.el = t, this.core = window.lgData[this.el.getAttribute(
                                "lg-uid")], this.core.s = n({}, i, this.core.s), this.core
                            .s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !
                                1, this.pageX = window.innerWidth / 2, this.pageY =
                                window.innerHeight / 2 + (document.documentElement.scrollTop ||
                                    document.body.scrollTop)), this
                    };
                o.prototype.init = function () {
                    var t = this,
                        e =
                        '<button aria-label="Zoom in" id="lg-zoom-in" class="lg-icon"></button><button aria-label="Zoom out" id="lg-zoom-out" class="lg-icon"></button>';
                    t.core.s.actualSize && (e +=
                            '<button aria-label="Actual size" id="lg-actual-size" class="lg-icon"></button>'
                        ), t.core.s.useLeftForZoom ? utils.addClass(t.core.outer,
                            "lg-use-left-for-zoom") : utils.addClass(t.core.outer,
                            "lg-use-transition-for-zoom"), this.core.outer.querySelector(
                            ".lg-toolbar").insertAdjacentHTML("beforeend", e),
                        utils.on(t.core.el, "onSlideItemLoad.lgtmzoom", (function (
                            e) {
                            var n = t.core.s.enableZoomAfter + e.detail.delay;
                            utils.hasClass(document.body, "lg-from-hash") &&
                                e.detail.delay ? n = 0 : utils.removeClass(
                                    document.body, "lg-from-hash"), t.zoomabletimeout =
                                setTimeout((function () {
                                    utils.addClass(t.core.___slide[
                                            e.detail.index],
                                        "lg-zoomable")
                                }), n + 30)
                        }));
                    var n = 1,
                        i = function (e) {
                            var n = t.core.outer.querySelector(
                                    ".lg-current .lg-image"),
                                i = (window.innerWidth - n.clientWidth) / 2,
                                o = (window.innerHeight - n.clientHeight) / 2 + (
                                    document.documentElement.scrollTop || document.body
                                    .scrollTop),
                                r = (e - 1) * (t.pageX - i),
                                s = (e - 1) * (t.pageY - o);
                            utils.setVendor(n, "Transform", "scale3d(" + e + ", " +
                                    e + ", 1)"), n.setAttribute("data-scale", e), t
                                .core.s.useLeftForZoom ? (n.parentElement.style.left = -
                                    r + "px", n.parentElement.style.top = -s + "px"
                                ) : utils.setVendor(n.parentElement, "Transform",
                                    "translate3d(-" + r + "px, -" + s + "px, 0)"),
                                n.parentElement.setAttribute("data-x", r), n.parentElement
                                .setAttribute("data-y", s)
                        },
                        o = function () {
                            n > 1 ? utils.addClass(t.core.outer, "lg-zoomed") : t.resetZoom(),
                                n < 1 && (n = 1), i(n)
                        },
                        r = function (e, i, r, s) {
                            var a, l = i.clientWidth;
                            a = t.core.s.dynamic ? t.core.s.dynamicEl[r].width || i
                                .naturalWidth || l : t.core.items[r].getAttribute(
                                    "data-width") || i.naturalWidth || l, utils.hasClass(
                                    t.core.outer, "lg-zoomed") ? n = 1 : a > l && (
                                    n = a / l || 2), s ? (t.pageX = window.innerWidth /
                                    2, t.pageY = window.innerHeight / 2 + (document
                                        .documentElement.scrollTop || document.body
                                        .scrollTop)) : (t.pageX = e.pageX || e.targetTouches[
                                    0].pageX, t.pageY = e.pageY || e.targetTouches[
                                    0].pageY), o(), setTimeout((function () {
                                    utils.removeClass(t.core.outer,
                                        "lg-grabbing"), utils.addClass(
                                        t.core.outer, "lg-grab")
                                }), 10)
                        },
                        s = !1;
                    utils.on(t.core.el, "onAferAppendSlide.lgtmzoom", (function (e) {
                            var n = e.detail.index,
                                i = t.core.___slide[n].querySelector(
                                    ".lg-image");
                            t.core.isTouch || utils.on(i, "dblclick", (
                                function (t) {
                                    r(t, i, n)
                                })), t.core.isTouch && utils.on(i,
                                "touchstart", (function (t) {
                                    s ? (clearTimeout(s), s = null,
                                            r(t, i, n)) : s =
                                        setTimeout((function () {
                                            s = null
                                        }), 300), t.preventDefault()
                                }))
                        })), utils.on(window,
                            "resize.lgzoom scroll.lgzoom orientationchange.lgzoom",
                            (function () {
                                t.pageX = window.innerWidth / 2, t.pageY =
                                    window.innerHeight / 2 + (document.documentElement
                                        .scrollTop || document.body.scrollTop),
                                    i(n)
                            })), utils.on(document.getElementById("lg-zoom-out"),
                            "click.lg", (function () {
                                t.core.outer.querySelector(
                                    ".lg-current .lg-image") && (n -= t.core
                                    .s.scale, o())
                            })), utils.on(document.getElementById("lg-zoom-in"),
                            "click.lg", (function () {
                                t.core.outer.querySelector(
                                    ".lg-current .lg-image") && (n += t.core
                                    .s.scale, o())
                            })), utils.on(document.getElementById("lg-actual-size"),
                            "click.lg", (function (e) {
                                r(e, t.core.___slide[t.core.index].querySelector(
                                    ".lg-image"), t.core.index, !0)
                            })), utils.on(t.core.el, "onBeforeSlide.lgtm", (
                            function () {
                                n = 1, t.resetZoom()
                            })), t.core.isTouch || t.zoomDrag(), t.core.isTouch &&
                        t.zoomSwipe()
                }, o.prototype.resetZoom = function () {
                    utils.removeClass(this.core.outer, "lg-zoomed");
                    for (var t = 0; t < this.core.___slide.length; t++) this.core.___slide[
                        t].querySelector(".lg-img-wrap") && (this.core.___slide[
                            t].querySelector(".lg-img-wrap").removeAttribute(
                            "style"), this.core.___slide[t].querySelector(
                            ".lg-img-wrap").removeAttribute("data-x"), this.core
                        .___slide[t].querySelector(".lg-img-wrap").removeAttribute(
                            "data-y"));
                    for (var e = 0; e < this.core.___slide.length; e++) this.core.___slide[
                        e].querySelector(".lg-image") && (this.core.___slide[e]
                        .querySelector(".lg-image").removeAttribute("style"),
                        this.core.___slide[e].querySelector(".lg-image").removeAttribute(
                            "data-scale"));
                    this.pageX = window.innerWidth / 2, this.pageY = window.innerHeight /
                        2 + (document.documentElement.scrollTop || document.body.scrollTop)
                }, o.prototype.zoomSwipe = function () {
                    for (var t = this, e = {}, n = {}, i = !1, o = !1, r = !1, s =
                            0; s < t.core.___slide.length; s++) utils.on(t.core.___slide[
                        s], "touchstart.lg", (function (n) {
                        if (utils.hasClass(t.core.outer, "lg-zoomed")) {
                            var i = t.core.___slide[t.core.index].querySelector(
                                ".lg-object");
                            r = i.offsetHeight * i.getAttribute(
                                "data-scale") > t.core.outer.querySelector(
                                ".lg").clientHeight, ((o = i.offsetWidth *
                                i.getAttribute("data-scale") >
                                t.core.outer.querySelector(
                                    ".lg").clientWidth) || r) && (n
                                .preventDefault(), e = {
                                    x: n.targetTouches[0].pageX,
                                    y: n.targetTouches[0].pageY
                                })
                        }
                    }));
                    for (var a = 0; a < t.core.___slide.length; a++) utils.on(t.core
                        .___slide[a], "touchmove.lg", (function (s) {
                            if (utils.hasClass(t.core.outer, "lg-zoomed")) {
                                var a, l, c = t.core.___slide[t.core.index]
                                    .querySelector(".lg-img-wrap");
                                s.preventDefault(), i = !0, n = {
                                    x: s.targetTouches[0].pageX,
                                    y: s.targetTouches[0].pageY
                                }, utils.addClass(t.core.outer,
                                    "lg-zoom-dragging"), l = r ? -Math.abs(
                                    c.getAttribute("data-y")) + (n.y -
                                    e.y) : -Math.abs(c.getAttribute(
                                    "data-y")), a = o ? -Math.abs(c.getAttribute(
                                    "data-x")) + (n.x - e.x) : -Math.abs(
                                    c.getAttribute("data-x")), (Math.abs(
                                    n.x - e.x) > 15 || Math.abs(n.y -
                                    e.y) > 15) && (t.core.s.useLeftForZoom ?
                                    (c.style.left = a + "px", c.style.top =
                                        l + "px") : utils.setVendor(c,
                                        "Transform", "translate3d(" + a +
                                        "px, " + l + "px, 0)"))
                            }
                        }));
                    for (var l = 0; l < t.core.___slide.length; l++) utils.on(t.core
                        .___slide[l], "touchend.lg", (function () {
                            utils.hasClass(t.core.outer, "lg-zoomed") && i &&
                                (i = !1, utils.removeClass(t.core.outer,
                                    "lg-zoom-dragging"), t.touchendZoom(
                                    e, n, o, r))
                        }))
                }, o.prototype.zoomDrag = function () {
                    for (var t = this, e = {}, n = {}, i = !1, o = !1, r = !1, s = !
                            1, a = 0; a < t.core.___slide.length; a++) utils.on(t.core
                        .___slide[a], "mousedown.lgzoom", (function (n) {
                            var o = t.core.___slide[t.core.index].querySelector(
                                ".lg-object");
                            s = o.offsetHeight * o.getAttribute(
                                    "data-scale") > t.core.outer.querySelector(
                                    ".lg").clientHeight, r = o.offsetWidth *
                                o.getAttribute("data-scale") > t.core.outer
                                .querySelector(".lg").clientWidth, utils.hasClass(
                                    t.core.outer, "lg-zoomed") && utils.hasClass(
                                    n.target, "lg-object") && (r || s) && (
                                    n.preventDefault(), e = {
                                        x: n.pageX,
                                        y: n.pageY
                                    }, i = !0, t.core.outer.scrollLeft += 1,
                                    t.core.outer.scrollLeft -= 1, utils.removeClass(
                                        t.core.outer, "lg-grab"), utils.addClass(
                                        t.core.outer, "lg-grabbing"))
                        }));
                    utils.on(window, "mousemove.lgzoom", (function (a) {
                        if (i) {
                            var l, c, u = t.core.___slide[t.core.index]
                                .querySelector(".lg-img-wrap");
                            o = !0, n = {
                                    x: a.pageX,
                                    y: a.pageY
                                }, utils.addClass(t.core.outer,
                                    "lg-zoom-dragging"), c = s ? -Math.abs(
                                    u.getAttribute("data-y")) + (n.y -
                                    e.y) : -Math.abs(u.getAttribute(
                                    "data-y")), l = r ? -Math.abs(u.getAttribute(
                                    "data-x")) + (n.x - e.x) : -Math.abs(
                                    u.getAttribute("data-x")), t.core.s
                                .useLeftForZoom ? (u.style.left = l +
                                    "px", u.style.top = c + "px") :
                                utils.setVendor(u, "Transform",
                                    "translate3d(" + l + "px, " + c +
                                    "px, 0)")
                        }
                    })), utils.on(window, "mouseup.lgzoom", (function (a) {
                        i && (i = !1, utils.removeClass(t.core.outer,
                                    "lg-zoom-dragging"), !o || e.x ===
                                n.x && e.y === n.y || (n = {
                                    x: a.pageX,
                                    y: a.pageY
                                }, t.touchendZoom(e, n, r, s)), o = !1),
                            utils.removeClass(t.core.outer,
                                "lg-grabbing"), utils.addClass(t.core.outer,
                                "lg-grab")
                    }))
                }, o.prototype.touchendZoom = function (t, e, n, i) {
                    var o = this.core.___slide[this.core.index].querySelector(
                            ".lg-img-wrap"),
                        r = this.core.___slide[this.core.index].querySelector(
                            ".lg-object"),
                        s = -Math.abs(o.getAttribute("data-x")) + (e.x - t.x),
                        a = -Math.abs(o.getAttribute("data-y")) + (e.y - t.y),
                        l = (this.core.outer.querySelector(".lg").clientHeight - r.offsetHeight) /
                        2,
                        c = Math.abs(r.offsetHeight * Math.abs(r.getAttribute(
                            "data-scale")) - this.core.outer.querySelector(
                            ".lg").clientHeight + l),
                        u = (this.core.outer.querySelector(".lg").clientWidth - r.offsetWidth) /
                        2,
                        d = Math.abs(r.offsetWidth * Math.abs(r.getAttribute(
                            "data-scale")) - this.core.outer.querySelector(
                            ".lg").clientWidth + u);
                    (Math.abs(e.x - t.x) > 15 || Math.abs(e.y - t.y) > 15) && (i &&
                        (a <= -c ? a = -c : a >= -l && (a = -l)), n && (s <= -d ? s = -
                            d : s >= -u && (s = -u)), i ? o.setAttribute("data-y",
                            Math.abs(a)) : a = -Math.abs(o.getAttribute("data-y")),
                        n ? o.setAttribute("data-x", Math.abs(s)) : s = -Math.abs(o
                            .getAttribute("data-x")), this.core.s.useLeftForZoom ?
                        (o.style.left = s + "px", o.style.top = a + "px") : utils.setVendor(
                            o, "Transform", "translate3d(" + s + "px, " + a +
                            "px, 0)"))
                }, o.prototype.destroy = function () {
                    utils.off(this.core.el, ".lgzoom"), utils.off(window, ".lgzoom");
                    for (var t = 0; t < this.core.___slide.length; t++) utils.off(
                        this.core.___slide[t], ".lgzoom");
                    utils.off(this.core.el, ".lgtmzoom"), this.resetZoom(),
                        clearTimeout(this.zoomabletimeout), this.zoomabletimeout = !
                        1
                }, window.lgModules.zoom = o
            }))
        }, {}]
    }, {}, [1])(1)
})),
function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define &&
        define.amd ? define([], e) : "object" == typeof exports ? exports.axios = e() : t.axios = e()
}(this, (function () {
    return function (t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var o = e[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return t[i].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports
        }
        return n.m = t, n.c = e, n.p = "", n(0)
    }([function (t, e, n) {
        t.exports = n(1)
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = n(3),
            r = n(4),
            s = n(22);

        function a(t) {
            var e = new r(t),
                n = o(r.prototype.request, e);
            return i.extend(n, r.prototype, e), i.extend(n, e), n
        }
        var l = a(n(10));
        l.Axios = r, l.create = function (t) {
            return a(s(l.defaults, t))
        }, l.Cancel = n(23), l.CancelToken = n(24), l.isCancel = n(9), l.all = function (t) {
            return Promise.all(t)
        }, l.spread = n(25), t.exports = l, t.exports.default = l
    }, function (t, e, n) {
        "use strict";
        var i = n(3),
            o = Object.prototype.toString;

        function r(t) {
            return "[object Array]" === o.call(t)
        }

        function s(t) {
            return void 0 === t
        }

        function a(t) {
            return null !== t && "object" == typeof t
        }

        function l(t) {
            if ("[object Object]" !== o.call(t)) return !1;
            var e = Object.getPrototypeOf(t);
            return null === e || e === Object.prototype
        }

        function c(t) {
            return "[object Function]" === o.call(t)
        }

        function u(t, e) {
            if (null != t)
                if ("object" != typeof t && (t = [t]), r(t))
                    for (var n = 0, i = t.length; n < i; n++) e.call(null, t[n], n, t);
                else
                    for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(null, t[o],
                        o, t)
        }
        t.exports = {
            isArray: r,
            isArrayBuffer: function (t) {
                return "[object ArrayBuffer]" === o.call(t)
            },
            isBuffer: function (t) {
                return null !== t && !s(t) && null !== t.constructor && !s(t.constructor) &&
                    "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
            },
            isFormData: function (t) {
                return "undefined" != typeof FormData && t instanceof FormData
            },
            isArrayBufferView: function (t) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ?
                    ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer
            },
            isString: function (t) {
                return "string" == typeof t
            },
            isNumber: function (t) {
                return "number" == typeof t
            },
            isObject: a,
            isPlainObject: l,
            isUndefined: s,
            isDate: function (t) {
                return "[object Date]" === o.call(t)
            },
            isFile: function (t) {
                return "[object File]" === o.call(t)
            },
            isBlob: function (t) {
                return "[object Blob]" === o.call(t)
            },
            isFunction: c,
            isStream: function (t) {
                return a(t) && c(t.pipe)
            },
            isURLSearchParams: function (t) {
                return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams
            },
            isStandardBrowserEnv: function () {
                return ("undefined" == typeof navigator || "ReactNative" !== navigator.product &&
                        "NativeScript" !== navigator.product && "NS" !== navigator.product) &&
                    ("undefined" != typeof window && "undefined" != typeof document)
            },
            forEach: u,
            merge: function t() {
                var e = {};

                function n(n, i) {
                    l(e[i]) && l(n) ? e[i] = t(e[i], n) : l(n) ? e[i] = t({}, n) : r(n) ? e[
                        i] = n.slice() : e[i] = n
                }
                for (var i = 0, o = arguments.length; i < o; i++) u(arguments[i], n);
                return e
            },
            extend: function (t, e, n) {
                return u(e, (function (e, o) {
                    t[o] = n && "function" == typeof e ? i(e, n) : e
                })), t
            },
            trim: function (t) {
                return t.replace(/^\s*/, "").replace(/\s*$/, "")
            },
            stripBOM: function (t) {
                return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
            }
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e) {
            return function () {
                for (var n = new Array(arguments.length), i = 0; i < n.length; i++) n[i] =
                    arguments[i];
                return t.apply(e, n)
            }
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = n(5),
            r = n(6),
            s = n(7),
            a = n(22);

        function l(t) {
            this.defaults = t, this.interceptors = {
                request: new r,
                response: new r
            }
        }
        l.prototype.request = function (t) {
            "string" == typeof t ? (t = arguments[1] || {}).url = arguments[0] : t = t || {}, (
                    t = a(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults
                .method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
            var e = [s, void 0],
                n = Promise.resolve(t);
            for (this.interceptors.request.forEach((function (t) {
                    e.unshift(t.fulfilled, t.rejected)
                })), this.interceptors.response.forEach((function (t) {
                    e.push(t.fulfilled, t.rejected)
                })); e.length;) n = n.then(e.shift(), e.shift());
            return n
        }, l.prototype.getUri = function (t) {
            return t = a(this.defaults, t), o(t.url, t.params, t.paramsSerializer).replace(
                /^\?/, "")
        }, i.forEach(["delete", "get", "head", "options"], (function (t) {
            l.prototype[t] = function (e, n) {
                return this.request(a(n || {}, {
                    method: t,
                    url: e,
                    data: (n || {}).data
                }))
            }
        })), i.forEach(["post", "put", "patch"], (function (t) {
            l.prototype[t] = function (e, n, i) {
                return this.request(a(i || {}, {
                    method: t,
                    url: e,
                    data: n
                }))
            }
        })), t.exports = l
    }, function (t, e, n) {
        "use strict";
        var i = n(2);

        function o(t) {
            return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi,
                ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }
        t.exports = function (t, e, n) {
            if (!e) return t;
            var r;
            if (n) r = n(e);
            else if (i.isURLSearchParams(e)) r = e.toString();
            else {
                var s = [];
                i.forEach(e, (function (t, e) {
                    null != t && (i.isArray(t) ? e += "[]" : t = [t], i.forEach(t,
                        (function (t) {
                            i.isDate(t) ? t = t.toISOString() : i.isObject(
                                t) && (t = JSON.stringify(t)), s.push(
                                o(e) + "=" + o(t))
                        })))
                })), r = s.join("&")
            }
            if (r) {
                var a = t.indexOf("#"); - 1 !== a && (t = t.slice(0, a)), t += (-1 === t.indexOf(
                    "?") ? "?" : "&") + r
            }
            return t
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2);

        function o() {
            this.handlers = []
        }
        o.prototype.use = function (t, e) {
            return this.handlers.push({
                fulfilled: t,
                rejected: e
            }), this.handlers.length - 1
        }, o.prototype.eject = function (t) {
            this.handlers[t] && (this.handlers[t] = null)
        }, o.prototype.forEach = function (t) {
            i.forEach(this.handlers, (function (e) {
                null !== e && t(e)
            }))
        }, t.exports = o
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = n(8),
            r = n(9),
            s = n(10);

        function a(t) {
            t.cancelToken && t.cancelToken.throwIfRequested()
        }
        t.exports = function (t) {
            return a(t), t.headers = t.headers || {}, t.data = o(t.data, t.headers, t.transformRequest),
                t.headers = i.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers),
                i.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (
                    function (e) {
                        delete t.headers[e]
                    })), (t.adapter || s.adapter)(t).then((function (e) {
                    return a(t), e.data = o(e.data, e.headers, t.transformResponse), e
                }), (function (e) {
                    return r(e) || (a(t), e && e.response && (e.response.data = o(e.response
                        .data, e.response.headers, t.transformResponse))), Promise.reject(
                        e)
                }))
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = function (t, e, n) {
            return i.forEach(n, (function (n) {
                t = n(t, e)
            })), t
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return !(!t || !t.__CANCEL__)
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = n(11),
            r = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

        function s(t, e) {
            !i.isUndefined(t) && i.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
        }
        var a, l = {
            adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process &&
                "[object process]" === Object.prototype.toString.call(process)) && (a =
                n(12)), a),
            transformRequest: [function (t, e) {
                return o(e, "Accept"), o(e, "Content-Type"), i.isFormData(t) || i.isArrayBuffer(
                    t) || i.isBuffer(t) || i.isStream(t) || i.isFile(t) || i.isBlob(
                    t) ? t : i.isArrayBufferView(t) ? t.buffer : i.isURLSearchParams(
                    t) ? (s(e, "application/x-www-form-urlencoded;charset=utf-8"),
                    t.toString()) : i.isObject(t) ? (s(e,
                    "application/json;charset=utf-8"), JSON.stringify(t)) : t
            }],
            transformResponse: [function (t) {
                if ("string" == typeof t) try {
                    t = JSON.parse(t)
                } catch (t) {}
                return t
            }],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function (t) {
                return t >= 200 && t < 300
            }
        };
        l.headers = {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }, i.forEach(["delete", "get", "head"], (function (t) {
            l.headers[t] = {}
        })), i.forEach(["post", "put", "patch"], (function (t) {
            l.headers[t] = i.merge(r)
        })), t.exports = l
    }, function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = function (t, e) {
            i.forEach(t, (function (n, i) {
                i !== e && i.toUpperCase() === e.toUpperCase() && (t[e] = n, delete t[
                    i])
            }))
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = n(13),
            r = n(16),
            s = n(5),
            a = n(17),
            l = n(20),
            c = n(21),
            u = n(14);
        t.exports = function (t) {
            return new Promise((function (e, n) {
                var d = t.data,
                    f = t.headers;
                i.isFormData(d) && delete f["Content-Type"];
                var h = new XMLHttpRequest;
                if (t.auth) {
                    var p = t.auth.username || "",
                        m = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) :
                        "";
                    f.Authorization = "Basic " + btoa(p + ":" + m)
                }
                var g = a(t.baseURL, t.url);
                if (h.open(t.method.toUpperCase(), s(g, t.params, t.paramsSerializer),
                        !0), h.timeout = t.timeout, h.onreadystatechange = function () {
                        if (h && 4 === h.readyState && (0 !== h.status || h.responseURL &&
                                0 === h.responseURL.indexOf("file:"))) {
                            var i = "getAllResponseHeaders" in h ? l(h.getAllResponseHeaders()) :
                                null,
                                r = {
                                    data: t.responseType && "text" !== t.responseType ?
                                        h.response : h.responseText,
                                    status: h.status,
                                    statusText: h.statusText,
                                    headers: i,
                                    config: t,
                                    request: h
                                };
                            o(e, n, r), h = null
                        }
                    }, h.onabort = function () {
                        h && (n(u("Request aborted", t, "ECONNABORTED", h)), h =
                            null)
                    }, h.onerror = function () {
                        n(u("Network Error", t, null, h)), h = null
                    }, h.ontimeout = function () {
                        var e = "timeout of " + t.timeout + "ms exceeded";
                        t.timeoutErrorMessage && (e = t.timeoutErrorMessage), n(u(e,
                            t, "ECONNABORTED", h)), h = null
                    }, i.isStandardBrowserEnv()) {
                    var v = (t.withCredentials || c(g)) && t.xsrfCookieName ? r.read(
                        t.xsrfCookieName) : void 0;
                    v && (f[t.xsrfHeaderName] = v)
                }
                if ("setRequestHeader" in h && i.forEach(f, (function (t, e) {
                        void 0 === d && "content-type" === e.toLowerCase() ?
                            delete f[e] : h.setRequestHeader(e, t)
                    })), i.isUndefined(t.withCredentials) || (h.withCredentials = !
                        !t.withCredentials), t.responseType) try {
                    h.responseType = t.responseType
                } catch (e) {
                    if ("json" !== t.responseType) throw e
                }
                "function" == typeof t.onDownloadProgress && h.addEventListener(
                        "progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress &&
                    h.upload && h.upload.addEventListener("progress", t.onUploadProgress),
                    t.cancelToken && t.cancelToken.promise.then((function (t) {
                        h && (h.abort(), n(t), h = null)
                    })), d || (d = null), h.send(d)
            }))
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(14);
        t.exports = function (t, e, n) {
            var o = n.config.validateStatus;
            n.status && o && !o(n.status) ? e(i("Request failed with status code " + n.status,
                n.config, null, n.request, n)) : t(n)
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(15);
        t.exports = function (t, e, n, o, r) {
            var s = new Error(t);
            return i(s, e, n, o, r)
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e, n, i, o) {
            return t.config = e, n && (t.code = n), t.request = i, t.response = o, t.isAxiosError = !
                0, t.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code
                    }
                }, t
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = i.isStandardBrowserEnv() ? {
            write: function (t, e, n, o, r, s) {
                var a = [];
                a.push(t + "=" + encodeURIComponent(e)), i.isNumber(n) && a.push("expires=" +
                        new Date(n).toGMTString()), i.isString(o) && a.push("path=" + o), i
                    .isString(r) && a.push("domain=" + r), !0 === s && a.push("secure"),
                    document.cookie = a.join("; ")
            },
            read: function (t) {
                var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                return e ? decodeURIComponent(e[3]) : null
            },
            remove: function (t) {
                this.write(t, "", Date.now() - 864e5)
            }
        } : {
            write: function () {},
            read: function () {
                return null
            },
            remove: function () {}
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(18),
            o = n(19);
        t.exports = function (t, e) {
            return t && !i(e) ? o(t, e) : e
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e) {
            return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2),
            o = ["age", "authorization", "content-length", "content-type", "etag", "expires",
                "from", "host", "if-modified-since", "if-unmodified-since", "last-modified",
                "location", "max-forwards", "proxy-authorization", "referer", "retry-after",
                "user-agent"];
        t.exports = function (t) {
            var e, n, r, s = {};
            return t ? (i.forEach(t.split("\n"), (function (t) {
                if (r = t.indexOf(":"), e = i.trim(t.substr(0, r)).toLowerCase(),
                    n = i.trim(t.substr(r + 1)), e) {
                    if (s[e] && o.indexOf(e) >= 0) return;
                    s[e] = "set-cookie" === e ? (s[e] ? s[e] : []).concat([n]) :
                        s[e] ? s[e] + ", " + n : n
                }
            })), s) : s
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = i.isStandardBrowserEnv() ? function () {
            var t, e = /(msie|trident)/i.test(navigator.userAgent),
                n = document.createElement("a");

            function o(t) {
                var i = t;
                return e && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
                    href: n.href,
                    protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                    host: n.host,
                    search: n.search ? n.search.replace(/^\?/, "") : "",
                    hash: n.hash ? n.hash.replace(/^#/, "") : "",
                    hostname: n.hostname,
                    port: n.port,
                    pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                }
            }
            return t = o(window.location.href),
                function (e) {
                    var n = i.isString(e) ? o(e) : e;
                    return n.protocol === t.protocol && n.host === t.host
                }
        }() : function () {
            return !0
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = function (t, e) {
            e = e || {};
            var n = {},
                o = ["url", "method", "data"],
                r = ["headers", "auth", "proxy", "params"],
                s = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer",
                    "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType",
                    "xsrfCookieName", "xsrfHeaderName", "onUploadProgress",
                    "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength",
                    "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken",
                    "socketPath", "responseEncoding"],
                a = ["validateStatus"];

            function l(t, e) {
                return i.isPlainObject(t) && i.isPlainObject(e) ? i.merge(t, e) : i.isPlainObject(
                    e) ? i.merge({}, e) : i.isArray(e) ? e.slice() : e
            }

            function c(o) {
                i.isUndefined(e[o]) ? i.isUndefined(t[o]) || (n[o] = l(void 0, t[o])) : n[o] =
                    l(t[o], e[o])
            }
            i.forEach(o, (function (t) {
                i.isUndefined(e[t]) || (n[t] = l(void 0, e[t]))
            })), i.forEach(r, c), i.forEach(s, (function (o) {
                i.isUndefined(e[o]) ? i.isUndefined(t[o]) || (n[o] = l(void 0, t[o])) :
                    n[o] = l(void 0, e[o])
            })), i.forEach(a, (function (i) {
                i in e ? n[i] = l(t[i], e[i]) : i in t && (n[i] = l(void 0, t[i]))
            }));
            var u = o.concat(r).concat(s).concat(a),
                d = Object.keys(t).concat(Object.keys(e)).filter((function (t) {
                    return -1 === u.indexOf(t)
                }));
            return i.forEach(d, c), n
        }
    }, function (t, e) {
        "use strict";

        function n(t) {
            this.message = t
        }
        n.prototype.toString = function () {
            return "Cancel" + (this.message ? ": " + this.message : "")
        }, n.prototype.__CANCEL__ = !0, t.exports = n
    }, function (t, e, n) {
        "use strict";
        var i = n(23);

        function o(t) {
            if ("function" != typeof t) throw new TypeError("executor must be a function.");
            var e;
            this.promise = new Promise((function (t) {
                e = t
            }));
            var n = this;
            t((function (t) {
                n.reason || (n.reason = new i(t), e(n.reason))
            }))
        }
        o.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason
        }, o.source = function () {
            var t;
            return {
                token: new o((function (e) {
                    t = e
                })),
                cancel: t
            }
        }, t.exports = o
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return function (e) {
                return t.apply(null, e)
            }
        }
    }])
})),
/*!
 * Bootstrap v5.0.0-alpha1 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&
        define.amd ? define(e) : (t = t || self).bootstrap = e()
}(this, (function () {
    "use strict";

    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
                t, i.key, i)
        }
    }

    function e(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }

    function n(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function i(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e && (i = i.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function o(t) {
        for (var e = 1; e < arguments.length; e++) {
            var o = null != arguments[e] ? arguments[e] : {};
            e % 2 ? i(Object(o), !0).forEach((function (e) {
                n(t, e, o[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(
                o)) : i(Object(o)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
            }))
        }
        return t
    }
    var r, s, a, l, c = function (t) {
            do {
                t += Math.floor(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        u = function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : null
            }
            return e
        },
        d = function (t) {
            var e = u(t);
            return e && document.querySelector(e) ? e : null
        },
        f = function (t) {
            var e = u(t);
            return e ? document.querySelector(e) : null
        },
        h = function (t) {
            if (!t) return 0;
            var e = window.getComputedStyle(t),
                n = e.transitionDuration,
                i = e.transitionDelay,
                o = parseFloat(n),
                r = parseFloat(i);
            return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) :
                0
        },
        p = function (t) {
            t.dispatchEvent(new Event("transitionend"))
        },
        m = function (t) {
            return (t[0] || t).nodeType
        },
        g = function (t, e) {
            var n = !1,
                i = e + 5;
            t.addEventListener("transitionend", (function e() {
                n = !0, t.removeEventListener("transitionend", e)
            })), setTimeout((function () {
                n || p(t)
            }), i)
        },
        v = function (t, e, n) {
            Object.keys(n).forEach((function (i) {
                var o, r = n[i],
                    s = e[i],
                    a = s && m(s) ? "element" : null == (o = s) ? "" + o : {}.toString.call(o).match(
                        /\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i +
                    '" provided type "' + a + '" but expected type "' + r + '".')
            }))
        },
        b = function (t) {
            if (!t) return !1;
            if (t.style && t.parentNode && t.parentNode.style) {
                var e = getComputedStyle(t),
                    n = getComputedStyle(t.parentNode);
                return "none" !== e.display && "none" !== n.display && "hidden" !== e.visibility
            }
            return !1
        },
        _ = function () {
            return function () {}
        },
        y = function (t) {
            return t.offsetHeight
        },
        w = function () {
            var t = window.jQuery;
            return t && !document.body.hasAttribute("data-no-jquery") ? t : null
        },
        E = (r = {}, s = 1, {
            set: function (t, e, n) {
                void 0 === t.key && (t.key = {
                    key: e,
                    id: s
                }, s++), r[t.key.id] = n
            },
            get: function (t, e) {
                if (!t || void 0 === t.key) return null;
                var n = t.key;
                return n.key === e ? r[n.id] : null
            },
            delete: function (t, e) {
                if (void 0 !== t.key) {
                    var n = t.key;
                    n.key === e && (delete r[n.id], delete t.key)
                }
            }
        }),
        C = function (t, e, n) {
            E.set(t, e, n)
        },
        x = function (t, e) {
            return E.get(t, e)
        },
        T = function (t, e) {
            E.delete(t, e)
        },
        S = Element.prototype.querySelectorAll,
        L = Element.prototype.querySelector,
        k = (a = new CustomEvent("Bootstrap", {
            cancelable: !0
        }), (l = document.createElement("div")).addEventListener("Bootstrap", (function () {
            return null
        })), a.preventDefault(), l.dispatchEvent(a), a.defaultPrevented),
        A = /:scope\b/;
    (function () {
        var t = document.createElement("div");
        try {
            t.querySelectorAll(":scope *")
        } catch (t) {
            return !1
        }
        return !0
    })() || (S = function (t) {
        if (!A.test(t)) return this.querySelectorAll(t);
        var e = Boolean(this.id);
        e || (this.id = c("scope"));
        var n = null;
        try {
            t = t.replace(A, "#" + this.id), n = this.querySelectorAll(t)
        } finally {
            e || this.removeAttribute("id")
        }
        return n
    }, L = function (t) {
        if (!A.test(t)) return this.querySelector(t);
        var e = S.call(this, t);
        return void 0 !== e[0] ? e[0] : null
    });
    var O = w(),
        N = /[^.]*(?=\..*)\.|.*/,
        D = /\..*/,
        j = /::\d+$/,
        I = {},
        M = 1,
        P = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        H = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll",
            "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup",
            "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown",
            "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange",
            "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load",
            "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error",
            "abort", "scroll"];

    function q(t, e) {
        return e && e + "::" + M++ || t.uidEvent || M++
    }

    function B(t) {
        var e = q(t);
        return t.uidEvent = e, I[e] = I[e] || {}, I[e]
    }

    function z(t, e, n) {
        void 0 === n && (n = null);
        for (var i = Object.keys(t), o = 0, r = i.length; o < r; o++) {
            var s = t[i[o]];
            if (s.originalHandler === e && s.delegationSelector === n) return s
        }
        return null
    }

    function R(t, e, n) {
        var i = "string" == typeof e,
            o = i ? n : e,
            r = t.replace(D, ""),
            s = P[r];
        return s && (r = s), H.indexOf(r) > -1 || (r = t), [i, o, r]
    }

    function F(t, e, n, i, o) {
        if ("string" == typeof e && t) {
            n || (n = i, i = null);
            var r = R(e, n, i),
                s = r[0],
                a = r[1],
                l = r[2],
                c = B(t),
                u = c[l] || (c[l] = {}),
                d = z(u, a, s ? n : null);
            if (d) d.oneOff = d.oneOff && o;
            else {
                var f = q(a, e.replace(N, "")),
                    h = s ? function (t, e, n) {
                        return function i(o) {
                            for (var r = t.querySelectorAll(e), s = o.target; s && s !== this; s = s.parentNode)
                                for (var a = r.length; a--;)
                                    if (r[a] === s) return i.oneOff && W.off(t, o.type, n), n.apply(s, [o]);
                            return null
                        }
                    }(t, n, i) : function (t, e) {
                        return function n(i) {
                            return n.oneOff && W.off(t, i.type, e), e.apply(t, [i])
                        }
                    }(t, n);
                h.delegationSelector = s ? n : null, h.originalHandler = a, h.oneOff = o, h.uidEvent = f, u[f] =
                    h, t.addEventListener(l, h, s)
            }
        }
    }

    function U(t, e, n, i, o) {
        var r = z(e[n], i, o);
        r && (t.removeEventListener(n, r, Boolean(o)), delete e[n][r.uidEvent])
    }
    var W = {
            on: function (t, e, n, i) {
                F(t, e, n, i, !1)
            },
            one: function (t, e, n, i) {
                F(t, e, n, i, !0)
            },
            off: function (t, e, n, i) {
                if ("string" == typeof e && t) {
                    var o = R(e, n, i),
                        r = o[0],
                        s = o[1],
                        a = o[2],
                        l = a !== e,
                        c = B(t),
                        u = "." === e.charAt(0);
                    if (void 0 === s) {
                        u && Object.keys(c).forEach((function (n) {
                            ! function (t, e, n, i) {
                                var o = e[n] || {};
                                Object.keys(o).forEach((function (r) {
                                    if (r.indexOf(i) > -1) {
                                        var s = o[r];
                                        U(t, e, n, s.originalHandler, s.delegationSelector)
                                    }
                                }))
                            }(t, c, n, e.slice(1))
                        }));
                        var d = c[a] || {};
                        Object.keys(d).forEach((function (n) {
                            var i = n.replace(j, "");
                            if (!l || e.indexOf(i) > -1) {
                                var o = d[n];
                                U(t, c, a, o.originalHandler, o.delegationSelector)
                            }
                        }))
                    } else {
                        if (!c || !c[a]) return;
                        U(t, c, a, s, r ? n : null)
                    }
                }
            },
            trigger: function (t, e, n) {
                if ("string" != typeof e || !t) return null;
                var i, o = e.replace(D, ""),
                    r = e !== o,
                    s = H.indexOf(o) > -1,
                    a = !0,
                    l = !0,
                    c = !1,
                    u = null;
                return r && O && (i = O.Event(e, n), O(t).trigger(i), a = !i.isPropagationStopped(), l = !i
                        .isImmediatePropagationStopped(), c = i.isDefaultPrevented()), s ? (u = document.createEvent(
                        "HTMLEvents")).initEvent(o, a, !0) : u = new CustomEvent(e, {
                        bubbles: a,
                        cancelable: !0
                    }), void 0 !== n && Object.keys(n).forEach((function (t) {
                        Object.defineProperty(u, t, {
                            get: function () {
                                return n[t]
                            }
                        })
                    })), c && (u.preventDefault(), k || Object.defineProperty(u, "defaultPrevented", {
                        get: function () {
                            return !0
                        }
                    })), l && t.dispatchEvent(u), u.defaultPrevented && void 0 !== i && i.preventDefault(),
                    u
            }
        },
        V = "alert",
        Y = function () {
            function t(t) {
                this._element = t, this._element && C(t, "bs.alert", this)
            }
            var n = t.prototype;
            return n.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t));
                var n = this._triggerCloseEvent(e);
                null === n || n.defaultPrevented || this._removeElement(e)
            }, n.dispose = function () {
                T(this._element, "bs.alert"), this._element = null
            }, n._getRootElement = function (t) {
                return f(t) || t.closest(".alert")
            }, n._triggerCloseEvent = function (t) {
                return W.trigger(t, "close.bs.alert")
            }, n._removeElement = function (t) {
                var e = this;
                if (t.classList.remove("show"), t.classList.contains("fade")) {
                    var n = h(t);
                    W.one(t, "transitionend", (function () {
                        return e._destroyElement(t)
                    })), g(t, n)
                } else this._destroyElement(t)
            }, n._destroyElement = function (t) {
                t.parentNode && t.parentNode.removeChild(t), W.trigger(t, "closed.bs.alert")
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    var n = x(this, "bs.alert");
                    n || (n = new t(this)), "close" === e && n[e](this)
                }))
            }, t.handleDismiss = function (t) {
                return function (e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, t.getInstance = function (t) {
                return x(t, "bs.alert")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }]), t
        }();
    W.on(document, "click.bs.alert.data-api", '[data-dismiss="alert"]', Y.handleDismiss(new Y));
    var X = w();
    if (X) {
        var Q = X.fn[V];
        X.fn[V] = Y.jQueryInterface, X.fn[V].Constructor = Y, X.fn[V].noConflict = function () {
            return X.fn[V] = Q, Y.jQueryInterface
        }
    }
    var G = function () {
        function t(t) {
            this._element = t, C(t, "bs.button", this)
        }
        var n = t.prototype;
        return n.toggle = function () {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }, n.dispose = function () {
            T(this._element, "bs.button"), this._element = null
        }, t.jQueryInterface = function (e) {
            return this.each((function () {
                var n = x(this, "bs.button");
                n || (n = new t(this)), "toggle" === e && n[e]()
            }))
        }, t.getInstance = function (t) {
            return x(t, "bs.button")
        }, e(t, null, [{
            key: "VERSION",
            get: function () {
                return "5.0.0-alpha1"
            }
        }]), t
    }();
    W.on(document, "click.bs.button.data-api", '[data-toggle="button"]', (function (t) {
        t.preventDefault();
        var e = t.target.closest('[data-toggle="button"]'),
            n = x(e, "bs.button");
        n || (n = new G(e)), n.toggle()
    }));
    var K = w();
    if (K) {
        var Z = K.fn.button;
        K.fn.button = G.jQueryInterface, K.fn.button.Constructor = G, K.fn.button.noConflict = function () {
            return K.fn.button = Z, G.jQueryInterface
        }
    }

    function $(t) {
        return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" ===
            t ? null : t)
    }

    function J(t) {
        return t.replace(/[A-Z]/g, (function (t) {
            return "-" + t.toLowerCase()
        }))
    }
    var tt = {
            setDataAttribute: function (t, e, n) {
                t.setAttribute("data-" + J(e), n)
            },
            removeDataAttribute: function (t, e) {
                t.removeAttribute("data-" + J(e))
            },
            getDataAttributes: function (t) {
                if (!t) return {};
                var e = o({}, t.dataset);
                return Object.keys(e).forEach((function (t) {
                    e[t] = $(e[t])
                })), e
            },
            getDataAttribute: function (t, e) {
                return $(t.getAttribute("data-" + J(e)))
            },
            offset: function (t) {
                var e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            },
            position: function (t) {
                return {
                    top: t.offsetTop,
                    left: t.offsetLeft
                }
            },
            toggleClass: function (t, e) {
                t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e))
            }
        },
        et = {
            matches: function (t, e) {
                return t.matches(e)
            },
            find: function (t, e) {
                var n;
                return void 0 === e && (e = document.documentElement), (n = []).concat.apply(n, S.call(e, t))
            },
            findOne: function (t, e) {
                return void 0 === e && (e = document.documentElement), L.call(e, t)
            },
            children: function (t, e) {
                var n, i = (n = []).concat.apply(n, t.children);
                return i.filter((function (t) {
                    return t.matches(e)
                }))
            },
            parents: function (t, e) {
                for (var n = [], i = t.parentNode; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;)
                    this.matches(i, e) && n.push(i), i = i.parentNode;
                return n
            },
            prev: function (t, e) {
                for (var n = t.previousElementSibling; n;) {
                    if (n.matches(e)) return [n];
                    n = n.previousElementSibling
                }
                return []
            },
            next: function (t, e) {
                for (var n = t.nextElementSibling; n;) {
                    if (this.matches(n, e)) return [n];
                    n = n.nextElementSibling
                }
                return []
            }
        },
        nt = "carousel",
        it = ".bs.carousel",
        ot = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        rt = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        st = {
            TOUCH: "touch",
            PEN: "pen"
        },
        at = function () {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1,
                    this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0,
                    this._config = this._getConfig(e), this._element = t, this._indicatorsElement = et.findOne(
                        ".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in
                    document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(
                        window.PointerEvent), this._addEventListeners(), C(t, "bs.carousel", this)
            }
            var n = t.prototype;
            return n.next = function () {
                this._isSliding || this._slide("next")
            }, n.nextWhenVisible = function () {
                !document.hidden && b(this._element) && this.next()
            }, n.prev = function () {
                this._isSliding || this._slide("prev")
            }, n.pause = function (t) {
                t || (this._isPaused = !0), et.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
                    (p(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval =
                    null
            }, n.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval =
                    null), this._config && this._config.interval && !this._isPaused && (this._interval =
                    setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
                        this._config.interval))
            }, n.to = function (t) {
                var e = this;
                this._activeElement = et.findOne(".active.carousel-item", this._element);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) W.one(this._element, "slid.bs.carousel", (function () {
                        return e.to(t)
                    }));
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = t > n ? "next" : "prev";
                        this._slide(i, this._items[t])
                    }
            }, n.dispose = function () {
                W.off(this._element, it), T(this._element, "bs.carousel"), this._items = null, this._config =
                    null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding =
                    null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function (t) {
                return t = o(o({}, ot), t), v(nt, t, rt), t
            }, n._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function () {
                var t = this;
                this._config.keyboard && W.on(this._element, "keydown.bs.carousel", (function (e) {
                    return t._keydown(e)
                })), "hover" === this._config.pause && (W.on(this._element, "mouseenter.bs.carousel", (
                    function (e) {
                        return t.pause(e)
                    })), W.on(this._element, "mouseleave.bs.carousel", (function (e) {
                    return t.cycle(e)
                }))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function () {
                var t = this,
                    e = function (e) {
                        t._pointerEvent && st[e.pointerType.toUpperCase()] ? t.touchStartX = e.clientX : t._pointerEvent ||
                            (t.touchStartX = e.touches[0].clientX)
                    },
                    n = function (e) {
                        t._pointerEvent && st[e.pointerType.toUpperCase()] && (t.touchDeltaX = e.clientX -
                            t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(),
                            t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(
                                (function (e) {
                                    return t.cycle(e)
                                }), 500 + t._config.interval))
                    };
                et.find(".carousel-item img", this._element).forEach((function (t) {
                    W.on(t, "dragstart.bs.carousel", (function (t) {
                        return t.preventDefault()
                    }))
                })), this._pointerEvent ? (W.on(this._element, "pointerdown.bs.carousel", (function (t) {
                    return e(t)
                })), W.on(this._element, "pointerup.bs.carousel", (function (t) {
                    return n(t)
                })), this._element.classList.add("pointer-event")) : (W.on(this._element,
                    "touchstart.bs.carousel", (function (t) {
                        return e(t)
                    })), W.on(this._element, "touchmove.bs.carousel", (function (e) {
                    return function (e) {
                        e.touches && e.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX =
                            e.touches[0].clientX - t.touchStartX
                    }(e)
                })), W.on(this._element, "touchend.bs.carousel", (function (t) {
                    return n(t)
                })))
            }, n._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.key) {
                    case "ArrowLeft":
                        t.preventDefault(), this.prev();
                        break;
                    case "ArrowRight":
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? et.find(".carousel-item", t.parentNode) : [], this
                    ._items.indexOf(t)
            }, n._getItemByDirection = function (t, e) {
                var n = "next" === t,
                    i = "prev" === t,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, n._triggerSlideEvent = function (t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(et.findOne(".active.carousel-item", this._element));
                return W.trigger(this._element, "slide.bs.carousel", {
                    relatedTarget: t,
                    direction: e,
                    from: i,
                    to: n
                })
            }, n._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    for (var e = et.find(".active", this._indicatorsElement), n = 0; n < e.length; n++) e[n]
                        .classList.remove("active");
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && i.classList.add("active")
                }
            }, n._slide = function (t, e) {
                var n, i, o, r = this,
                    s = et.findOne(".active.carousel-item", this._element),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    u = Boolean(this._interval);
                if ("next" === t ? (n = "carousel-item-left", i = "carousel-item-next", o = "left") : (n =
                        "carousel-item-right", i = "carousel-item-prev", o = "right"), l && l.classList.contains(
                        "active")) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).defaultPrevented && s && l) {
                    if (this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l), this._element
                        .classList.contains("slide")) {
                        l.classList.add(i), y(l), s.classList.add(n), l.classList.add(n);
                        var d = parseInt(l.getAttribute("data-interval"), 10);
                        d ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval,
                                this._config.interval = d) : this._config.interval = this._config.defaultInterval ||
                            this._config.interval;
                        var f = h(s);
                        W.one(s, "transitionend", (function () {
                            l.classList.remove(n, i), l.classList.add("active"), s.classList.remove(
                                "active", i, n), r._isSliding = !1, setTimeout((function () {
                                W.trigger(r._element, "slid.bs.carousel", {
                                    relatedTarget: l,
                                    direction: o,
                                    from: a,
                                    to: c
                                })
                            }), 0)
                        })), g(s, f)
                    } else s.classList.remove("active"), l.classList.add("active"), this._isSliding = !1, W
                        .trigger(this._element, "slid.bs.carousel", {
                            relatedTarget: l,
                            direction: o,
                            from: a,
                            to: c
                        });
                    u && this.cycle()
                }
            }, t.carouselInterface = function (e, n) {
                var i = x(e, "bs.carousel"),
                    r = o(o({}, ot), tt.getDataAttributes(e));
                "object" == typeof n && (r = o(o({}, r), n));
                var s = "string" == typeof n ? n : r.slide;
                if (i || (i = new t(e, r)), "number" == typeof n) i.to(n);
                else if ("string" == typeof s) {
                    if (void 0 === i[s]) throw new TypeError('No method named "' + s + '"');
                    i[s]()
                } else r.interval && r.ride && (i.pause(), i.cycle())
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    t.carouselInterface(this, e)
                }))
            }, t.dataApiClickHandler = function (e) {
                var n = f(this);
                if (n && n.classList.contains("carousel")) {
                    var i = o(o({}, tt.getDataAttributes(n)), tt.getDataAttributes(this)),
                        r = this.getAttribute("data-slide-to");
                    r && (i.interval = !1), t.carouselInterface(n, i), r && x(n, "bs.carousel").to(r), e.preventDefault()
                }
            }, t.getInstance = function (t) {
                return x(t, "bs.carousel")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return ot
                }
            }]), t
        }();
    W.on(document, "click.bs.carousel.data-api", "[data-slide], [data-slide-to]", at.dataApiClickHandler), W.on(
        window, "load.bs.carousel.data-api", (function () {
            for (var t = et.find('[data-ride="carousel"]'), e = 0, n = t.length; e < n; e++) at.carouselInterface(
                t[e], x(t[e], "bs.carousel"))
        }));
    var lt = w();
    if (lt) {
        var ct = lt.fn[nt];
        lt.fn[nt] = at.jQueryInterface, lt.fn[nt].Constructor = at, lt.fn[nt].noConflict = function () {
            return lt.fn[nt] = ct, at.jQueryInterface
        }
    }
    var ut = "collapse",
        dt = {
            toggle: !0,
            parent: ""
        },
        ft = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        ht = function () {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray =
                    et.find('[data-toggle="collapse"][href="#' + t.id +
                        '"],[data-toggle="collapse"][data-target="#' + t.id + '"]');
                for (var n = et.find('[data-toggle="collapse"]'), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = d(r),
                        a = et.find(s).filter((function (e) {
                            return e === t
                        }));
                    null !== s && a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(
                    this._element, this._triggerArray), this._config.toggle && this.toggle(), C(t,
                    "bs.collapse", this)
            }
            var n = t.prototype;
            return n.toggle = function () {
                this._element.classList.contains("show") ? this.hide() : this.show()
            }, n.show = function () {
                var e = this;
                if (!this._isTransitioning && !this._element.classList.contains("show")) {
                    var n, i;
                    this._parent && 0 === (n = et.find(".show, .collapsing", this._parent).filter((function (
                        t) {
                        return "string" == typeof e._config.parent ? t.getAttribute(
                            "data-parent") === e._config.parent : t.classList.contains(
                            "collapse")
                    }))).length && (n = null);
                    var o = et.findOne(this._selector);
                    if (n) {
                        var r = n.filter((function (t) {
                            return o !== t
                        }));
                        if ((i = r[0] ? x(r[0], "bs.collapse") : null) && i._isTransitioning) return
                    }
                    if (!W.trigger(this._element, "show.bs.collapse").defaultPrevented) {
                        n && n.forEach((function (e) {
                            o !== e && t.collapseInterface(e, "hide"), i || C(e, "bs.collapse",
                                null)
                        }));
                        var s = this._getDimension();
                        this._element.classList.remove("collapse"), this._element.classList.add(
                                "collapsing"), this._element.style[s] = 0, this._triggerArray.length &&
                            this._triggerArray.forEach((function (t) {
                                t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0)
                            })), this.setTransitioning(!0);
                        var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                            l = h(this._element);
                        W.one(this._element, "transitionend", (function () {
                            e._element.classList.remove("collapsing"), e._element.classList.add(
                                "collapse", "show"), e._element.style[s] = "", e.setTransitioning(
                                !1), W.trigger(e._element, "shown.bs.collapse")
                        })), g(this._element, l), this._element.style[s] = this._element[a] + "px"
                    }
                }
            }, n.hide = function () {
                var t = this;
                if (!this._isTransitioning && this._element.classList.contains("show") && !W.trigger(this._element,
                        "hide.bs.collapse").defaultPrevented) {
                    var e = this._getDimension();
                    this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", y(this._element),
                        this._element.classList.add("collapsing"), this._element.classList.remove(
                            "collapse", "show");
                    var n = this._triggerArray.length;
                    if (n > 0)
                        for (var i = 0; i < n; i++) {
                            var o = this._triggerArray[i],
                                r = f(o);
                            r && !r.classList.contains("show") && (o.classList.add("collapsed"), o.setAttribute(
                                "aria-expanded", !1))
                        }
                    this.setTransitioning(!0);
                    this._element.style[e] = "";
                    var s = h(this._element);
                    W.one(this._element, "transitionend", (function () {
                        t.setTransitioning(!1), t._element.classList.remove("collapsing"), t._element
                            .classList.add("collapse"), W.trigger(t._element,
                                "hidden.bs.collapse")
                    })), g(this._element, s)
                }
            }, n.setTransitioning = function (t) {
                this._isTransitioning = t
            }, n.dispose = function () {
                T(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element =
                    null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function (t) {
                return (t = o(o({}, dt), t)).toggle = Boolean(t.toggle), v(ut, t, ft), t
            }, n._getDimension = function () {
                return this._element.classList.contains("width") ? "width" : "height"
            }, n._getParent = function () {
                var t = this,
                    e = this._config.parent;
                m(e) ? void 0 === e.jquery && void 0 === e[0] || (e = e[0]) : e = et.findOne(e);
                var n = '[data-toggle="collapse"][data-parent="' + e + '"]';
                return et.find(n, e).forEach((function (e) {
                    var n = f(e);
                    t._addAriaAndCollapsedClass(n, [e])
                })), e
            }, n._addAriaAndCollapsedClass = function (t, e) {
                if (t) {
                    var n = t.classList.contains("show");
                    e.length && e.forEach((function (t) {
                        n ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute(
                            "aria-expanded", n)
                    }))
                }
            }, t.collapseInterface = function (e, n) {
                var i = x(e, "bs.collapse"),
                    r = o(o(o({}, dt), tt.getDataAttributes(e)), "object" == typeof n && n ? n : {});
                if (!i && r.toggle && "string" == typeof n && /show|hide/.test(n) && (r.toggle = !1), i ||
                    (i = new t(e, r)), "string" == typeof n) {
                    if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    t.collapseInterface(this, e)
                }))
            }, t.getInstance = function (t) {
                return x(t, "bs.collapse")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return dt
                }
            }]), t
        }();
    W.on(document, "click.bs.collapse.data-api", '[data-toggle="collapse"]', (function (t) {
        "A" === t.target.tagName && t.preventDefault();
        var e = tt.getDataAttributes(this),
            n = d(this);
        et.find(n).forEach((function (t) {
            var n, i = x(t, "bs.collapse");
            i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent =
                e.parent, i._parent = i._getParent()), n = "toggle") : n = e, ht.collapseInterface(
                t, n)
        }))
    }));
    var pt = w();
    if (pt) {
        var mt = pt.fn[ut];
        pt.fn[ut] = ht.jQueryInterface, pt.fn[ut].Constructor = ht, pt.fn[ut].noConflict = function () {
            return pt.fn[ut] = mt, ht.jQueryInterface
        }
    }
    /**!
     * @fileOverview Kickass library to create and place poppers near their reference elements.
     * @version 1.16.0
     * @license
     * Copyright (c) 2016 Federico Zivolo and contributors
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    var gt = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        vt = function () {
            for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
                if (gt && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
            return 0
        }();
    var bt = gt && window.Promise ? function (t) {
        var e = !1;
        return function () {
            e || (e = !0, window.Promise.resolve().then((function () {
                e = !1, t()
            })))
        }
    } : function (t) {
        var e = !1;
        return function () {
            e || (e = !0, setTimeout((function () {
                e = !1, t()
            }), vt))
        }
    };

    function _t(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function yt(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function wt(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function Et(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = yt(t),
            n = e.overflow,
            i = e.overflowX,
            o = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + o + i) ? t : Et(wt(t))
    }

    function Ct(t) {
        return t && t.referenceNode ? t.referenceNode : t
    }
    var xt = gt && !(!window.MSInputMethodContext || !document.documentMode),
        Tt = gt && /MSIE 10/.test(navigator.userAgent);

    function St(t) {
        return 11 === t ? xt : 10 === t ? Tt : xt || Tt
    }

    function Lt(t) {
        if (!t) return document.documentElement;
        for (var e = St(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;)
            n = (t = t.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" ===
            yt(n, "position") ? Lt(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function kt(t) {
        return null !== t.parentNode ? kt(t.parentNode) : t
    }

    function At(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            o = n ? e : t,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0);
        var s = r.commonAncestorContainer;
        if (t !== s && e !== s || i.contains(o)) return function (t) {
            var e = t.nodeName;
            return "BODY" !== e && ("HTML" === e || Lt(t.firstElementChild) === t)
        }(s) ? s : Lt(s);
        var a = kt(t);
        return a.host ? At(a.host, e) : At(t, kt(e).host)
    }

    function Ot(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === e ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var o = t.ownerDocument.documentElement,
                r = t.ownerDocument.scrollingElement || o;
            return r[n]
        }
        return t[n]
    }

    function Nt(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = Ot(e, "top"),
            o = Ot(e, "left"),
            r = n ? -1 : 1;
        return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t
    }

    function Dt(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function jt(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], St(
                10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) +
            parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function It(t) {
        var e = t.body,
            n = t.documentElement,
            i = St(10) && getComputedStyle(n);
        return {
            height: jt("Height", e, n, i),
            width: jt("Width", e, n, i)
        }
    }
    var Mt = function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        Pt = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0),
                        Object.defineProperty(t, i.key, i)
                }
            }
            return function (e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        Ht = function (t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        qt = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        };

    function Bt(t) {
        return qt({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function zt(t) {
        var e = {};
        try {
            if (St(10)) {
                e = t.getBoundingClientRect();
                var n = Ot(t, "top"),
                    i = Ot(t, "left");
                e.top += n, e.left += i, e.bottom += n, e.right += i
            } else e = t.getBoundingClientRect()
        } catch (t) {}
        var o = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
            r = "HTML" === t.nodeName ? It(t.ownerDocument) : {},
            s = r.width || t.clientWidth || o.width,
            a = r.height || t.clientHeight || o.height,
            l = t.offsetWidth - s,
            c = t.offsetHeight - a;
        if (l || c) {
            var u = yt(t);
            l -= Dt(u, "x"), c -= Dt(u, "y"), o.width -= l, o.height -= c
        }
        return Bt(o)
    }

    function Rt(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = St(10),
            o = "HTML" === e.nodeName,
            r = zt(t),
            s = zt(e),
            a = Et(t),
            l = yt(e),
            c = parseFloat(l.borderTopWidth, 10),
            u = parseFloat(l.borderLeftWidth, 10);
        n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
        var d = Bt({
            top: r.top - s.top - c,
            left: r.left - s.left - u,
            width: r.width,
            height: r.height
        });
        if (d.marginTop = 0, d.marginLeft = 0, !i && o) {
            var f = parseFloat(l.marginTop, 10),
                h = parseFloat(l.marginLeft, 10);
            d.top -= c - f, d.bottom -= c - f, d.left -= u - h, d.right -= u - h, d.marginTop = f, d.marginLeft =
                h
        }
        return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (d = Nt(d, e)), d
    }

    function Ft(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = t.ownerDocument.documentElement,
            i = Rt(t, n),
            o = Math.max(n.clientWidth, window.innerWidth || 0),
            r = Math.max(n.clientHeight, window.innerHeight || 0),
            s = e ? 0 : Ot(n),
            a = e ? 0 : Ot(n, "left"),
            l = {
                top: s - i.top + i.marginTop,
                left: a - i.left + i.marginLeft,
                width: o,
                height: r
            };
        return Bt(l)
    }

    function Ut(t) {
        var e = t.nodeName;
        if ("BODY" === e || "HTML" === e) return !1;
        if ("fixed" === yt(t, "position")) return !0;
        var n = wt(t);
        return !!n && Ut(n)
    }

    function Wt(t) {
        if (!t || !t.parentElement || St()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === yt(e, "transform");) e = e.parentElement;
        return e || document.documentElement
    }

    function Vt(t, e, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            r = {
                top: 0,
                left: 0
            },
            s = o ? Wt(t) : At(t, Ct(e));
        if ("viewport" === i) r = Ft(s, o);
        else {
            var a = void 0;
            "scrollParent" === i ? "BODY" === (a = Et(wt(e))).nodeName && (a = t.ownerDocument.documentElement) :
                a = "window" === i ? t.ownerDocument.documentElement : i;
            var l = Rt(a, s, o);
            if ("HTML" !== a.nodeName || Ut(s)) r = l;
            else {
                var c = It(t.ownerDocument),
                    u = c.height,
                    d = c.width;
                r.top += l.top - l.marginTop, r.bottom = u + l.top, r.left += l.left - l.marginLeft, r.right =
                    d + l.left
            }
        }
        var f = "number" == typeof (n = n || 0);
        return r.left += f ? n : n.left || 0, r.top += f ? n : n.top || 0, r.right -= f ? n : n.right || 0, r.bottom -=
            f ? n : n.bottom || 0, r
    }

    function Yt(t) {
        return t.width * t.height
    }

    function Xt(t, e, n, i, o) {
        var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = Vt(n, i, r, o),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map((function (t) {
                return qt({
                    key: t
                }, a[t], {
                    area: Yt(a[t])
                })
            })).sort((function (t, e) {
                return e.area - t.area
            })),
            c = l.filter((function (t) {
                var e = t.width,
                    i = t.height;
                return e >= n.clientWidth && i >= n.clientHeight
            })),
            u = c.length > 0 ? c[0].key : l[0].key,
            d = t.split("-")[1];
        return u + (d ? "-" + d : "")
    }

    function Qt(t, e, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
            o = i ? Wt(e) : At(e, Ct(n));
        return Rt(n, o, i)
    }

    function Gt(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function Kt(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, (function (t) {
            return e[t]
        }))
    }

    function Zt(t, e, n) {
        n = n.split("-")[0];
        var i = Gt(t),
            o = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ["right", "left"].indexOf(n),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            l = r ? "height" : "width",
            c = r ? "width" : "height";
        return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[Kt(a)], o
    }

    function $t(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function Jt(t, e, n) {
        return (void 0 === n ? t : t.slice(0, function (t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex((function (t) {
                return t[e] === n
            }));
            var i = $t(t, (function (t) {
                return t[e] === n
            }));
            return t.indexOf(i)
        }(t, "name", n))).forEach((function (t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && _t(n) && (e.offsets.popper = Bt(e.offsets.popper), e.offsets.reference =
                Bt(e.offsets.reference), e = n(e, t))
        })), e
    }

    function te() {
        if (!this.state.isDestroyed) {
            var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            t.offsets.reference = Qt(this.state, this.popper, this.reference, this.options.positionFixed), t.placement =
                Xt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers
                    .flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement,
                t.positionFixed = this.options.positionFixed, t.offsets.popper = Zt(this.popper, t.offsets.reference,
                    t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute",
                t = Jt(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !
                    0, this.options.onCreate(t))
        }
    }

    function ee(t, e) {
        return t.some((function (t) {
            var n = t.name;
            return t.enabled && n === e
        }))
    }

    function ne(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e
            .length; i++) {
            var o = e[i],
                r = o ? "" + o + n : t;
            if (void 0 !== document.body.style[r]) return r
        }
        return null
    }

    function ie() {
        return this.state.isDestroyed = !0, ee(this.modifiers, "applyStyle") && (this.popper.removeAttribute(
                    "x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style
                .left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange =
                "", this.popper.style[ne("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy &&
            this.popper.parentNode.removeChild(this.popper), this
    }

    function oe(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function re(t, e, n, i) {
        n.updateBound = i, oe(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = Et(t);
        return function t(e, n, i, o) {
            var r = "BODY" === e.nodeName,
                s = r ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, {
                passive: !0
            }), r || t(Et(s.parentNode), n, i, o), o.push(s)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function se() {
        this.state.eventsEnabled || (this.state = re(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function ae() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference,
            e = this.state, oe(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(
                (function (t) {
                    t.removeEventListener("scroll", e.updateBound)
                })), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !
            1, e))
    }

    function le(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function ce(t, e) {
        Object.keys(e).forEach((function (n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
                le(e[n]) && (i = "px"), t.style[n] = e[n] + i
        }))
    }
    var ue = gt && /Firefox/i.test(navigator.userAgent);

    function de(t, e, n) {
        var i = $t(t, (function (t) {
                return t.name === e
            })),
            o = !!i && t.some((function (t) {
                return t.name === n && t.enabled && t.order < i.order
            }));
        if (!o) {
            var r = "`" + e + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + r +
                " modifier in order to work, be sure to include it before " + r + "!")
        }
        return o
    }
    var fe = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right",
            "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        he = fe.slice(3);

    function pe(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = he.indexOf(t),
            i = he.slice(n + 1).concat(he.slice(0, n));
        return e ? i.reverse() : i
    }
    var me = "flip",
        ge = "clockwise",
        ve = "counterclockwise";

    function be(t, e, n, i) {
        var o = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            s = t.split(/(\+|\-)/).map((function (t) {
                return t.trim()
            })),
            a = s.indexOf($t(s, (function (t) {
                return -1 !== t.search(/,|\s/)
            })));
        s[a] && -1 === s[a].indexOf(",") && console.warn(
            "Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] :
            [s];
        return (c = c.map((function (t, i) {
            var o = (1 === i ? !r : r) ? "height" : "width",
                s = !1;
            return t.reduce((function (t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[
                    t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e,
                    s = !1, t) : t.concat(e)
            }), []).map((function (t) {
                return function (t, e, n, i) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        r = +o[1],
                        s = o[2];
                    if (!r) return t;
                    if (0 === s.indexOf("%")) {
                        var a = void 0;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return Bt(a)[e] / 100 * r
                    }
                    if ("vh" === s || "vw" === s) {
                        return ("vh" === s ? Math.max(document.documentElement.clientHeight,
                            window.innerHeight || 0) : Math.max(
                            document.documentElement.clientWidth,
                            window.innerWidth || 0)) / 100 * r
                    }
                    return r
                }(t, o, e, n)
            }))
        }))).forEach((function (t, e) {
            t.forEach((function (n, i) {
                le(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1))
            }))
        })), o
    }
    var _e = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = e.split("-")[1];
                        if (i) {
                            var o = t.offsets,
                                r = o.reference,
                                s = o.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                u = {
                                    start: Ht({}, l, r[l]),
                                    end: Ht({}, l, r[l] + r[c] - s[c])
                                };
                            t.offsets.popper = qt({}, s, u[i])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.offset,
                            i = t.placement,
                            o = t.offsets,
                            r = o.popper,
                            s = o.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = le(+n) ? [+n, 0] : be(n, r, s, a), "left" === a ? (r.top += l[0], r.left -=
                                l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left +=
                                l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t
                            .popper = r, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.boundariesElement || Lt(t.instance.popper);
                        t.instance.reference === n && (n = Lt(n));
                        var i = ne("transform"),
                            o = t.instance.popper.style,
                            r = o.top,
                            s = o.left,
                            a = o[i];
                        o.top = "", o.left = "", o[i] = "";
                        var l = Vt(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
                        o.top = r, o.left = s, o[i] = a, e.boundaries = l;
                        var c = e.priority,
                            u = t.offsets.popper,
                            d = {
                                primary: function (t) {
                                    var n = u[t];
                                    return u[t] < l[t] && !e.escapeWithReference && (n = Math.max(u[t],
                                        l[t])), Ht({}, t, n)
                                },
                                secondary: function (t) {
                                    var n = "right" === t ? "left" : "top",
                                        i = u[n];
                                    return u[t] > l[t] && !e.escapeWithReference && (i = Math.min(u[n],
                                        l[t] - ("right" === t ? u.width : u.height))), Ht({}, n, i)
                                }
                            };
                        return c.forEach((function (t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            u = qt({}, u, d[e](t))
                        })), t.offsets.popper = u, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            o = t.placement.split("-")[0],
                            r = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(o),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) &&
                            (t.offsets.popper[l] = r(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (t, e) {
                        var n;
                        if (!de(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn(
                            "WARNING: `arrow.element` must be child of its popper element!"), t;
                        var o = t.placement.split("-")[0],
                            r = t.offsets,
                            s = r.popper,
                            a = r.reference,
                            l = -1 !== ["left", "right"].indexOf(o),
                            c = l ? "height" : "width",
                            u = l ? "Top" : "Left",
                            d = u.toLowerCase(),
                            f = l ? "left" : "top",
                            h = l ? "bottom" : "right",
                            p = Gt(i)[c];
                        a[h] - p < s[d] && (t.offsets.popper[d] -= s[d] - (a[h] - p)), a[d] + p > s[h] && (
                            t.offsets.popper[d] += a[d] + p - s[h]), t.offsets.popper = Bt(t.offsets.popper);
                        var m = a[d] + a[c] / 2 - p / 2,
                            g = yt(t.instance.popper),
                            v = parseFloat(g["margin" + u], 10),
                            b = parseFloat(g["border" + u + "Width"], 10),
                            _ = m - t.offsets.popper[d] - v - b;
                        return _ = Math.max(Math.min(s[c] - p, _), 0), t.arrowElement = i, t.offsets.arrow =
                            (Ht(n = {}, d, Math.round(_)), Ht(n, f, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (t, e) {
                        if (ee(t.instance.modifiers, "inner")) return t;
                        if (t.flipped && t.placement === t.originalPlacement) return t;
                        var n = Vt(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement,
                                t.positionFixed),
                            i = t.placement.split("-")[0],
                            o = Kt(i),
                            r = t.placement.split("-")[1] || "",
                            s = [];
                        switch (e.behavior) {
                            case me:
                                s = [i, o];
                                break;
                            case ge:
                                s = pe(i);
                                break;
                            case ve:
                                s = pe(i, !0);
                                break;
                            default:
                                s = e.behavior
                        }
                        return s.forEach((function (a, l) {
                            if (i !== a || s.length === l + 1) return t;
                            i = t.placement.split("-")[0], o = Kt(i);
                            var c = t.offsets.popper,
                                u = t.offsets.reference,
                                d = Math.floor,
                                f = "left" === i && d(c.right) > d(u.left) || "right" === i &&
                                d(c.left) < d(u.right) || "top" === i && d(c.bottom) > d(u.top) ||
                                "bottom" === i && d(c.top) < d(u.bottom),
                                h = d(c.left) < d(n.left),
                                p = d(c.right) > d(n.right),
                                m = d(c.top) < d(n.top),
                                g = d(c.bottom) > d(n.bottom),
                                v = "left" === i && h || "right" === i && p || "top" === i && m ||
                                "bottom" === i && g,
                                b = -1 !== ["top", "bottom"].indexOf(i),
                                _ = !!e.flipVariations && (b && "start" === r && h || b &&
                                    "end" === r && p || !b && "start" === r && m || !b && "end" ===
                                    r && g),
                                y = !!e.flipVariationsByContent && (b && "start" === r && p ||
                                    b && "end" === r && h || !b && "start" === r && g || !b &&
                                    "end" === r && m),
                                w = _ || y;
                            (f || v || w) && (t.flipped = !0, (f || v) && (i = s[l + 1]), w &&
                                (r = function (t) {
                                    return "end" === t ? "start" : "start" === t ? "end" :
                                        t
                                }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper =
                                qt({}, t.offsets.popper, Zt(t.instance.popper, t.offsets.reference,
                                    t.placement)), t = Jt(t.instance.modifiers, t, "flip"))
                        })), t
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            o = i.popper,
                            r = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement =
                            Kt(e), t.offsets.popper = Bt(o), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (t) {
                        if (!de(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = $t(t.instance.modifiers, (function (t) {
                                return "preventOverflow" === t.name
                            })).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.x,
                            i = e.y,
                            o = t.offsets.popper,
                            r = $t(t.instance.modifiers, (function (t) {
                                return "applyStyle" === t.name
                            })).gpuAcceleration;
                        void 0 !== r && console.warn(
                            "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                        );
                        var s = void 0 !== r ? r : e.gpuAcceleration,
                            a = Lt(t.instance.popper),
                            l = zt(a),
                            c = {
                                position: o.position
                            },
                            u = function (t, e) {
                                var n = t.offsets,
                                    i = n.popper,
                                    o = n.reference,
                                    r = Math.round,
                                    s = Math.floor,
                                    a = function (t) {
                                        return t
                                    },
                                    l = r(o.width),
                                    c = r(i.width),
                                    u = -1 !== ["left", "right"].indexOf(t.placement),
                                    d = -1 !== t.placement.indexOf("-"),
                                    f = e ? u || d || l % 2 == c % 2 ? r : s : a,
                                    h = e ? r : a;
                                return {
                                    left: f(l % 2 == 1 && c % 2 == 1 && !d && e ? i.left - 1 : i.left),
                                    top: h(i.top),
                                    bottom: h(i.bottom),
                                    right: f(i.right)
                                }
                            }(t, window.devicePixelRatio < 2 || !ue),
                            d = "bottom" === n ? "top" : "bottom",
                            f = "right" === i ? "left" : "right",
                            h = ne("transform"),
                            p = void 0,
                            m = void 0;
                        if (m = "bottom" === d ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height +
                            u.bottom : u.top, p = "right" === f ? "HTML" === a.nodeName ? -a.clientWidth +
                            u.right : -l.width + u.right : u.left, s && h) c[h] = "translate3d(" + p +
                            "px, " + m + "px, 0)", c[d] = 0, c[f] = 0, c.willChange = "transform";
                        else {
                            var g = "bottom" === d ? -1 : 1,
                                v = "right" === f ? -1 : 1;
                            c[d] = m * g, c[f] = p * v, c.willChange = d + ", " + f
                        }
                        var b = {
                            "x-placement": t.placement
                        };
                        return t.attributes = qt({}, b, t.attributes), t.styles = qt({}, c, t.styles), t.arrowStyles =
                            qt({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !1,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (t) {
                        return ce(t.instance.popper, t.styles),
                            function (t, e) {
                                Object.keys(e).forEach((function (n) {
                                    !1 !== e[n] ? t.setAttribute(n, e[n]) : t.removeAttribute(n)
                                }))
                            }(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles)
                            .length && ce(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function (t, e, n, i, o) {
                        var r = Qt(o, e, t, n.positionFixed),
                            s = Xt(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip
                                .padding);
                        return e.setAttribute("x-placement", s), ce(e, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        ye = function () {
            function t(e, n) {
                var i = this,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Mt(this, t), this.scheduleUpdate = function () {
                        return requestAnimationFrame(i.update)
                    }, this.update = bt(this.update.bind(this)), this.options = qt({}, t.Defaults, o), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options
                    .modifiers = {}, Object.keys(qt({}, t.Defaults.modifiers, o.modifiers)).forEach((function (
                        e) {
                        i.options.modifiers[e] = qt({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[
                            e] : {})
                    })), this.modifiers = Object.keys(this.options.modifiers).map((function (t) {
                        return qt({
                            name: t
                        }, i.options.modifiers[t])
                    })).sort((function (t, e) {
                        return t.order - e.order
                    })), this.modifiers.forEach((function (t) {
                        t.enabled && _t(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                    })), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return Pt(t, [{
                key: "update",
                value: function () {
                    return te.call(this)
                }
            }, {
                key: "destroy",
                value: function () {
                    return ie.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function () {
                    return se.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function () {
                    return ae.call(this)
                }
            }]), t
        }();
    ye.Utils = ("undefined" != typeof window ? window : global).PopperUtils, ye.placements = fe, ye.Defaults =
        _e;
    var we = "dropdown",
        Ee = new RegExp("ArrowUp|ArrowDown|Escape"),
        Ce = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        xe = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        Te = function () {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(),
                    this._inNavbar = this._detectNavbar(), this._addEventListeners(), C(t, "bs.dropdown", this)
            }
            var n = t.prototype;
            return n.toggle = function () {
                if (!this._element.disabled && !this._element.classList.contains("disabled")) {
                    var e = this._element.classList.contains("show");
                    t.clearMenus(), e || this.show()
                }
            }, n.show = function () {
                if (!(this._element.disabled || this._element.classList.contains("disabled") || this._menu.classList
                        .contains("show"))) {
                    var e = t.getParentFromElement(this._element),
                        n = {
                            relatedTarget: this._element
                        };
                    if (!W.trigger(this._element, "show.bs.dropdown", n).defaultPrevented) {
                        if (!this._inNavbar) {
                            if (void 0 === ye) throw new TypeError(
                                "Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
                            var i = this._element;
                            "parent" === this._config.reference ? i = e : m(this._config.reference) && (i =
                                    this._config.reference, void 0 !== this._config.reference.jquery && (i =
                                        this._config.reference[0])), "scrollParent" !== this._config.boundary &&
                                e.classList.add("position-static"), this._popper = new ye(i, this._menu,
                                    this._getPopperConfig())
                        }
                        var o;
                        if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav"))(o = [])
                            .concat.apply(o, document.body.children).forEach((function (t) {
                                return W.on(t, "mouseover", null, (function () {}))
                            }));
                        this._element.focus(), this._element.setAttribute("aria-expanded", !0), tt.toggleClass(
                            this._menu, "show"), tt.toggleClass(this._element, "show"), W.trigger(e,
                            "shown.bs.dropdown", n)
                    }
                }
            }, n.hide = function () {
                if (!this._element.disabled && !this._element.classList.contains("disabled") && this._menu.classList
                    .contains("show")) {
                    var e = t.getParentFromElement(this._element),
                        n = {
                            relatedTarget: this._element
                        };
                    W.trigger(e, "hide.bs.dropdown", n).defaultPrevented || (this._popper && this._popper.destroy(),
                        tt.toggleClass(this._menu, "show"), tt.toggleClass(this._element, "show"), W.trigger(
                            e, "hidden.bs.dropdown", n))
                }
            }, n.dispose = function () {
                T(this._element, "bs.dropdown"), W.off(this._element, ".bs.dropdown"), this._element = null,
                    this._menu = null, this._popper && (this._popper.destroy(), this._popper = null)
            }, n.update = function () {
                this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate()
            }, n._addEventListeners = function () {
                var t = this;
                W.on(this._element, "click.bs.dropdown", (function (e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                }))
            }, n._getConfig = function (t) {
                return t = o(o(o({}, this.constructor.Default), tt.getDataAttributes(this._element)), t), v(
                    we, t, this.constructor.DefaultType), t
            }, n._getMenuElement = function () {
                return et.next(this._element, ".dropdown-menu")[0]
            }, n._getPlacement = function () {
                var t = this._element.parentNode,
                    e = "bottom-start";
                return t.classList.contains("dropup") ? (e = "top-start", this._menu.classList.contains(
                        "dropdown-menu-right") && (e = "top-end")) : t.classList.contains("dropright") ? e =
                    "right-start" : t.classList.contains("dropleft") ? e = "left-start" : this._menu.classList
                    .contains("dropdown-menu-right") && (e = "bottom-end"), e
            }, n._detectNavbar = function () {
                return Boolean(this._element.closest(".navbar"))
            }, n._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function (e) {
                    return e.offsets = o(o({}, e.offsets), t._config.offset(e.offsets, t._element) || {}),
                        e
                } : e.offset = this._config.offset, e
            }, n._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), o(o({}, t), this._config.popperConfig)
            }, t.dropdownInterface = function (e, n) {
                var i = x(e, "bs.dropdown");
                if (i || (i = new t(e, "object" == typeof n ? n : null)), "string" == typeof n) {
                    if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                    i[n]()
                }
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    t.dropdownInterface(this, e)
                }))
            }, t.clearMenus = function (e) {
                if (!e || 2 !== e.button && ("keyup" !== e.type || "Tab" === e.key))
                    for (var n = et.find('[data-toggle="dropdown"]'), i = 0, o = n.length; i < o; i++) {
                        var r = t.getParentFromElement(n[i]),
                            s = x(n[i], "bs.dropdown"),
                            a = {
                                relatedTarget: n[i]
                            };
                        if (e && "click" === e.type && (a.clickEvent = e), s) {
                            var l = s._menu;
                            if (n[i].classList.contains("show"))
                                if (!(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) ||
                                        "keyup" === e.type && "Tab" === e.key) && l.contains(e.target)))
                                    if (!W.trigger(r, "hide.bs.dropdown", a).defaultPrevented) {
                                        var c;
                                        if ("ontouchstart" in document.documentElement)(c = []).concat.apply(
                                            c, document.body.children).forEach((function (t) {
                                            return W.off(t, "mouseover", null, (function () {}))
                                        }));
                                        n[i].setAttribute("aria-expanded", "false"), s._popper && s._popper
                                            .destroy(), l.classList.remove("show"), n[i].classList.remove(
                                                "show"), W.trigger(r, "hidden.bs.dropdown", a)
                                    }
                        }
                    }
            }, t.getParentFromElement = function (t) {
                return f(t) || t.parentNode
            }, t.dataApiKeydownHandler = function (e) {
                if (!(/input|textarea/i.test(e.target.tagName) ? "Space" === e.key || "Escape" !== e.key &&
                        ("ArrowDown" !== e.key && "ArrowUp" !== e.key || e.target.closest(".dropdown-menu")) :
                        !Ee.test(e.key)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !
                        this.classList.contains("disabled"))) {
                    var n = t.getParentFromElement(this),
                        i = this.classList.contains("show");
                    if ("Escape" === e.key) return (this.matches('[data-toggle="dropdown"]') ? this : et.prev(
                        this, '[data-toggle="dropdown"]')[0]).focus(), void t.clearMenus();
                    if (i && "Space" !== e.key) {
                        var o = et.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", n).filter(
                            b);
                        if (o.length) {
                            var r = o.indexOf(e.target);
                            "ArrowUp" === e.key && r > 0 && r--, "ArrowDown" === e.key && r < o.length - 1 &&
                                r++, o[r = -1 === r ? 0 : r].focus()
                        }
                    } else t.clearMenus()
                }
            }, t.getInstance = function (t) {
                return x(t, "bs.dropdown")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return Ce
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return xe
                }
            }]), t
        }();
    W.on(document, "keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', Te.dataApiKeydownHandler), W.on(
        document, "keydown.bs.dropdown.data-api", ".dropdown-menu", Te.dataApiKeydownHandler), W.on(
        document, "click.bs.dropdown.data-api", Te.clearMenus), W.on(document, "keyup.bs.dropdown.data-api",
        Te.clearMenus), W.on(document, "click.bs.dropdown.data-api", '[data-toggle="dropdown"]', (function (
        t) {
        t.preventDefault(), t.stopPropagation(), Te.dropdownInterface(this, "toggle")
    })), W.on(document, "click.bs.dropdown.data-api", ".dropdown form", (function (t) {
        return t.stopPropagation()
    }));
    var Se = w();
    if (Se) {
        var Le = Se.fn[we];
        Se.fn[we] = Te.jQueryInterface, Se.fn[we].Constructor = Te, Se.fn[we].noConflict = function () {
            return Se.fn[we] = Le, Te.jQueryInterface
        }
    }
    var ke = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        Ae = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Oe = function () {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = et.findOne(".modal-dialog",
                        t), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !
                    1, this._isTransitioning = !1, this._scrollbarWidth = 0, C(t, "bs.modal", this)
            }
            var n = t.prototype;
            return n.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function (t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    this._element.classList.contains("fade") && (this._isTransitioning = !0);
                    var n = W.trigger(this._element, "show.bs.modal", {
                        relatedTarget: t
                    });
                    this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(),
                        this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(),
                        W.on(this._element, "click.dismiss.bs.modal", '[data-dismiss="modal"]', (
                            function (t) {
                                return e.hide(t)
                            })), W.on(this._dialog, "mousedown.dismiss.bs.modal", (function () {
                            W.one(e._element, "mouseup.dismiss.bs.modal", (function (t) {
                                t.target === e._element && (e._ignoreBackdropClick = !
                                    0)
                            }))
                        })), this._showBackdrop((function () {
                            return e._showElement(t)
                        })))
                }
            }, n.hide = function (t) {
                var e = this;
                if ((t && t.preventDefault(), this._isShown && !this._isTransitioning) && !W.trigger(this._element,
                        "hide.bs.modal").defaultPrevented) {
                    this._isShown = !1;
                    var n = this._element.classList.contains("fade");
                    if (n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(),
                        W.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), W.off(
                            this._element, "click.dismiss.bs.modal"), W.off(this._dialog,
                            "mousedown.dismiss.bs.modal"), n) {
                        var i = h(this._element);
                        W.one(this._element, "transitionend", (function (t) {
                            return e._hideModal(t)
                        })), g(this._element, i)
                    } else this._hideModal()
                }
            }, n.dispose = function () {
                [window, this._element, this._dialog].forEach((function (t) {
                        return W.off(t, ".bs.modal")
                    })), W.off(document, "focusin.bs.modal"), T(this._element, "bs.modal"), this._config =
                    null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown =
                    null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning =
                    null, this._scrollbarWidth = null
            }, n.handleUpdate = function () {
                this._adjustDialog()
            }, n._getConfig = function (t) {
                return t = o(o({}, ke), t), v("modal", t, Ae), t
            }, n._showElement = function (t) {
                var e = this,
                    n = this._element.classList.contains("fade"),
                    i = et.findOne(".modal-body", this._dialog);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE ||
                    document.body.appendChild(this._element), this._element.style.display = "block", this._element
                    .removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element
                    .setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), n &&
                    y(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus();
                var o = function () {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, W.trigger(e._element,
                        "shown.bs.modal", {
                            relatedTarget: t
                        })
                };
                if (n) {
                    var r = h(this._dialog);
                    W.one(this._dialog, "transitionend", o), g(this._dialog, r)
                } else o()
            }, n._enforceFocus = function () {
                var t = this;
                W.off(document, "focusin.bs.modal"), W.on(document, "focusin.bs.modal", (function (e) {
                    document === e.target || t._element === e.target || t._element.contains(e.target) ||
                        t._element.focus()
                }))
            }, n._setEscapeEvent = function () {
                var t = this;
                this._isShown ? W.on(this._element, "keydown.dismiss.bs.modal", (function (e) {
                    t._config.keyboard && "Escape" === e.key ? (e.preventDefault(), t.hide()) :
                        t._config.keyboard || "Escape" !== e.key || t._triggerBackdropTransition()
                })) : W.off(this._element, "keydown.dismiss.bs.modal")
            }, n._setResizeEvent = function () {
                var t = this;
                this._isShown ? W.on(window, "resize.bs.modal", (function () {
                    return t._adjustDialog()
                })) : W.off(window, "resize.bs.modal")
            }, n._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element
                    .removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !
                    1, this._showBackdrop((function () {
                        document.body.classList.remove("modal-open"), t._resetAdjustments(), t._resetScrollbar(),
                            W.trigger(t._element, "hidden.bs.modal")
                    }))
            }, n._removeBackdrop = function () {
                this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null
            }, n._showBackdrop = function (t) {
                var e = this,
                    n = this._element.classList.contains("fade") ? "fade" : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className =
                        "modal-backdrop", n && this._backdrop.classList.add(n), document.body.appendChild(
                            this._backdrop), W.on(this._element, "click.dismiss.bs.modal", (function (t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget &&
                                e._triggerBackdropTransition()
                        })), n && y(this._backdrop), this._backdrop.classList.add("show"), !n) return void t();
                    var i = h(this._backdrop);
                    W.one(this._backdrop, "transitionend", t), g(this._backdrop, i)
                } else if (!this._isShown && this._backdrop) {
                    this._backdrop.classList.remove("show");
                    var o = function () {
                        e._removeBackdrop(), t()
                    };
                    if (this._element.classList.contains("fade")) {
                        var r = h(this._backdrop);
                        W.one(this._backdrop, "transitionend", o), g(this._backdrop, r)
                    } else o()
                } else t()
            }, n._triggerBackdropTransition = function () {
                var t = this;
                if ("static" === this._config.backdrop) {
                    if (W.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
                    this._element.classList.add("modal-static");
                    var e = h(this._element);
                    W.one(this._element, "transitionend", (function () {
                        t._element.classList.remove("modal-static")
                    })), g(this._element, e), this._element.focus()
                } else this.hide()
            }, n._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth +
                    "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth +
                    "px")
            }, n._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth =
                    this._getScrollbarWidth()
            }, n._setScrollbar = function () {
                var t = this;
                if (this._isBodyOverflowing) {
                    et.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach((function (e) {
                        var n = e.style.paddingRight,
                            i = window.getComputedStyle(e)["padding-right"];
                        tt.setDataAttribute(e, "padding-right", n), e.style.paddingRight =
                            parseFloat(i) + t._scrollbarWidth + "px"
                    })), et.find(".sticky-top").forEach((function (e) {
                        var n = e.style.marginRight,
                            i = window.getComputedStyle(e)["margin-right"];
                        tt.setDataAttribute(e, "margin-right", n), e.style.marginRight =
                            parseFloat(i) - t._scrollbarWidth + "px"
                    }));
                    var e = document.body.style.paddingRight,
                        n = window.getComputedStyle(document.body)["padding-right"];
                    tt.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight =
                        parseFloat(n) + this._scrollbarWidth + "px"
                }
                document.body.classList.add("modal-open")
            }, n._resetScrollbar = function () {
                et.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach((function (t) {
                    var e = tt.getDataAttribute(t, "padding-right");
                    void 0 !== e && (tt.removeDataAttribute(t, "padding-right"), t.style.paddingRight =
                        e)
                })), et.find(".sticky-top").forEach((function (t) {
                    var e = tt.getDataAttribute(t, "margin-right");
                    void 0 !== e && (tt.removeDataAttribute(t, "margin-right"), t.style.marginRight =
                        e)
                }));
                var t = tt.getDataAttribute(document.body, "padding-right");
                void 0 === t ? document.body.style.paddingRight = "" : (tt.removeDataAttribute(document.body,
                    "padding-right"), document.body.style.paddingRight = t)
            }, n._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t.jQueryInterface = function (e, n) {
                return this.each((function () {
                    var i = x(this, "bs.modal"),
                        r = o(o(o({}, ke), tt.getDataAttributes(this)), "object" == typeof e &&
                            e ? e : {});
                    if (i || (i = new t(this, r)), "string" == typeof e) {
                        if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e](n)
                    } else r.show && i.show(n)
                }))
            }, t.getInstance = function (t) {
                return x(t, "bs.modal")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return ke
                }
            }]), t
        }();
    W.on(document, "click.bs.modal.data-api", '[data-toggle="modal"]', (function (t) {
        var e = this,
            n = f(this);
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault(), W.one(n,
            "show.bs.modal", (function (t) {
                t.defaultPrevented || W.one(n, "hidden.bs.modal", (function () {
                    b(e) && e.focus()
                }))
            }));
        var i = x(n, "bs.modal");
        if (!i) {
            var r = o(o({}, tt.getDataAttributes(n)), tt.getDataAttributes(this));
            i = new Oe(n, r)
        }
        i.show(this)
    }));
    var Ne = w();
    if (Ne) {
        var De = Ne.fn.modal;
        Ne.fn.modal = Oe.jQueryInterface, Ne.fn.modal.Constructor = Oe, Ne.fn.modal.noConflict = function () {
            return Ne.fn.modal = De, Oe.jQueryInterface
        }
    }
    var je = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ie = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        Me =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        Pe = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        };

    function He(t, e, n) {
        var i;
        if (!t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var o = (new window.DOMParser).parseFromString(t, "text/html"), r = Object.keys(e), s = (i = []).concat
                .apply(i, o.body.querySelectorAll("*")), a = function (t, n) {
                    var i, o = s[t],
                        a = o.nodeName.toLowerCase();
                    if (-1 === r.indexOf(a)) return o.parentNode.removeChild(o), "continue";
                    var l = (i = []).concat.apply(i, o.attributes),
                        c = [].concat(e["*"] || [], e[a] || []);
                    l.forEach((function (t) {
                        (function (t, e) {
                            var n = t.nodeName.toLowerCase();
                            if (-1 !== e.indexOf(n)) return -1 === je.indexOf(n) || Boolean(t.nodeValue
                                .match(Ie) || t.nodeValue.match(Me));
                            for (var i = e.filter((function (t) {
                                    return t instanceof RegExp
                                })), o = 0, r = i.length; o < r; o++)
                                if (n.match(i[o])) return !0;
                            return !1
                        })(t, c) || o.removeAttribute(t.nodeName)
                    }))
                }, l = 0, c = s.length; l < c; l++) a(l);
        return o.body.innerHTML
    }
    var qe = "tooltip",
        Be = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        ze = ["sanitize", "whiteList", "sanitizeFn"],
        Re = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        Fe = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Ue = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Pe,
            popperConfig: null
        },
        We = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        Ve = function () {
            function t(t, e) {
                if (void 0 === ye) throw new TypeError(
                    "Bootstrap's tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper =
                    null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners(),
                    C(t, this.constructor.DATA_KEY, this)
            }
            var n = t.prototype;
            return n.enable = function () {
                this._isEnabled = !0
            }, n.disable = function () {
                this._isEnabled = !1
            }, n.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, n.toggle = function (t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = x(t.target, e);
                        n || (n = new this.constructor(t.target, this._getDelegateConfig()), C(t.target, e,
                                n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ?
                            n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (this.getTipElement().classList.contains("show")) return void this._leave(null,
                            this);
                        this._enter(null, this)
                    }
            }, n.dispose = function () {
                clearTimeout(this._timeout), T(this.element, this.constructor.DATA_KEY), W.off(this.element,
                        this.constructor.EVENT_KEY), W.off(this.element.closest(".modal"), "hide.bs.modal",
                        this._hideModalHandler), this.tip && this.tip.parentNode.removeChild(this.tip),
                    this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger =
                    null, this._popper && this._popper.destroy(), this._popper = null, this.element = null,
                    this.config = null, this.tip = null
            }, n.show = function () {
                var t = this;
                if ("none" === this.element.style.display) throw new Error(
                    "Please use show on visible elements");
                if (this.isWithContent() && this._isEnabled) {
                    var e = W.trigger(this.element, this.constructor.Event.SHOW),
                        n = function t(e) {
                            if (!document.documentElement.attachShadow) return null;
                            if ("function" == typeof e.getRootNode) {
                                var n = e.getRootNode();
                                return n instanceof ShadowRoot ? n : null
                            }
                            return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null
                        }(this.element),
                        i = null === n ? this.element.ownerDocument.documentElement.contains(this.element) :
                        n.contains(this.element);
                    if (e.defaultPrevented || !i) return;
                    var o = this.getTipElement(),
                        r = c(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(),
                        this.config.animation && o.classList.add("fade");
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o,
                            this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this._addAttachmentClass(a);
                    var l, u = this._getContainer();
                    if (C(o, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(
                            this.tip) || u.appendChild(o), W.trigger(this.element, this.constructor.Event.INSERTED),
                        this._popper = new ye(this.element, o, this._getPopperConfig(a)), o.classList.add(
                            "show"), "ontouchstart" in document.documentElement)(l = []).concat.apply(l,
                        document.body.children).forEach((function (t) {
                        W.on(t, "mouseover", (function () {}))
                    }));
                    var d = function () {
                        t.config.animation && t._fixTransition();
                        var e = t._hoverState;
                        t._hoverState = null, W.trigger(t.element, t.constructor.Event.SHOWN), "out" ===
                            e && t._leave(null, t)
                    };
                    if (this.tip.classList.contains("fade")) {
                        var f = h(this.tip);
                        W.one(this.tip, "transitionend", d), g(this.tip, f)
                    } else d()
                }
            }, n.hide = function () {
                var t = this,
                    e = this.getTipElement(),
                    n = function () {
                        "show" !== t._hoverState && e.parentNode && e.parentNode.removeChild(e), t._cleanTipClass(),
                            t.element.removeAttribute("aria-describedby"), W.trigger(t.element, t.constructor
                                .Event.HIDDEN), t._popper.destroy()
                    };
                if (!W.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
                    var i;
                    if (e.classList.remove("show"), "ontouchstart" in document.documentElement)(i = []).concat
                        .apply(i, document.body.children).forEach((function (t) {
                            return W.off(t, "mouseover", _)
                        }));
                    if (this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger
                        .hover = !1, this.tip.classList.contains("fade")) {
                        var o = h(e);
                        W.one(e, "transitionend", n), g(e, o)
                    } else n();
                    this._hoverState = ""
                }
            }, n.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, n.isWithContent = function () {
                return Boolean(this.getTitle())
            }, n.getTipElement = function () {
                if (this.tip) return this.tip;
                var t = document.createElement("div");
                return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip
            }, n.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(et.findOne(".tooltip-inner", t), this.getTitle()), t.classList.remove(
                    "fade", "show")
            }, n.setElementContent = function (t, e) {
                if (null !== t) return "object" == typeof e && m(e) ? (e.jquery && (e = e[0]), void(this.config
                    .html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.textContent =
                    e.textContent)) : void(this.config.html ? (this.config.sanitize && (e = He(e,
                        this.config.whiteList, this.config.sanitizeFn)), t.innerHTML = e) : t.textContent =
                    e)
            }, n.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) :
                    this.config.title), t
            }, n._getPopperConfig = function (t) {
                var e = this;
                return o(o({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: "." + this.constructor.NAME + "-arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function (t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(
                            t)
                    },
                    onUpdate: function (t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }), this.config.popperConfig)
            }, n._addAttachmentClass = function (t) {
                this.getTipElement().classList.add("bs-tooltip-" + t)
            }, n._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function (e) {
                    return e.offsets = o(o({}, e.offsets), t.config.offset(e.offsets, t.element) || {}),
                        e
                } : e.offset = this.config.offset, e
            }, n._getContainer = function () {
                return !1 === this.config.container ? document.body : m(this.config.container) ? this.config
                    .container : et.findOne(this.config.container)
            }, n._getAttachment = function (t) {
                return Fe[t.toUpperCase()]
            }, n._setListeners = function () {
                var t = this;
                this.config.trigger.split(" ").forEach((function (e) {
                        if ("click" === e) W.on(t.element, t.constructor.Event.CLICK, t.config.selector,
                            (function (e) {
                                return t.toggle(e)
                            }));
                        else if ("manual" !== e) {
                            var n = "hover" === e ? t.constructor.Event.MOUSEENTER : t.constructor.Event
                                .FOCUSIN,
                                i = "hover" === e ? t.constructor.Event.MOUSELEAVE : t.constructor.Event
                                .FOCUSOUT;
                            W.on(t.element, n, t.config.selector, (function (e) {
                                return t._enter(e)
                            })), W.on(t.element, i, t.config.selector, (function (e) {
                                return t._leave(e)
                            }))
                        }
                    })), this._hideModalHandler = function () {
                        t.element && t.hide()
                    }, W.on(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.config
                    .selector ? this.config = o(o({}, this.config), {}, {
                        trigger: "manual",
                        selector: ""
                    }) : this._fixTitle()
            }, n._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute(
                    "data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute(
                    "title", ""))
            }, n._enter = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || x(t.target, n)) || (e = new this.constructor(t.target, this._getDelegateConfig()),
                    C(t.target, n, e)), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !
                        0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState =
                    "show" : (clearTimeout(e._timeout), e._hoverState = "show", e.config.delay && e.config.delay
                        .show ? e._timeout = setTimeout((function () {
                            "show" === e._hoverState && e.show()
                        }), e.config.delay.show) : e.show())
            }, n._leave = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || x(t.target, n)) || (e = new this.constructor(t.target, this._getDelegateConfig()),
                    C(t.target, n, e)), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !
                    1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e
                    .config.delay && e.config.delay.hide ? e._timeout = setTimeout((function () {
                        "out" === e._hoverState && e.hide()
                    }), e.config.delay.hide) : e.hide())
            }, n._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, n._getConfig = function (t) {
                var e = tt.getDataAttributes(this.element);
                return Object.keys(e).forEach((function (t) {
                        -1 !== ze.indexOf(t) && delete e[t]
                    })), t && "object" == typeof t.container && t.container.jquery && (t.container = t.container[
                        0]), "number" == typeof (t = o(o(o({}, this.constructor.Default), e), "object" ==
                        typeof t && t ? t : {})).delay && (t.delay = {
                        show: t.delay,
                        hide: t.delay
                    }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content &&
                    (t.content = t.content.toString()), v(qe, t, this.constructor.DefaultType), t.sanitize &&
                    (t.template = He(t.template, t.whiteList, t.sanitizeFn)), t
            }, n._getDelegateConfig = function () {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] =
                        this.config[e]);
                return t
            }, n._cleanTipClass = function () {
                var t = this.getTipElement(),
                    e = t.getAttribute("class").match(Be);
                null !== e && e.length > 0 && e.map((function (t) {
                    return t.trim()
                })).forEach((function (e) {
                    return t.classList.remove(e)
                }))
            }, n._handlePopperPlacementChange = function (t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(t.placement))
            }, n._fixTransition = function () {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (t.classList.remove("fade"), this.config.animation = !
                    1, this.hide(), this.show(), this.config.animation = e)
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    var n = x(this, "bs.tooltip"),
                        i = "object" == typeof e && e;
                    if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i)), "string" ==
                            typeof e)) {
                        if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                }))
            }, t.getInstance = function (t) {
                return x(t, "bs.tooltip")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return Ue
                }
            }, {
                key: "NAME",
                get: function () {
                    return qe
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.tooltip"
                }
            }, {
                key: "Event",
                get: function () {
                    return We
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Re
                }
            }]), t
        }(),
        Ye = w();
    if (Ye) {
        var Xe = Ye.fn[qe];
        Ye.fn[qe] = Ve.jQueryInterface, Ye.fn[qe].Constructor = Ve, Ye.fn[qe].noConflict = function () {
            return Ye.fn[qe] = Xe, Ve.jQueryInterface
        }
    }
    var Qe = "popover",
        Ge = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Ke = o(o({}, Ve.Default), {}, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        Ze = o(o({}, Ve.DefaultType), {}, {
            content: "(string|element|function)"
        }),
        $e = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        Je = function (t) {
            var n, i;

            function o() {
                return t.apply(this, arguments) || this
            }
            i = t, (n = o).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var r = o.prototype;
            return r.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, r.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(et.findOne(".popover-header", t), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(et.findOne(
                    ".popover-body", t), e), t.classList.remove("fade", "show")
            }, r._addAttachmentClass = function (t) {
                this.getTipElement().classList.add("bs-popover-" + t)
            }, r._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function () {
                var t = this.getTipElement(),
                    e = t.getAttribute("class").match(Ge);
                null !== e && e.length > 0 && e.map((function (t) {
                    return t.trim()
                })).forEach((function (e) {
                    return t.classList.remove(e)
                }))
            }, o.jQueryInterface = function (t) {
                return this.each((function () {
                    var e = x(this, "bs.popover"),
                        n = "object" == typeof t ? t : null;
                    if ((e || !/dispose|hide/.test(t)) && (e || (e = new o(this, n), C(this,
                            "bs.popover", e)), "string" == typeof t)) {
                        if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                }))
            }, o.getInstance = function (t) {
                return x(t, "bs.popover")
            }, e(o, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return Ke
                }
            }, {
                key: "NAME",
                get: function () {
                    return Qe
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function () {
                    return $e
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Ze
                }
            }]), o
        }(Ve),
        tn = w();
    if (tn) {
        var en = tn.fn[Qe];
        tn.fn[Qe] = Je.jQueryInterface, tn.fn[Qe].Constructor = Je, tn.fn[Qe].noConflict = function () {
            return tn.fn[Qe] = en, Je.jQueryInterface
        }
    }
    var nn = "scrollspy",
        on = {
            offset: 10,
            method: "auto",
            target: ""
        },
        rn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        sn = function () {
            function t(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this
                    ._getConfig(e), this._selector = this._config.target + " .nav-link," + this._config.target +
                    " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [],
                    this._activeTarget = null, this._scrollHeight = 0, W.on(this._scrollElement,
                        "scroll.bs.scrollspy", (function (t) {
                            return n._process(t)
                        })), this.refresh(), this._process(), C(t, "bs.scrollspy", this)
            }
            var n = t.prototype;
            return n.refresh = function () {
                var t = this,
                    e = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                    n = "auto" === this._config.method ? e : this._config.method,
                    i = "position" === n ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), et.find(
                    this._selector).map((function (t) {
                    var e, o = d(t);
                    if (o && (e = et.findOne(o)), e) {
                        var r = e.getBoundingClientRect();
                        if (r.width || r.height) return [tt[n](e).top + i, o]
                    }
                    return null
                })).filter((function (t) {
                    return t
                })).sort((function (t, e) {
                    return t[0] - e[0]
                })).forEach((function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                }))
            }, n.dispose = function () {
                T(this._element, "bs.scrollspy"), W.off(this._scrollElement, ".bs.scrollspy"), this._element =
                    null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets =
                    null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function (t) {
                if ("string" != typeof (t = o(o({}, on), "object" == typeof t && t ? t : {})).target && m(t
                        .target)) {
                    var e = t.target.id;
                    e || (e = c(nn), t.target.id = e), t.target = "#" + e
                }
                return v(nn, t, rn), t
            }, n._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement
                    .scrollTop
            }, n._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement
                    .scrollHeight)
            }, n._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect()
                    .height
            }, n._process = function () {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget =
                        null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 ===
                            this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[
                            o])
                    }
                }
            }, n._activate = function (t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",").map((function (e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    })),
                    n = et.findOne(e.join(","));
                n.classList.contains("dropdown-item") ? (et.findOne(".dropdown-toggle", n.closest(
                    ".dropdown")).classList.add("active"), n.classList.add("active")) : (n.classList.add(
                    "active"), et.parents(n, ".nav, .list-group").forEach((function (t) {
                    et.prev(t, ".nav-link, .list-group-item").forEach((function (t) {
                        return t.classList.add("active")
                    })), et.prev(t, ".nav-item").forEach((function (t) {
                        et.children(t, ".nav-link").forEach((function (t) {
                            return t.classList.add("active")
                        }))
                    }))
                }))), W.trigger(this._scrollElement, "activate.bs.scrollspy", {
                    relatedTarget: t
                })
            }, n._clear = function () {
                et.find(this._selector).filter((function (t) {
                    return t.classList.contains("active")
                })).forEach((function (t) {
                    return t.classList.remove("active")
                }))
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    var n = x(this, "bs.scrollspy");
                    if (n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e) {
                        if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                }))
            }, t.getInstance = function (t) {
                return x(t, "bs.scrollspy")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "Default",
                get: function () {
                    return on
                }
            }]), t
        }();
    W.on(window, "load.bs.scrollspy.data-api", (function () {
        et.find('[data-spy="scroll"]').forEach((function (t) {
            return new sn(t, tt.getDataAttributes(t))
        }))
    }));
    var an = w();
    if (an) {
        var ln = an.fn[nn];
        an.fn[nn] = sn.jQueryInterface, an.fn[nn].Constructor = sn, an.fn[nn].noConflict = function () {
            return an.fn[nn] = ln, sn.jQueryInterface
        }
    }
    var cn = function () {
        function t(t) {
            this._element = t, C(this._element, "bs.tab", this)
        }
        var n = t.prototype;
        return n.show = function () {
            var t = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                    this._element.classList.contains("active") || this._element.classList.contains(
                        "disabled"))) {
                var e, n = f(this._element),
                    i = this._element.closest(".nav, .list-group");
                if (i) {
                    var o = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" :
                        ".active";
                    e = (e = et.find(o, i))[e.length - 1]
                }
                var r = null;
                if (e && (r = W.trigger(e, "hide.bs.tab", {
                        relatedTarget: this._element
                    })), !(W.trigger(this._element, "show.bs.tab", {
                        relatedTarget: e
                    }).defaultPrevented || null !== r && r.defaultPrevented)) {
                    this._activate(this._element, i);
                    var s = function () {
                        W.trigger(e, "hidden.bs.tab", {
                            relatedTarget: t._element
                        }), W.trigger(t._element, "shown.bs.tab", {
                            relatedTarget: e
                        })
                    };
                    n ? this._activate(n, n.parentNode, s) : s()
                }
            }
        }, n.dispose = function () {
            T(this._element, "bs.tab"), this._element = null
        }, n._activate = function (t, e, n) {
            var i = this,
                o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? et.children(e, ".active") : et.find(
                    ":scope > li > .active", e))[0],
                r = n && o && o.classList.contains("fade"),
                s = function () {
                    return i._transitionComplete(t, o, n)
                };
            if (o && r) {
                var a = h(o);
                o.classList.remove("show"), W.one(o, "transitionend", s), g(o, a)
            } else s()
        }, n._transitionComplete = function (t, e, n) {
            if (e) {
                e.classList.remove("active");
                var i = et.findOne(":scope > .dropdown-menu .active", e.parentNode);
                i && i.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute(
                    "aria-selected", !1)
            }(t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute(
                    "aria-selected", !0), y(t), t.classList.contains("fade") && t.classList.add("show"),
                t.parentNode && t.parentNode.classList.contains("dropdown-menu")) && (t.closest(
                ".dropdown") && et.find(".dropdown-toggle").forEach((function (t) {
                return t.classList.add("active")
            })), t.setAttribute("aria-expanded", !0));
            n && n()
        }, t.jQueryInterface = function (e) {
            return this.each((function () {
                var n = x(this, "bs.tab") || new t(this);
                if ("string" == typeof e) {
                    if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                    n[e]()
                }
            }))
        }, t.getInstance = function (t) {
            return x(t, "bs.tab")
        }, e(t, null, [{
            key: "VERSION",
            get: function () {
                return "5.0.0-alpha1"
            }
        }]), t
    }();
    W.on(document, "click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        (function (t) {
            t.preventDefault(), (x(this, "bs.tab") || new cn(this)).show()
        }));
    var un = w();
    if (un) {
        var dn = un.fn.tab;
        un.fn.tab = cn.jQueryInterface, un.fn.tab.Constructor = cn, un.fn.tab.noConflict = function () {
            return un.fn.tab = dn, cn.jQueryInterface
        }
    }
    var fn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        hn = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        pn = function () {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners(),
                    C(t, "bs.toast", this)
            }
            var n = t.prototype;
            return n.show = function () {
                var t = this;
                if (!W.trigger(this._element, "show.bs.toast").defaultPrevented) {
                    this._config.animation && this._element.classList.add("fade");
                    var e = function () {
                        t._element.classList.remove("showing"), t._element.classList.add("show"), W.trigger(
                            t._element, "shown.bs.toast"), t._config.autohide && (t._timeout =
                            setTimeout((function () {
                                t.hide()
                            }), t._config.delay))
                    };
                    if (this._element.classList.remove("hide"), y(this._element), this._element.classList.add(
                            "showing"), this._config.animation) {
                        var n = h(this._element);
                        W.one(this._element, "transitionend", e), g(this._element, n)
                    } else e()
                }
            }, n.hide = function () {
                var t = this;
                if (this._element.classList.contains("show") && !W.trigger(this._element, "hide.bs.toast").defaultPrevented) {
                    var e = function () {
                        t._element.classList.add("hide"), W.trigger(t._element, "hidden.bs.toast")
                    };
                    if (this._element.classList.remove("show"), this._config.animation) {
                        var n = h(this._element);
                        W.one(this._element, "transitionend", e), g(this._element, n)
                    } else e()
                }
            }, n.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains("show") &&
                    this._element.classList.remove("show"), W.off(this._element, "click.dismiss.bs.toast"),
                    T(this._element, "bs.toast"), this._element = null, this._config = null
            }, n._getConfig = function (t) {
                return t = o(o(o({}, hn), tt.getDataAttributes(this._element)), "object" == typeof t && t ?
                    t : {}), v("toast", t, this.constructor.DefaultType), t
            }, n._setListeners = function () {
                var t = this;
                W.on(this._element, "click.dismiss.bs.toast", '[data-dismiss="toast"]', (function () {
                    return t.hide()
                }))
            }, t.jQueryInterface = function (e) {
                return this.each((function () {
                    var n = x(this, "bs.toast");
                    if (n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e) {
                        if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e](this)
                    }
                }))
            }, t.getInstance = function (t) {
                return x(t, "bs.toast")
            }, e(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.0.0-alpha1"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return fn
                }
            }, {
                key: "Default",
                get: function () {
                    return hn
                }
            }]), t
        }(),
        mn = w();
    if (mn) {
        var gn = mn.fn.toast;
        mn.fn.toast = pn.jQueryInterface, mn.fn.toast.Constructor = pn, mn.fn.toast.noConflict = function () {
            return mn.fn.toast = gn, pn.jQueryInterface
        }
    }
    return {
        Alert: Y,
        Button: G,
        Carousel: at,
        Collapse: ht,
        Dropdown: Te,
        Modal: Oe,
        Popover: Je,
        ScrollSpy: sn,
        Tab: cn,
        Toast: pn,
        Tooltip: Ve
    }
})),
/*!
 * headroom.js v0.11.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&
        define.amd ? define(e) : (t = t || self).Headroom = e()
}(this, (function () {
    "use strict";

    function t() {
        return "undefined" != typeof window
    }

    function e(t) {
        return (r = t) && r.document && function (t) {
            return 9 === t.nodeType
        }(r.document) ? (n = (e = t).document, i = n.body, o = n.documentElement, {
            scrollHeight: function () {
                return Math.max(i.scrollHeight, o.scrollHeight, i.offsetHeight, o.offsetHeight, i.clientHeight,
                    o.clientHeight)
            },
            height: function () {
                return e.innerHeight || o.clientHeight || i.clientHeight
            },
            scrollY: function () {
                return void 0 !== e.pageYOffset ? e.pageYOffset : (o || i.parentNode || i).scrollTop
            }
        }) : function (t) {
            return {
                scrollHeight: function () {
                    return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
                },
                height: function () {
                    return Math.max(t.offsetHeight, t.clientHeight)
                },
                scrollY: function () {
                    return t.scrollTop
                }
            }
        }(t);
        var e, n, i, o, r
    }

    function n(t, n, i) {
        var o, r = function () {
                var t = !1;
                try {
                    var e = {
                        get passive() {
                            t = !0
                        }
                    };
                    window.addEventListener("test", e, e), window.removeEventListener("test", e, e)
                } catch (e) {
                    t = !1
                }
                return t
            }(),
            s = !1,
            a = e(t),
            l = a.scrollY(),
            c = {};

        function u() {
            var t = Math.round(a.scrollY()),
                e = a.height(),
                o = a.scrollHeight();
            c.scrollY = t, c.lastScrollY = l, c.direction = t > l ? "down" : "up", c.distance = Math.abs(t - l),
                c.isOutOfBounds = t < 0 || t + e > o, c.top = t <= n.offset, c.bottom = t + e >= o, c.toleranceExceeded =
                c.distance > n.tolerance[c.direction], i(c), l = t, s = !1
        }

        function d() {
            s || (s = !0, o = requestAnimationFrame(u))
        }
        var f = !!r && {
            passive: !0,
            capture: !1
        };
        return t.addEventListener("scroll", d, f), u(), {
            destroy: function () {
                cancelAnimationFrame(o), t.removeEventListener("scroll", d, f)
            }
        }
    }

    function i(t, e) {
        var n;
        e = e || {}, Object.assign(this, i.options, e), this.classes = Object.assign({}, i.options.classes, e.classes),
            this.elem = t, this.tolerance = (n = this.tolerance) === Object(n) ? n : {
                down: n,
                up: n
            }, this.initialised = !1, this.frozen = !1
    }
    return i.prototype = {
        constructor: i,
        init: function () {
            return i.cutsTheMustard && !this.initialised && (this.addClass("initial"), this.initialised = !
                0, setTimeout((function (t) {
                    t.scrollTracker = n(t.scroller, {
                        offset: t.offset,
                        tolerance: t.tolerance
                    }, t.update.bind(t))
                }), 100, this)), this
        },
        destroy: function () {
            this.initialised = !1, Object.keys(this.classes).forEach(this.removeClass, this), this.scrollTracker
                .destroy()
        },
        unpin: function () {
            !this.hasClass("pinned") && this.hasClass("unpinned") || (this.addClass("unpinned"), this.removeClass(
                "pinned"), this.onUnpin && this.onUnpin.call(this))
        },
        pin: function () {
            this.hasClass("unpinned") && (this.addClass("pinned"), this.removeClass("unpinned"), this.onPin &&
                this.onPin.call(this))
        },
        freeze: function () {
            this.frozen = !0, this.addClass("frozen")
        },
        unfreeze: function () {
            this.frozen = !1, this.removeClass("frozen")
        },
        top: function () {
            this.hasClass("top") || (this.addClass("top"), this.removeClass("notTop"), this.onTop &&
                this.onTop.call(this))
        },
        notTop: function () {
            this.hasClass("notTop") || (this.addClass("notTop"), this.removeClass("top"), this.onNotTop &&
                this.onNotTop.call(this))
        },
        bottom: function () {
            this.hasClass("bottom") || (this.addClass("bottom"), this.removeClass("notBottom"), this.onBottom &&
                this.onBottom.call(this))
        },
        notBottom: function () {
            this.hasClass("notBottom") || (this.addClass("notBottom"), this.removeClass("bottom"), this
                .onNotBottom && this.onNotBottom.call(this))
        },
        shouldUnpin: function (t) {
            return "down" === t.direction && !t.top && t.toleranceExceeded
        },
        shouldPin: function (t) {
            return "up" === t.direction && t.toleranceExceeded || t.top
        },
        addClass: function (t) {
            this.elem.classList.add.apply(this.elem.classList, this.classes[t].split(" "))
        },
        removeClass: function (t) {
            this.elem.classList.remove.apply(this.elem.classList, this.classes[t].split(" "))
        },
        hasClass: function (t) {
            return this.classes[t].split(" ").every((function (t) {
                return this.classList.contains(t)
            }), this.elem)
        },
        update: function (t) {
            t.isOutOfBounds || !0 !== this.frozen && (t.top ? this.top() : this.notTop(), t.bottom ?
                this.bottom() : this.notBottom(), this.shouldUnpin(t) ? this.unpin() : this.shouldPin(
                    t) && this.pin())
        }
    }, i.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: t() ? window : null,
        classes: {
            frozen: "headroom--frozen",
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    }, i.cutsTheMustard = !!(t() && function () {}.bind && "classList" in document.documentElement &&
        Object.assign && Object.keys && requestAnimationFrame), i
})),
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&
        define.amd ? define(e) : (t = t || self, function () {
            var n = t.Cookies,
                i = t.Cookies = e();
            i.noConflict = function () {
                return t.Cookies = n, i
            }
        }())
}(this, (function () {
    "use strict";

    function t(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) t[i] = n[i]
        }
        return t
    }
    var e = {
        read: function (t) {
            return t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        },
        write: function (t) {
            return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                decodeURIComponent)
        }
    };
    return function n(i, o) {
        function r(e, n, r) {
            if ("undefined" != typeof document) {
                "number" == typeof (r = t({}, o, r)).expires && (r.expires = new Date(Date.now() + 864e5 *
                        r.expires)), r.expires && (r.expires = r.expires.toUTCString()), e =
                    encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(
                        /[()]/g, escape), n = i.write(n, e);
                var s = "";
                for (var a in r) r[a] && (s += "; " + a, !0 !== r[a] && (s += "=" + r[a].split(";")[0]));
                return document.cookie = e + "=" + n + s
            }
        }
        return Object.create({
            set: r,
            get: function (t) {
                if ("undefined" != typeof document && (!arguments.length || t)) {
                    for (var n = document.cookie ? document.cookie.split("; ") : [], o = {}, r =
                            0; r < n.length; r++) {
                        var s = n[r].split("="),
                            a = s.slice(1).join("=");
                        '"' === a[0] && (a = a.slice(1, -1));
                        try {
                            var l = e.read(s[0]);
                            if (o[l] = i.read(a, l), t === l) break
                        } catch (t) {}
                    }
                    return t ? o[t] : o
                }
            },
            remove: function (e, n) {
                r(e, "", t({}, n, {
                    expires: -1
                }))
            },
            withAttributes: function (e) {
                return n(this.converter, t({}, this.attributes, e))
            },
            withConverter: function (e) {
                return n(t({}, this.converter, e), this.attributes)
            }
        }, {
            attributes: {
                value: Object.freeze(o)
            },
            converter: {
                value: Object.freeze(i)
            }
        })
    }(e, {
        path: "/"
    })
})),
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&
        define.amd ? define(e) : (t = t || self).LazyLoad = e()
}(this, (function () {
    "use strict";

    function t() {
        return (t = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }).apply(this, arguments)
    }
    var e = "undefined" != typeof window,
        n = e && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(
            navigator.userAgent),
        i = e && "IntersectionObserver" in window,
        o = e && "classList" in document.createElement("p"),
        r = e && window.devicePixelRatio > 1,
        s = {
            elements_selector: ".lazy",
            container: n || e ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            data_bg_hidpi: "bg-hidpi",
            data_bg_multi: "bg-multi",
            data_bg_multi_hidpi: "bg-multi-hidpi",
            data_poster: "poster",
            class_applied: "applied",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            unobserve_completed: !0,
            unobserve_entered: !1,
            cancel_on_exit: !0,
            callback_enter: null,
            callback_exit: null,
            callback_applied: null,
            callback_loading: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            callback_cancel: null,
            use_native: !1
        },
        a = function (e) {
            return t({}, s, e)
        },
        l = function (t, e) {
            var n, i = new t(e);
            try {
                n = new CustomEvent("LazyLoad::Initialized", {
                    detail: {
                        instance: i
                    }
                })
            } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, {
                    instance: i
                })
            }
            window.dispatchEvent(n)
        },
        c = function (t, e) {
            return t.getAttribute("data-" + e)
        },
        u = function (t, e, n) {
            var i = "data-" + e;
            null !== n ? t.setAttribute(i, n) : t.removeAttribute(i)
        },
        d = function (t) {
            return c(t, "ll-status")
        },
        f = function (t, e) {
            return u(t, "ll-status", e)
        },
        h = function (t) {
            return f(t, null)
        },
        p = function (t) {
            return null === d(t)
        },
        m = function (t) {
            return "native" === d(t)
        },
        g = ["loading", "loaded", "applied", "error"],
        v = function (t, e, n, i) {
            t && (void 0 === i ? void 0 === n ? t(e) : t(e, n) : t(e, n, i))
        },
        b = function (t, e) {
            o ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
        },
        _ = function (t, e) {
            o ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e +
                "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
        },
        y = function (t) {
            return t.llTempImage
        },
        w = function (t, e) {
            if (e) {
                var n = e._observer;
                n && n.unobserve(t)
            }
        },
        E = function (t, e) {
            t && (t.loadingCount += e)
        },
        C = function (t, e) {
            t && (t.toLoadCount = e)
        },
        x = function (t) {
            for (var e, n = [], i = 0; e = t.children[i]; i += 1) "SOURCE" === e.tagName && n.push(e);
            return n
        },
        T = function (t, e, n) {
            n && t.setAttribute(e, n)
        },
        S = function (t, e) {
            t.removeAttribute(e)
        },
        L = function (t) {
            return !!t.llOriginalAttrs
        },
        k = function (t) {
            if (!L(t)) {
                var e = {};
                e.src = t.getAttribute("src"), e.srcset = t.getAttribute("srcset"), e.sizes = t.getAttribute(
                    "sizes"), t.llOriginalAttrs = e
            }
        },
        A = function (t) {
            if (L(t)) {
                var e = t.llOriginalAttrs;
                T(t, "src", e.src), T(t, "srcset", e.srcset), T(t, "sizes", e.sizes)
            }
        },
        O = function (t, e) {
            T(t, "sizes", c(t, e.data_sizes)), T(t, "srcset", c(t, e.data_srcset)), T(t, "src", c(t, e.data_src))
        },
        N = function (t) {
            S(t, "src"), S(t, "srcset"), S(t, "sizes")
        },
        D = function (t, e) {
            var n = t.parentNode;
            n && "PICTURE" === n.tagName && x(n).forEach(e)
        },
        j = function (t, e) {
            x(t).forEach(e)
        },
        I = {
            IMG: function (t, e) {
                D(t, (function (t) {
                    k(t), O(t, e)
                })), k(t), O(t, e)
            },
            IFRAME: function (t, e) {
                T(t, "src", c(t, e.data_src))
            },
            VIDEO: function (t, e) {
                j(t, (function (t) {
                    T(t, "src", c(t, e.data_src))
                })), T(t, "poster", c(t, e.data_poster)), T(t, "src", c(t, e.data_src)), t.load()
            }
        },
        M = function (t, e) {
            var n = I[t.tagName];
            n && n(t, e)
        },
        P = function (t, e, n) {
            b(t, e.class_applied), f(t, "applied"), B(t, e), e.unobserve_completed && w(t, e), v(e.callback_applied,
                t, n)
        },
        H = function (t, e, n) {
            E(n, 1), b(t, e.class_loading), f(t, "loading"), v(e.callback_loading, t, n)
        },
        q = {
            IMG: function (t, e) {
                u(t, e.data_src, null), u(t, e.data_srcset, null), u(t, e.data_sizes, null), D(t, (function (
                    t) {
                    u(t, e.data_srcset, null), u(t, e.data_sizes, null)
                }))
            },
            IFRAME: function (t, e) {
                u(t, e.data_src, null)
            },
            VIDEO: function (t, e) {
                u(t, e.data_src, null), u(t, e.data_poster, null), j(t, (function (t) {
                    u(t, e.data_src, null)
                }))
            }
        },
        B = function (t, e) {
            u(t, e.data_bg_multi, null), u(t, e.data_bg_multi_hidpi, null)
        },
        z = function (t, e) {
            var n = q[t.tagName];
            n ? n(t, e) : function (t, e) {
                u(t, e.data_bg, null), u(t, e.data_bg_hidpi, null)
            }(t, e)
        },
        R = ["IMG", "IFRAME", "VIDEO"],
        F = function (t, e) {
            !e || function (t) {
                return t.loadingCount > 0
            }(e) || function (t) {
                return t.toLoadCount > 0
            }(e) || v(t.callback_finish, e)
        },
        U = function (t, e, n) {
            t.addEventListener(e, n), t.llEvLisnrs[e] = n
        },
        W = function (t, e, n) {
            t.removeEventListener(e, n)
        },
        V = function (t) {
            return !!t.llEvLisnrs
        },
        Y = function (t) {
            if (V(t)) {
                var e = t.llEvLisnrs;
                for (var n in e) {
                    var i = e[n];
                    W(t, n, i)
                }
                delete t.llEvLisnrs
            }
        },
        X = function (t, e, n) {
            ! function (t) {
                delete t.llTempImage
            }(t), E(n, -1),
                function (t) {
                    t && (t.toLoadCount -= 1)
                }(n), _(t, e.class_loading), e.unobserve_completed && w(t, n)
        },
        Q = function (t, e, n) {
            var i = y(t) || t;
            if (!V(i)) {
                ! function (t, e, n) {
                    V(t) || (t.llEvLisnrs = {});
                    var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                    U(t, i, e), U(t, "error", n)
                }(i, (function (o) {
                    ! function (t, e, n, i) {
                        var o = m(e);
                        X(e, n, i), b(e, n.class_loaded), f(e, "loaded"), z(e, n), v(n.callback_loaded,
                            e, i), o || F(n, i)
                    }(0, t, e, n), Y(i)
                }), (function (o) {
                    ! function (t, e, n, i) {
                        var o = m(e);
                        X(e, n, i), b(e, n.class_error), f(e, "error"), v(n.callback_error, e, i), o ||
                            F(n, i)
                    }(0, t, e, n), Y(i)
                }))
            }
        },
        G = function (t, e, n) {
            ! function (t) {
                t.llTempImage = document.createElement("IMG")
            }(t), Q(t, e, n),
                function (t, e, n) {
                    var i = c(t, e.data_bg),
                        o = c(t, e.data_bg_hidpi),
                        s = r && o ? o : i;
                    s && (t.style.backgroundImage = 'url("'.concat(s, '")'), y(t).setAttribute("src", s), H(t,
                        e, n))
                }(t, e, n),
                function (t, e, n) {
                    var i = c(t, e.data_bg_multi),
                        o = c(t, e.data_bg_multi_hidpi),
                        s = r && o ? o : i;
                    s && (t.style.backgroundImage = s, P(t, e, n))
                }(t, e, n)
        },
        K = function (t, e, n) {
            ! function (t) {
                return R.indexOf(t.tagName) > -1
            }(t) ? G(t, e, n): function (t, e, n) {
                Q(t, e, n), M(t, e), H(t, e, n)
            }(t, e, n)
        },
        Z = function (t, e, n, i) {
            n.cancel_on_exit && function (t) {
                return "loading" === d(t)
            }(t) && "IMG" === t.tagName && (Y(t), function (t) {
                D(t, (function (t) {
                    N(t)
                })), N(t)
            }(t), function (t) {
                D(t, (function (t) {
                    A(t)
                })), A(t)
            }(t), _(t, n.class_loading), E(i, -1), h(t), v(n.callback_cancel, t, e, i))
        },
        $ = function (t, e, n, i) {
            f(t, "entered"),
                function (t, e, n) {
                    e.unobserve_entered && w(t, n)
                }(t, n, i), v(n.callback_enter, t, e, i),
                function (t) {
                    return g.indexOf(d(t)) >= 0
                }(t) || K(t, n, i)
        },
        J = ["IMG", "IFRAME"],
        tt = function (t) {
            return t.use_native && "loading" in HTMLImageElement.prototype
        },
        et = function (t, e, n) {
            t.forEach((function (t) {
                -1 !== J.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function (t, e,
                    n) {
                    Q(t, e, n), M(t, e), z(t, e), f(t, "native")
                }(t, e, n))
            })), C(n, 0)
        },
        nt = function (t, e, n) {
            t.forEach((function (t) {
                return function (t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                }(t) ? $(t.target, t, e, n) : function (t, e, n, i) {
                    p(t) || (Z(t, e, n, i), v(n.callback_exit, t, e, i))
                }(t.target, t, e, n)
            }))
        },
        it = function (t, e) {
            i && !tt(t) && (e._observer = new IntersectionObserver((function (n) {
                nt(n, t, e)
            }), function (t) {
                return {
                    root: t.container === document ? null : t.container,
                    rootMargin: t.thresholds || t.threshold + "px"
                }
            }(t)))
        },
        ot = function (t) {
            return Array.prototype.slice.call(t)
        },
        rt = function (t) {
            return t.container.querySelectorAll(t.elements_selector)
        },
        st = function (t) {
            return function (t) {
                return "error" === d(t)
            }(t)
        },
        at = function (t, e) {
            return function (t) {
                return ot(t).filter(p)
            }(t || rt(e))
        },
        lt = function (t, e) {
            var n;
            (n = rt(t), ot(n).filter(st)).forEach((function (e) {
                _(e, t.class_error), h(e)
            })), e.update()
        },
        ct = function (t, n) {
            var i = a(t);
            this._settings = i, this.loadingCount = 0, it(i, this),
                function (t, n) {
                    e && window.addEventListener("online", (function () {
                        lt(t, n)
                    }))
                }(i, this), this.update(n)
        };
    return ct.prototype = {
        update: function (t) {
            var e, o, r = this._settings,
                s = at(t, r);
            (C(this, s.length), !n && i) ? tt(r) ? et(s, r, this) : (e = this._observer, o = s,
                function (t) {
                    t.disconnect()
                }(e),
                function (t, e) {
                    e.forEach((function (e) {
                        t.observe(e)
                    }))
                }(e, o)): this.loadAll(s)
        },
        destroy: function () {
            this._observer && this._observer.disconnect(), rt(this._settings).forEach((function (t) {
                    delete t.llOriginalAttrs
                })), delete this._observer, delete this._settings, delete this.loadingCount, delete this
                .toLoadCount
        },
        loadAll: function (t) {
            var e = this,
                n = this._settings;
            at(t, n).forEach((function (t) {
                w(t, e), K(t, n, e)
            }))
        }
    }, ct.load = function (t, e) {
        var n = a(e);
        K(t, n)
    }, ct.resetStatus = function (t) {
        h(t)
    }, e && function (t, e) {
        if (e)
            if (e.length)
                for (var n, i = 0; n = e[i]; i += 1) l(t, n);
            else l(t, e)
    }(ct, window.lazyLoadOptions), ct
})),
function (t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.NProgress =
        e()
}(this, (function () {
    var t, e, n = {
            version: "0.2.0"
        },
        i = n.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };

    function o(t, e, n) {
        return t < e ? e : t > n ? n : t
    }

    function r(t) {
        return 100 * (-1 + t)
    }
    n.configure = function (t) {
        var e, n;
        for (e in t) void 0 !== (n = t[e]) && t.hasOwnProperty(e) && (i[e] = n);
        return this
    }, n.status = null, n.set = function (t) {
        var e = n.isStarted();
        t = o(t, i.minimum, 1), n.status = 1 === t ? null : t;
        var l = n.render(!e),
            c = l.querySelector(i.barSelector),
            u = i.speed,
            d = i.easing;
        return l.offsetWidth, s((function (e) {
            "" === i.positionUsing && (i.positionUsing = n.getPositioningCSS()), a(c, function (
                t, e, n) {
                var o;
                o = "translate3d" === i.positionUsing ? {
                    transform: "translate3d(" + r(t) + "%,0,0)"
                } : "translate" === i.positionUsing ? {
                    transform: "translate(" + r(t) + "%,0)"
                } : {
                    "margin-left": r(t) + "%"
                };
                return o.transition = "all " + e + "ms " + n, o
            }(t, u, d)), 1 === t ? (a(l, {
                transition: "none",
                opacity: 1
            }), l.offsetWidth, setTimeout((function () {
                a(l, {
                    transition: "all " + u + "ms linear",
                    opacity: 0
                }), setTimeout((function () {
                    n.remove(), e()
                }), u)
            }), u)) : setTimeout(e, u)
        })), this
    }, n.isStarted = function () {
        return "number" == typeof n.status
    }, n.start = function () {
        n.status || n.set(0);
        var t = function () {
            setTimeout((function () {
                n.status && (n.trickle(), t())
            }), i.trickleSpeed)
        };
        return i.trickle && t(), this
    }, n.done = function (t) {
        return t || n.status ? n.inc(.3 + .5 * Math.random()).set(1) : this
    }, n.inc = function (t) {
        var e = n.status;
        return e ? ("number" != typeof t && (t = (1 - e) * o(Math.random() * e, .1, .95)), e = o(e + t, 0,
            .994), n.set(e)) : n.start()
    }, n.trickle = function () {
        return n.inc(Math.random() * i.trickleRate)
    }, t = 0, e = 0, n.promise = function (i) {
        return i && "resolved" !== i.state() ? (0 === e && n.start(), t++, e++, i.always((function () {
            0 == --e ? (t = 0, n.done()) : n.set((t - e) / t)
        })), this) : this
    }, n.render = function (t) {
        if (n.isRendered()) return document.getElementById("nprogress");
        c(document.documentElement, "nprogress-busy");
        var e = document.createElement("div");
        e.id = "nprogress", e.innerHTML = i.template;
        var o, s = e.querySelector(i.barSelector),
            l = t ? "-100" : r(n.status || 0),
            u = document.querySelector(i.parent);
        return a(s, {
            transition: "all 0 linear",
            transform: "translate3d(" + l + "%,0,0)"
        }), i.showSpinner || (o = e.querySelector(i.spinnerSelector)) && f(o), u != document.body && c(
            u, "nprogress-custom-parent"), u.appendChild(e), e
    }, n.remove = function () {
        u(document.documentElement, "nprogress-busy"), u(document.querySelector(i.parent),
            "nprogress-custom-parent");
        var t = document.getElementById("nprogress");
        t && f(t)
    }, n.isRendered = function () {
        return !!document.getElementById("nprogress")
    }, n.getPositioningCSS = function () {
        var t = document.body.style,
            e = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" :
            "OTransform" in t ? "O" : "";
        return e + "Perspective" in t ? "translate3d" : e + "Transform" in t ? "translate" : "margin"
    };
    var s = function () {
            var t = [];

            function e() {
                var n = t.shift();
                n && n(e)
            }
            return function (n) {
                t.push(n), 1 == t.length && e()
            }
        }(),
        a = function () {
            var t = ["Webkit", "O", "Moz", "ms"],
                e = {};

            function n(n) {
                return n = n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, (function (t, e) {
                    return e.toUpperCase()
                })), e[n] || (e[n] = function (e) {
                    var n = document.body.style;
                    if (e in n) return e;
                    for (var i, o = t.length, r = e.charAt(0).toUpperCase() + e.slice(1); o--;)
                        if ((i = t[o] + r) in n) return i;
                    return e
                }(n))
            }

            function i(t, e, i) {
                e = n(e), t.style[e] = i
            }
            return function (t, e) {
                var n, o, r = arguments;
                if (2 == r.length)
                    for (n in e) void 0 !== (o = e[n]) && e.hasOwnProperty(n) && i(t, n, o);
                else i(t, r[1], r[2])
            }
        }();

    function l(t, e) {
        return ("string" == typeof t ? t : d(t)).indexOf(" " + e + " ") >= 0
    }

    function c(t, e) {
        var n = d(t),
            i = n + e;
        l(n, e) || (t.className = i.substring(1))
    }

    function u(t, e) {
        var n, i = d(t);
        l(t, e) && (n = i.replace(" " + e + " ", " "), t.className = n.substring(1, n.length - 1))
    }

    function d(t) {
        return (" " + (t.className || "") + " ").replace(/\s+/gi, " ")
    }

    function f(t) {
        t && t.parentNode && t.parentNode.removeChild(t)
    }
    return n
})),
/*!
 * Toastify js 1.9.1
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
function (t, e) {
    "object" == typeof module && module.exports ? module.exports = e() : t.Toastify = e()
}(this, (function (t) {
    var e = function (t) {
        return new e.lib.init(t)
    };

    function n(t, e) {
        return e.offset[t] ? isNaN(e.offset[t]) ? e.offset[t] : e.offset[t] + "px" : "0px"
    }

    function i(t, e) {
        return !(!t || "string" != typeof e) && !!(t.className && t.className.trim().split(/\s+/gi).indexOf(e) >
            -1)
    }
    return e.lib = e.prototype = {
        toastify: "1.9.1",
        constructor: e,
        init: function (t) {
            t || (t = {}), this.options = {}, this.toastElement = null, this.options.text = t.text ||
                "Hi there!", this.options.node = t.node, this.options.duration = 0 === t.duration ? 0 :
                t.duration || 3e3, this.options.selector = t.selector, this.options.callback = t.callback ||
                function () {}, this.options.destination = t.destination, this.options.newWindow = t.newWindow ||
                !1, this.options.close = t.close || !1, this.options.gravity = "bottom" === t.gravity ?
                "toastify-bottom" : "toastify-top", this.options.positionLeft = t.positionLeft || !1,
                this.options.position = t.position || "", this.options.backgroundColor = t.backgroundColor,
                this.options.avatar = t.avatar || "", this.options.className = t.className || "", this.options
                .stopOnFocus = void 0 === t.stopOnFocus || t.stopOnFocus, this.options.onClick = t.onClick;
            return this.options.offset = t.offset || {
                x: 0,
                y: 0
            }, this
        },
        buildToast: function () {
            if (!this.options) throw "Toastify is not initialized";
            var t = document.createElement("div");
            if (t.className = "toastify on " + this.options.className, this.options.position ? t.className +=
                " toastify-" + this.options.position : !0 === this.options.positionLeft ? (t.className +=
                    " toastify-left", console.warn(
                        "Property `positionLeft` will be depreciated in further versions. Please use `position` instead."
                    )) : t.className += " toastify-right", t.className += " " + this.options.gravity,
                this.options.backgroundColor && (t.style.background = this.options.backgroundColor),
                this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) t.appendChild(
                this.options.node);
            else if (t.innerHTML = this.options.text, "" !== this.options.avatar) {
                var e = document.createElement("img");
                e.src = this.options.avatar, e.className = "toastify-avatar", "left" == this.options.position ||
                    !0 === this.options.positionLeft ? t.appendChild(e) : t.insertAdjacentElement(
                        "afterbegin", e)
            }
            if (!0 === this.options.close) {
                var i = document.createElement("span");
                i.innerHTML = "&#10006;", i.className = "toast-close", i.addEventListener("click",
                    function (t) {
                        t.stopPropagation(), this.removeElement(this.toastElement), window.clearTimeout(
                            this.toastElement.timeOutValue)
                    }.bind(this));
                var o = window.innerWidth > 0 ? window.innerWidth : screen.width;
                ("left" == this.options.position || !0 === this.options.positionLeft) && o > 360 ? t.insertAdjacentElement(
                    "afterbegin", i) : t.appendChild(i)
            }
            if (this.options.stopOnFocus && this.options.duration > 0) {
                const e = this;
                t.addEventListener("mouseover", (function (e) {
                    window.clearTimeout(t.timeOutValue)
                })), t.addEventListener("mouseleave", (function () {
                    t.timeOutValue = window.setTimeout((function () {
                        e.removeElement(t)
                    }), e.options.duration)
                }))
            }
            if (void 0 !== this.options.destination && t.addEventListener("click", function (t) {
                    t.stopPropagation(), !0 === this.options.newWindow ? window.open(this.options.destination,
                        "_blank") : window.location = this.options.destination
                }.bind(this)), "function" == typeof this.options.onClick && void 0 === this.options.destination &&
                t.addEventListener("click", function (t) {
                    t.stopPropagation(), this.options.onClick()
                }.bind(this)), "object" == typeof this.options.offset) {
                var r = n("x", this.options),
                    s = n("y", this.options);
                const e = "left" == this.options.position ? r : "-" + r,
                    i = "toastify-top" == this.options.gravity ? s : "-" + s;
                t.style.transform = `translate(${e}, ${i})`
            }
            return t
        },
        showToast: function () {
            var t;
            if (this.toastElement = this.buildToast(), !(t = void 0 === this.options.selector ?
                    document.body : document.getElementById(this.options.selector))) throw "Root element is not defined";
            return t.insertBefore(this.toastElement, t.firstChild), e.reposition(), this.options.duration >
                0 && (this.toastElement.timeOutValue = window.setTimeout(function () {
                    this.removeElement(this.toastElement)
                }.bind(this), this.options.duration)), this
        },
        hideToast: function () {
            this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(
                this.toastElement)
        },
        removeElement: function (t) {
            t.className = t.className.replace(" on", ""), window.setTimeout(function () {
                this.options.node && this.options.node.parentNode && this.options.node.parentNode
                    .removeChild(this.options.node), t.parentNode && t.parentNode.removeChild(t),
                    this.options.callback.call(t), e.reposition()
            }.bind(this), 400)
        }
    }, e.reposition = function () {
        for (var t, e = {
                top: 15,
                bottom: 15
            }, n = {
                top: 15,
                bottom: 15
            }, o = {
                top: 15,
                bottom: 15
            }, r = document.getElementsByClassName("toastify"), s = 0; s < r.length; s++) {
            t = !0 === i(r[s], "toastify-top") ? "toastify-top" : "toastify-bottom";
            var a = r[s].offsetHeight;
            t = t.substr(9, t.length - 1);
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360 ? (r[s].style[t] = o[t] +
                "px", o[t] += a + 15) : !0 === i(r[s], "toastify-left") ? (r[s].style[t] = e[t] + "px",
                e[t] += a + 15) : (r[s].style[t] = n[t] + "px", n[t] += a + 15)
        }
        return this
    }, e.lib.init.prototype = e.lib, e
})),
function (t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var o = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = t, n.c = e, n.d = function (t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(i, o, function (e) {
                return t[e]
            }.bind(null, o));
        return i
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
    (function (i) {
        var o, r, s;
        ! function (i, a) {
            r = [], o = function (t) {
                "use strict";
                var e, i, o, r = n(2),
                    s = {},
                    a = {},
                    l = n(3),
                    c = n(4),
                    u = n(5),
                    d = !!(t && t.document && t.document.querySelector && t.addEventListener);
                if ("undefined" != typeof window || d) {
                    var f = Object.prototype.hasOwnProperty;
                    return a.destroy = function () {
                        if (!s.skipRendering) try {
                            document.querySelector(s.tocSelector).innerHTML = ""
                        } catch (t) {
                            console.warn("Element not found: " + s.tocSelector)
                        }
                        s.scrollContainer && document.querySelector(s.scrollContainer) ? (document.querySelector(
                            s.scrollContainer).removeEventListener("scroll", this._scrollListener,
                            !1), document.querySelector(s.scrollContainer).removeEventListener(
                            "resize", this._scrollListener, !1), e && document.querySelector(
                            s.scrollContainer).removeEventListener("click", this._clickListener,
                            !1)) : (document.removeEventListener("scroll", this._scrollListener,
                            !1), document.removeEventListener("resize", this._scrollListener,
                            !1), e && document.removeEventListener("click", this._clickListener,
                            !1))
                    }, a.init = function (t) {
                        if (d && (s = function () {
                                    for (var t = {}, e = 0; e < arguments.length; e++) {
                                        var n = arguments[e];
                                        for (var i in n) f.call(n, i) && (t[i] = n[i])
                                    }
                                    return t
                                }(r, t || {}), this.options = s, this.state = {}, s.scrollSmooth &&
                                (s.duration = s.scrollSmoothDuration, s.offset = s.scrollSmoothOffset,
                                    a.scrollSmooth = n(6).initSmoothScrolling(s)), e = l(s), i = c(
                                    s), this._buildHtml = e, this._parseContent = i, a.destroy(),
                                null !== (o = i.selectHeadings(s.contentSelector, s.headingSelector))
                            )) {
                            var p = i.nestHeadingsArray(o).nest;
                            s.skipRendering || e.render(s.tocSelector, p), this._scrollListener = h(
                                    (function (t) {
                                        e.updateToc(o), !s.disableTocScrollSync && u(s);
                                        var n = t && t.target && t.target.scrollingElement && 0 ===
                                            t.target.scrollingElement.scrollTop;
                                        (t && (0 === t.eventPhase || null === t.currentTarget) ||
                                            n) && (e.updateToc(o), s.scrollEndCallback && s.scrollEndCallback(
                                            t))
                                    }), s.throttleTimeout), this._scrollListener(), s.scrollContainer &&
                                document.querySelector(s.scrollContainer) ? (document.querySelector(
                                    s.scrollContainer).addEventListener("scroll", this._scrollListener,
                                    !1), document.querySelector(s.scrollContainer).addEventListener(
                                    "resize", this._scrollListener, !1)) : (document.addEventListener(
                                    "scroll", this._scrollListener, !1), document.addEventListener(
                                    "resize", this._scrollListener, !1));
                            var m = null;
                            return this._clickListener = h((function (t) {
                                s.scrollSmooth && e.disableTocAnimation(t), e.updateToc(
                                    o), m && clearTimeout(m), m = setTimeout((
                                    function () {
                                        e.enableTocAnimation()
                                    }), s.scrollSmoothDuration)
                            }), s.throttleTimeout), s.scrollContainer && document.querySelector(
                                s.scrollContainer) ? document.querySelector(s.scrollContainer).addEventListener(
                                "click", this._clickListener, !1) : document.addEventListener(
                                "click", this._clickListener, !1), this
                        }
                    }, a.refresh = function (t) {
                        a.destroy(), a.init(t || this.options)
                    }, t.tocbot = a, a
                }

                function h(t, e, n) {
                    var i, o;
                    return e || (e = 250),
                        function () {
                            var r = n || this,
                                s = +new Date,
                                a = arguments;
                            i && s < i + e ? (clearTimeout(o), o = setTimeout((function () {
                                i = s, t.apply(r, a)
                            }), e)) : (i = s, t.apply(r, a))
                        }
                }
            }(i), void 0 === (s = "function" == typeof o ? o.apply(e, r) : o) || (t.exports = s)
        }(void 0 !== i ? i : this.window || this.global)
    }).call(this, n(1))
}, function (t, e) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function (t, e) {
    t.exports = {
        tocSelector: ".js-toc",
        contentSelector: ".js-toc-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: ".js-toc-ignore",
        hasInnerContainers: !1,
        linkClass: "toc-link",
        extraLinkClasses: "",
        activeLinkClass: "is-active-link",
        listClass: "toc-list",
        extraListClasses: "",
        isCollapsedClass: "is-collapsed",
        collapsibleClass: "is-collapsible",
        listItemClass: "toc-list-item",
        activeListItemClass: "is-active-li",
        collapseDepth: 0,
        scrollSmooth: !0,
        scrollSmoothDuration: 420,
        scrollSmoothOffset: 0,
        scrollEndCallback: function (t) {},
        headingsOffset: 1,
        throttleTimeout: 50,
        positionFixedSelector: null,
        positionFixedClass: "is-position-fixed",
        fixedSidebarOffset: "auto",
        includeHtml: !1,
        onClick: function (t) {},
        orderedList: !0,
        scrollContainer: null,
        skipRendering: !1,
        headingLabelCallback: !1,
        ignoreHiddenElements: !1,
        headingObjectCallback: null,
        basePath: "",
        disableTocScrollSync: !1
    }
}, function (t, e) {
    t.exports = function (t) {
        var e = [].forEach,
            n = [].some,
            i = document.body,
            o = !0,
            r = " ";

        function s(n, i) {
            var o = i.appendChild(function (n) {
                var i = document.createElement("li"),
                    o = document.createElement("a");
                return t.listItemClass && i.setAttribute("class", t.listItemClass), t.onClick && (o
                    .onclick = t.onClick), t.includeHtml && n.childNodes.length ? e.call(n.childNodes,
                    (function (t) {
                        o.appendChild(t.cloneNode(!0))
                    })) : o.textContent = n.textContent, o.setAttribute("href", t.basePath +
                    "#" + n.id), o.setAttribute("class", t.linkClass + r + "node-name--" + n.nodeName +
                    r + t.extraLinkClasses), i.appendChild(o), i
            }(n));
            if (n.children.length) {
                var l = a(n.isCollapsed);
                n.children.forEach((function (t) {
                    s(t, l)
                })), o.appendChild(l)
            }
        }

        function a(e) {
            var n = t.orderedList ? "ol" : "ul",
                i = document.createElement(n),
                o = t.listClass + r + t.extraListClasses;
            return e && (o += r + t.collapsibleClass, o += r + t.isCollapsedClass), i.setAttribute("class",
                o), i
        }
        return {
            enableTocAnimation: function () {
                o = !0
            },
            disableTocAnimation: function (e) {
                var n = e.target || e.srcElement;
                "string" == typeof n.className && -1 !== n.className.indexOf(t.linkClass) && (o = !1)
            },
            render: function (t, e) {
                var n = a(!1);
                e.forEach((function (t) {
                    s(t, n)
                }));
                var i = document.querySelector(t);
                if (null !== i) return i.firstChild && i.removeChild(i.firstChild), 0 === e.length ? i :
                    i.appendChild(n)
            },
            updateToc: function (s) {
                var a;
                a = t.scrollContainer && document.querySelector(t.scrollContainer) ? document.querySelector(
                        t.scrollContainer).scrollTop : document.documentElement.scrollTop || i.scrollTop,
                    t.positionFixedSelector && function () {
                        var e;
                        e = t.scrollContainer && document.querySelector(t.scrollContainer) ? document.querySelector(
                            t.scrollContainer).scrollTop : document.documentElement.scrollTop || i.scrollTop;
                        var n = document.querySelector(t.positionFixedSelector);
                        "auto" === t.fixedSidebarOffset && (t.fixedSidebarOffset = document.querySelector(
                                t.tocSelector).offsetTop), e > t.fixedSidebarOffset ? -1 === n.className
                            .indexOf(t.positionFixedClass) && (n.className += r + t.positionFixedClass) :
                            n.className = n.className.split(r + t.positionFixedClass).join("")
                    }();
                var l, c = s;
                if (o && null !== document.querySelector(t.tocSelector) && c.length > 0) {
                    n.call(c, (function (e, n) {
                        return function e(n) {
                            var i = 0;
                            return n !== document.querySelector(t.contentSelector &&
                                null != n) && (i = n.offsetTop, t.hasInnerContainers &&
                                (i += e(n.offsetParent))), i
                        }(e) > a + t.headingsOffset + 10 ? (l = c[0 === n ? n : n - 1],
                            !0) : n === c.length - 1 ? (l = c[c.length - 1], !0) : void 0
                    }));
                    var u = document.querySelector(t.tocSelector).querySelectorAll("." + t.linkClass);
                    e.call(u, (function (e) {
                        e.className = e.className.split(r + t.activeLinkClass).join("")
                    }));
                    var d = document.querySelector(t.tocSelector).querySelectorAll("." + t.listItemClass);
                    e.call(d, (function (e) {
                        e.className = e.className.split(r + t.activeListItemClass).join("")
                    }));
                    var f = document.querySelector(t.tocSelector).querySelector("." + t.linkClass +
                        ".node-name--" + l.nodeName + '[href="' + t.basePath + "#" + l.id.replace(
                            /([ #;&,.+*~':"!^$[\]()=>|/@])/g, "\\$1") + '"]'); - 1 === f.className.indexOf(
                        t.activeLinkClass) && (f.className += r + t.activeLinkClass);
                    var h = f.parentNode;
                    h && -1 === h.className.indexOf(t.activeListItemClass) && (h.className += r + t.activeListItemClass);
                    var p = document.querySelector(t.tocSelector).querySelectorAll("." + t.listClass +
                        "." + t.collapsibleClass);
                    e.call(p, (function (e) {
                            -1 === e.className.indexOf(t.isCollapsedClass) && (e.className += r +
                                t.isCollapsedClass)
                        })), f.nextSibling && -1 !== f.nextSibling.className.indexOf(t.isCollapsedClass) &&
                        (f.nextSibling.className = f.nextSibling.className.split(r + t.isCollapsedClass)
                            .join("")),
                        function e(n) {
                            return -1 !== n.className.indexOf(t.collapsibleClass) && -1 !== n.className
                                .indexOf(t.isCollapsedClass) ? (n.className = n.className.split(r + t.isCollapsedClass)
                                    .join(""), e(n.parentNode.parentNode)) : n
                        }(f.parentNode.parentNode)
                }
            }
        }
    }
}, function (t, e) {
    t.exports = function (t) {
        var e = [].reduce;

        function n(t) {
            return t[t.length - 1]
        }

        function i(e) {
            if (!(e instanceof window.HTMLElement)) return e;
            if (t.ignoreHiddenElements && (!e.offsetHeight || !e.offsetParent)) return null;
            var n = {
                id: e.id,
                children: [],
                nodeName: e.nodeName,
                headingLevel: function (t) {
                    return +t.nodeName.split("H").join("")
                }(e),
                textContent: t.headingLabelCallback ? String(t.headingLabelCallback(e.textContent)) : e
                    .textContent.trim()
            };
            return t.includeHtml && (n.childNodes = e.childNodes), t.headingObjectCallback ? t.headingObjectCallback(
                n, e) : n
        }
        return {
            nestHeadingsArray: function (o) {
                return e.call(o, (function (e, o) {
                    var r = i(o);
                    return r && function (e, o) {
                        for (var r = i(e), s = r.headingLevel, a = o, l = n(a), c = s -
                                (l ? l.headingLevel : 0); c > 0;)(l = n(a)) && void 0 !==
                            l.children && (a = l.children), c--;
                        s >= t.collapseDepth && (r.isCollapsed = !0), a.push(r)
                    }(r, e.nest), e
                }), {
                    nest: []
                })
            },
            selectHeadings: function (e, n) {
                var i = n;
                t.ignoreSelector && (i = n.split(",").map((function (e) {
                    return e.trim() + ":not(" + t.ignoreSelector + ")"
                })));
                try {
                    return document.querySelector(e).querySelectorAll(i)
                } catch (t) {
                    return console.warn("Element not found: " + e), null
                }
            }
        }
    }
}, function (t, e) {
    t.exports = function (t) {
        var e = document.querySelector(t.tocSelector);
        if (e && e.scrollHeight > e.clientHeight) {
            var n = e.querySelector("." + t.activeListItemClass);
            n && (e.scrollTop = n.offsetTop)
        }
    }
}, function (t, e) {
    function n(t, e) {
        var n, i, o = window.pageYOffset,
            r = {
                duration: e.duration,
                offset: e.offset || 0,
                callback: e.callback,
                easing: e.easing || function (t, e, n, i) {
                    return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
                }
            },
            s = document.querySelector('[id="' + decodeURI(t).split("#").join("") + '"]'),
            a = "string" == typeof t ? r.offset + (t ? s && s.getBoundingClientRect().top || 0 : -(document.documentElement
                .scrollTop || document.body.scrollTop)) : t,
            l = "function" == typeof r.duration ? r.duration(a) : r.duration;

        function c(t) {
            i = t - n, window.scrollTo(0, r.easing(i, o, a, l)), i < l ? requestAnimationFrame(c) : (window.scrollTo(
                0, o + a), "function" == typeof r.callback && r.callback())
        }
        requestAnimationFrame((function (t) {
            n = t, c(t)
        }))
    }
    e.initSmoothScrolling = function (t) {
        document.documentElement.style;
        var e = t.duration,
            i = t.offset,
            o = location.hash ? r(location.href) : location.href;

        function r(t) {
            return t.slice(0, t.lastIndexOf("#"))
        }
        document.body.addEventListener("click", (function (s) {
            ! function (t) {
                return "a" === t.tagName.toLowerCase() && (t.hash.length > 0 || "#" === t.href.charAt(
                    t.href.length - 1)) && (r(t.href) === o || r(t.href) + "#" === o)
            }(s.target) || s.target.className.indexOf("no-smooth-scroll") > -1 || "#" === s.target
                .href.charAt(s.target.href.length - 2) && "!" === s.target.href.charAt(s.target
                    .href.length - 1) || -1 === s.target.className.indexOf(t.linkClass) || n(s.target
                    .hash, {
                        duration: e,
                        offset: i,
                        callback: function () {
                            ! function (t) {
                                var e = document.getElementById(t.substring(1));
                                e && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) ||
                                    (e.tabIndex = -1), e.focus())
                            }(s.target.hash)
                        }
                    })
        }), !1)
    }
}]);
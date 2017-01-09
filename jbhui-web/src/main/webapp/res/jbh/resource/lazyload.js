define("common_lazyload", ["common_yhd_webp"], function (c) {
    var d = function () {
        var m = this;
        var l = [];
        var b = $(window);

        function a() {
            var e = navigator.userAgent.toLowerCase();
            if (e.match(/MicroMessenger/i) == "micromessenger") {
                return true
            } else {
                return false
            }
        }
        function n() {
            var j = true;
            var t = null;
            if (a()) {
                document.addEventListener("WeixinJSBridgeReady", function f() {
                    WeixinJSBridge.invoke("getNetworkType", {}, function (q) {
                        if (q.err_msg != "network_type:wifi") {
                            j = false;
                            t = "weixin is wifi"
                        }
                        t = "weixin not wifi"
                    })
                });
                if (!t) {
                    var i = new RegExp("nettype/(\\w{1,6})");
                    var g = i.exec(navigator.userAgent.toLowerCase());
                    if (g && g[1]) {
                        t = "weixin user agent:" + g[1];
                        if (g[1] == "unknown") {
                            t = null
                        } else {
                            if (g[1] != "wifi" && g[1] != "2") {
                                j = false
                            }
                        }
                    }
                }
            } else {
                if (h5tonative && h5tonative.getClientInfo()) {
                    var h = h5tonative.getClientInfo().toLowerCase();
                    if (h) {
                        var i = new RegExp('"nettype":"(\\w{1,6})"');
                        var g = i.exec(h);
                        if (g && g[1]) {
                            nettype = g[1];
                            if (nettype != "wifi") {
                                j = false
                            }
                            t = "app client:" + nettype
                        }
                    }
                }
            }
            if (!t) {
                var s = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (s && s.type) {
                    t = "connection api:" + s.type;
                    if (s.type == "unknown") {
                        t = null
                    } else {
                        if (s.type != "wifi" && s.type != "2") {
                            j = false
                        }
                    }
                }
            }
            if (!t && window.performance && window.performance.timing) {
                var e = window.performance.timing.domLoading - performance.timing.fetchStart;
                if (e > 802) {
                    j = false
                }
                t = "timing api:" + e
            }
            return j
        }
        this.init = function (h) {
            m.onerrorImgUrl = h.onerrorImgUrl;
            m.srcStore = h.srcStore;
            m.srcStore2x = h.srcStore2x;
            m.srcStore3x = h.srcStore3x;
            m.cla = h.cla;
            m.horizontal = h.horizontal || false;
            m.imgLoadCallback = h.imgLoadCallback;
            m.imgErrorCallback = h.imgErrorCallback;
            m.sensitivity = h.sensitivity || 50;
            m.scope = h.scope;
            minScroll = 5,
            slowScrollTime = 200,
            wifi = n(),
            ios = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
            isIos = ios && !0 || !1,
            isoVersion = isIos && ios[2].split("_");
            if (h.container === null) {
                return
            }
            m.container = h.container || window;
            isoVersion = isoVersion && parseFloat(isoVersion.length > 1 ? isoVersion.splice(0, 2).join(".") : isoVersion[0], 10),
            isIos = m.isPhone = isIos && isoVersion < 6;
            if (m.scope && m.scope.length > 0) {
                l = m.scope
            }
            if (isIos) {
                var g, e;
                $(m.container).on("touchstart", function () {
                    g = {
                        sy: window.scrollY,
                        time: Date.now()
                    },
                    e && clearTimeout(e)
                }).on("touchend", function (r) {
                    if (r && r.changedTouches) {
                        var j = Math.abs(window.scrollY - g.sy);
                        if (j > minScroll) {
                            var i = Date.now() - g.time;
                            e = setTimeout(function () {
                                m.changeimg(),
                                g = {},
                                clearTimeout(e),
                                e = null
                            }, i > slowScrollTime ? 0 : 200)
                        }
                    } else {
                        m.changeimg()
                    }
                }).on("touchcancel", function () {
                    e && clearTimeout(e),
                    g = {}
                })
            } else {
                var f = false;
                $(m.container).on("scroll", function () {
                    if (f) {
                        return
                    }
                    f = true;
                    setTimeout(function () {
                        m.changeimg();
                        f = false
                    }, 30)
                })
            }
            setTimeout(function () {
                m.trigger()
            }, 90)
        };
        var k = 10;
        var p = 0;
        var o = function (f) {
            if (!l || l.length < 1) {
                return
            }
            var e = /^(http:|https:)*\/\/d(\d+)./i;
            if (e.test(f)) {
                k = l[p];
                p++;
                if (p == l.length) {
                    p = 0
                }
                return f.replace(e, "//d" + k + ".")
            } else {
                return f
            }
        };
        m.trigger = function () {
            var e = m.isPhone && "touchend" || "scroll";
            m.imglist = $("img." + m.cla + ",img[data-lazyload='1']");
            if (m.imglist && m.imglist.length > 0) {
                $(window).trigger(e)
            }
        };
        m.scrollObj = function (f) {
            if (!f || f.length == 0) {
                return
            }
            var e = false;
            f.bind("scroll", function () {
                var g = this;
                if (e) {
                    return
                }
                e = true;
                setTimeout(function () {
                    m.changeimg($(g));
                    e = false
                }, 30)
            })
        };
        m.changeimg = function (g) {
            function h(t) {
                var j;
                var i = true;
                if (m.horizontal) {
                    if (!g) {
                        j = b.width() + b.scrollLeft()
                    } else {
                        j = g.offset().left + g.width()
                    }
                    i = j >= t.offset().left - m.sensitivity
                }
                if (!g) {
                    j = (window.innerHeight ? window.innerHeight : b.height()) + b.scrollTop()
                } else {
                    j = g.offset().top + g.height()
                }
                var s = j >= t.offset().top - m.sensitivity;
                if (s && i) {
                    return true
                }
                return false
            }
            function f(I, H) {
                var D = I.attr(m.srcStore),
                    G = I.attr(m.srcStore2x),
                    K = I.attr(m.srcStore3x);
                if (!D) {
                        return
                    }
                if (I.attr("isCut")) {
                        var L = "yihaodianimg.com";
                        var i = /_\d{1,}x\d{1,}\./;
                        if (D.indexOf(L) != -1) {
                            var j = I.attr("width"),
                                E = I.attr("height");
                            if (i.test(D) && !isNaN(j) && !isNaN(E)) {
                                    var J = D.split(".");
                                    if (J.length < 2) {
                                        return
                                    }
                                    var F = J.pop();
                                    var C = "_" + j + "x" + E;
                                    D = J.join(".") + C + "." + F
                                }
                        }
                    }
                if (wifi) {
                        if (K && m.srcStore3x) {
                            if (m.scope) {
                                K = o(K)
                            }
                            I.attr("srcset", c.replaceWebP(G) + " 2x," + c.replaceWebP(K) + " 3x").attr("src", c.replaceWebP(K))
                        } else {
                            if (G && m.srcStore2x) {
                                if (m.scope) {
                                    G = o(G)
                                }
                                I.attr("src", c.replaceWebP(G))
                            } else {
                                if (m.scope) {
                                    D = o(D)
                                }
                                I.attr("src", c.replaceWebP(D))
                            }
                        }
                    } else {
                        if (!m.srcStore3x && !m.srcStore2x) {
                            var i = /_(\d{1,4})x(\d{1,4})\.(\w{3,5})$/;
                            var B = D.match(i)
                        }
                        if (m.scope) {
                            D = o(D)
                        }
                        I.attr("src", c.replaceWebP(D))
                    }
                I[0].onload || (I[0].onload = function () {
                        $(this).removeClass(m.cla).removeAttr(m.srcStore).removeAttr(m.srcStore2x).removeAttr(m.srcStore3x).removeAttr("data-lazyload"),
                        m.imglist[H] = null,
                        this.onerror = this.onload = null;
                        if (m.imgLoadCallback) {
                            m.imgLoadCallback(this)
                        }
                    }, I[0].onerror = function () {
                        if (!m.onerrorImgUrl) {
                            return
                        }
                        this.src = m.onerrorImgUrl;
                        if (m.imgErrorCallback) {
                            m.imgErrorCallback(this)
                        }
                        $(this).removeClass(m.cla).removeAttr(m.srcStore).removeAttr(m.srcStore2x).removeAttr(m.srcStore3x).removeAttr("data-lazyload");
                        m.imglist[H] = null;
                        this.onerror = this.onload = null
                    })
            }
            var e;
            if (g) {
                e = $("img." + m.cla + ",img[data-lazyload='1']", g)
            } else {
                e = m.imglist
            }
            if (e && e.length > 0) {
                e.each(function (j, i) {
                    if (!i) {
                        return
                    }
                    var r = $(i);
                    if (!h(r)) {
                        return
                    }
                    if (!r.attr(m.srcStore)) {
                        return
                    }
                    f(r, j)
                })
            }
        }
    };
    return new d()
});